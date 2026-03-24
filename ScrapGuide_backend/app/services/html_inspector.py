from __future__ import annotations

from typing import Optional

import requests


# ─── URL helpers ─────────────────────────────────────────────────────────────

def _normalize_url(raw: str) -> str:
    raw = raw.strip()
    if not raw.startswith(("http://", "https://")):
        raw = "https://" + raw
    return raw


# ─── HTML fetcher ─────────────────────────────────────────────────────────────

def _fetch_html(url: str) -> Optional[str]:
    try:
        resp = requests.get(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (compatible; ScrapGuide/1.0; +https://scrapguide.dev)",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
                "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
            },
            timeout=12,
            allow_redirects=True,
        )
        if resp.status_code == 200:
            return resp.text
        return None
    except Exception:
        return None


# ─── Parser selector ─────────────────────────────────────────────────────────

def _get_parser() -> str:
    try:
        import lxml  # noqa: F401
        return "lxml"
    except ImportError:
        return "html.parser"


# ─── Section detection ────────────────────────────────────────────────────────

def _detect_sections(soup, url: str) -> list[dict]:
    sections: list[dict] = []

    # 1. Tables
    tables = soup.find_all("table")
    for i, table in enumerate(tables):
        first_row = table.find("tr")
        thead = table.find("thead")
        if thead:
            headers = [th.get_text(strip=True) for th in thead.find_all(["th", "td"])]
        elif first_row and first_row.find("th"):
            headers = [th.get_text(strip=True) for th in first_row.find_all("th")]
        elif first_row:
            col_count = len(first_row.find_all("td"))
            headers = [f"Columna {j + 1}" for j in range(col_count)]
        else:
            headers = []

        all_rows = table.find_all("tr")
        preview_rows = all_rows[1:4] if headers else all_rows[:3]
        preview = []
        for row in preview_rows:
            cells = [td.get_text(strip=True) for td in row.find_all(["td", "th"])]
            if any(cells):
                preview.append(cells)

        if all_rows:
            caption = table.find("caption")
            suffix = f" — {caption.get_text(strip=True)}" if caption else ""
            sections.append({
                "id": f"table_{i}",
                "type": "table",
                "selector": "table",
                "label": f"Tabla {i + 1}{suffix} ({len(all_rows)} filas)",
                "count": len(all_rows),
                "preview": preview,
                "headers": headers[:8],
            })

    # 2. Headings
    headings = soup.find_all(["h1", "h2", "h3"])
    if headings:
        preview = [[h.name.upper(), h.get_text(strip=True)[:80]] for h in headings[:5]]
        sections.append({
            "id": "headings",
            "type": "headings",
            "selector": "h1, h2, h3",
            "label": f"Encabezados ({len(headings)} encontrados)",
            "count": len(headings),
            "preview": preview,
            "headers": ["Nivel", "Texto"],
        })

    # 3. Links
    links = [a for a in soup.find_all("a", href=True) if a.get_text(strip=True)]
    if links:
        preview = [[a.get_text(strip=True)[:60], a["href"][:80]] for a in links[:5]]
        sections.append({
            "id": "links",
            "type": "links",
            "selector": "a[href]",
            "label": f"Todos los enlaces ({len(links)} encontrados)",
            "count": len(links),
            "preview": preview,
            "headers": ["Texto", "URL"],
        })

    # 4. Images
    images = soup.find_all("img", src=True)
    if images:
        preview = [[img.get("alt", "—")[:60], img["src"][:80]] for img in images[:5]]
        sections.append({
            "id": "images",
            "type": "images",
            "selector": "img[src]",
            "label": f"Imágenes ({len(images)} encontradas)",
            "count": len(images),
            "preview": preview,
            "headers": ["Alt", "Src"],
        })

    # 5. Card-like containers (stop at first meaningful match)
    card_candidates = [
        ("article", "Artículos"),
        ("[class*='card']", "Cards"),
        ("[class*='product']", "Productos"),
        ("[class*='item']", "Items"),
        ("[class*='post']", "Posts"),
        ("[class*='result']", "Resultados"),
        ("[class*='listing']", "Listados"),
    ]
    for j, (sel, label) in enumerate(card_candidates):
        try:
            elements = soup.select(sel)
        except Exception:
            continue
        if len(elements) >= 3:
            preview = []
            for el in elements[:4]:
                text = el.get_text(separator=" ", strip=True)[:120]
                if text:
                    preview.append([text])
            if preview:
                sections.append({
                    "id": f"cards_{j}",
                    "type": "cards",
                    "selector": sel,
                    "label": f"{label} ({len(elements)} encontrados)",
                    "count": len(elements),
                    "preview": preview,
                    "headers": ["Contenido"],
                })
            break

    # 6. Prices
    price_selectors = ["[class*='price']", "[class*='precio']", "[class*='cost']", "[class*='valor']"]
    price_els: list = []
    for sel in price_selectors:
        try:
            price_els.extend(soup.select(sel))
        except Exception:
            pass
    if price_els:
        texts = list({el.get_text(strip=True) for el in price_els if el.get_text(strip=True)})
        if texts:
            sections.append({
                "id": "prices",
                "type": "prices",
                "selector": ",".join(price_selectors),
                "label": f"Precios ({len(price_els)} encontrados)",
                "count": len(price_els),
                "preview": [[t] for t in texts[:5]],
                "headers": ["Precio"],
            })

    # 7. Text paragraphs
    paragraphs = [p for p in soup.find_all("p") if len(p.get_text(strip=True)) > 50]
    if paragraphs:
        preview = [[p.get_text(strip=True)[:120]] for p in paragraphs[:4]]
        sections.append({
            "id": "text",
            "type": "text",
            "selector": "p",
            "label": f"Párrafos de texto ({len(paragraphs)} encontrados)",
            "count": len(paragraphs),
            "preview": preview,
            "headers": ["Texto"],
        })

    return sections


# ─── Single-section extractor ─────────────────────────────────────────────────

def _extract_section(soup, section: dict) -> dict:
    s_id = section["id"]
    s_type = section["type"]
    s_label = section["label"]
    selector = section["selector"]

    try:
        if s_type == "table":
            idx = int(s_id.split("_")[1]) if "_" in s_id else 0
            tables = soup.find_all("table")
            if idx >= len(tables):
                return {"id": s_id, "type": s_type, "label": s_label, "headers": [], "data": []}
            table = tables[idx]
            all_rows = table.find_all("tr")
            first_row = all_rows[0] if all_rows else None
            if first_row and (first_row.find("th") or table.find("thead")):
                headers = [c.get_text(strip=True) for c in first_row.find_all(["th", "td"])]
                data_rows = all_rows[1:]
            else:
                headers = []
                data_rows = all_rows
            data = []
            for row in data_rows:
                cells = [td.get_text(strip=True) for td in row.find_all(["td", "th"])]
                if any(cells):
                    data.append(cells)
            return {"id": s_id, "type": s_type, "label": s_label, "headers": headers, "data": data}

        if s_type == "headings":
            elements = soup.find_all(["h1", "h2", "h3"])
            data = [[el.name.upper(), el.get_text(strip=True)] for el in elements]
            return {"id": s_id, "type": s_type, "label": s_label, "headers": ["Nivel", "Texto"], "data": data}

        if s_type == "links":
            elements = [a for a in soup.find_all("a", href=True) if a.get_text(strip=True)]
            data = [[el.get_text(strip=True), el["href"]] for el in elements]
            return {"id": s_id, "type": s_type, "label": s_label, "headers": ["Texto", "URL"], "data": data}

        if s_type == "images":
            elements = soup.find_all("img", src=True)
            data = [
                [el.get("alt", ""), el["src"], el.get("width", ""), el.get("height", "")]
                for el in elements
            ]
            return {"id": s_id, "type": s_type, "label": s_label, "headers": ["Alt", "Src", "Ancho", "Alto"], "data": data}

        if s_type in ("cards", "prices", "text"):
            elements = soup.select(selector)
            col_label = {"cards": "Contenido", "prices": "Precio", "text": "Texto"}.get(s_type, "Valor")
            data = [[el.get_text(separator=" ", strip=True)] for el in elements if el.get_text(strip=True)]
            return {"id": s_id, "type": s_type, "label": s_label, "headers": [col_label], "data": data}

    except Exception:
        pass

    return {"id": s_id, "type": s_type, "label": s_label, "headers": [], "data": []}


# ─── Public entry points ──────────────────────────────────────────────────────

def inspect_url(raw_url: str) -> dict:
    """Fetch a URL and detect all scrapeable sections from its HTML."""
    url = _normalize_url(raw_url)
    html = _fetch_html(url)
    if not html:
        return {"url": url, "title": "", "sections": [], "error": "No se pudo obtener el HTML del sitio"}

    from bs4 import BeautifulSoup  # imported here to surface clear ImportError if missing
    soup = BeautifulSoup(html, _get_parser())

    title_tag = soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else ""
    sections = _detect_sections(soup, url)

    return {"url": url, "title": title, "sections": sections}


def extract_from_url(raw_url: str, sections: list[dict]) -> list[dict]:
    """Fetch a URL and extract data from the given section descriptors."""
    url = _normalize_url(raw_url)
    html = _fetch_html(url)
    if not html:
        return []

    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, _get_parser())

    return [_extract_section(soup, s) for s in sections]
