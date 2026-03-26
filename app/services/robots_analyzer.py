from __future__ import annotations

import re
import time
import urllib.parse
from dataclasses import dataclass, field
from typing import Optional

import requests


# ─── URL helpers ────────────────────────────────────────────────────────────

def _normalize_url(raw: str) -> tuple[str, str]:
    """Return (base_url, domain). base_url is scheme + netloc only."""
    raw = raw.strip()
    if not raw.startswith(("http://", "https://")):
        raw = "https://" + raw
    parsed = urllib.parse.urlparse(raw)
    domain = parsed.netloc.lower()
    if domain.startswith("www."):
        domain = domain[4:]
    base = f"{parsed.scheme}://{parsed.netloc}"
    return base, domain


# ─── Fetcher ─────────────────────────────────────────────────────────────────

def _fetch_robots(base_url: str) -> Optional[str]:
    """Download robots.txt. Returns raw text or None on failure / not found."""
    robots_url = f"{base_url}/robots.txt"
    try:
        resp = requests.get(
            robots_url,
            headers={"User-Agent": "ScrapGuide/1.0 (+https://scrapguide.dev)"},
            timeout=8,
            allow_redirects=True,
        )
        if resp.status_code == 200 and len(resp.text) < 500_000:
            return resp.text
        return None
    except Exception:
        return None


# ─── Parser ──────────────────────────────────────────────────────────────────

@dataclass
class _RobotsRule:
    user_agent: str
    disallow: list[str] = field(default_factory=list)
    allow: list[str] = field(default_factory=list)
    crawl_delay: Optional[float] = None


def _parse_robots(content: str) -> list[_RobotsRule]:
    rules: list[_RobotsRule] = []
    current_agents: list[str] = []
    current_disallow: list[str] = []
    current_allow: list[str] = []
    current_delay: Optional[float] = None

    def _flush() -> None:
        nonlocal current_agents, current_disallow, current_allow, current_delay
        if current_agents:
            for agent in current_agents:
                rules.append(
                    _RobotsRule(
                        user_agent=agent,
                        disallow=list(current_disallow),
                        allow=list(current_allow),
                        crawl_delay=current_delay,
                    )
                )
        current_agents = []
        current_disallow = []
        current_allow = []
        current_delay = None

    for raw_line in content.splitlines():
        line = raw_line.split("#")[0].strip()

        if not line:
            _flush()
            continue

        if ":" not in line:
            continue

        key, _, value = line.partition(":")
        key = key.strip().lower()
        value = value.strip()

        if key == "user-agent":
            # If we already have rules collected, flush the current group first
            if current_disallow or current_allow or current_delay is not None:
                _flush()
            current_agents.append(value)
        elif key == "disallow":
            if value:
                current_disallow.append(value)
        elif key == "allow":
            if value:
                current_allow.append(value)
        elif key == "crawl-delay":
            try:
                current_delay = float(value)
            except ValueError:
                pass

    _flush()
    return rules


# ─── Site-type detection ─────────────────────────────────────────────────────

def _detect_site_type(domain: str) -> str:
    if re.search(r"shop|store|commerce|buy|tienda|market|amazon|ebay|mercado", domain):
        return "ecommerce"
    if re.search(r"news|noticias|times|post|herald|press|magazine|cnn|bbc|reuters", domain):
        return "news"
    if re.search(r"blog|journal|medium|substack", domain):
        return "blog"
    if re.search(r"facebook|twitter|instagram|linkedin|tiktok|reddit|pinterest|snapchat", domain):
        return "social"
    if re.search(r"gov|\.gob\.|portal|official", domain):
        return "portal"
    return "unknown"


# ─── Delay heuristics ────────────────────────────────────────────────────────

_DELAY_BY_TYPE: dict[str, float] = {
    "blog": 1.5,
    "news": 2.5,
    "ecommerce": 4.0,
    "social": 10.0,
    "portal": 3.0,
    "unknown": 3.0,
}


# ─── Risk calculator ─────────────────────────────────────────────────────────

def _calc_risk(
    site_type: str,
    rules: list[_RobotsRule],
    has_crawl_delay: bool,
) -> tuple[str, list[str]]:
    reasons: list[str] = []

    if site_type == "social":
        return "high", [
            "Terms of Service prohíben scraping explícitamente",
            "Requiere autenticación para casi todo el contenido",
            "Protección anti-bots avanzada (reCAPTCHA, fingerprinting)",
            "Sin crawl-delay — sistema de bloqueo agresivo",
        ]

    wildcard = next((r for r in rules if r.user_agent == "*"), None)
    if wildcard and "/" in wildcard.disallow and not wildcard.allow:
        return "high", ["robots.txt prohíbe el acceso a todo el sitio"]

    if not has_crawl_delay:
        reasons.append("Sin crawl-delay explícito en robots.txt")

    if site_type == "ecommerce":
        reasons.append("Posible protección anti-bots (Cloudflare WAF)")
        return "medium", reasons

    if site_type == "news":
        reasons.append("Posible paywall o rate limiting en archivo")
        return "medium", reasons

    if site_type == "portal":
        reasons.append("Portal gubernamental — revisar normativas legales")
        return "medium", reasons

    # Low risk path
    if has_crawl_delay:
        return "low", ["robots.txt permisivo con crawl-delay definido"]
    return "low", reasons if reasons else ["robots.txt permisivo", "Sin protección anti-bots detectada"]


# ─── Code generator ──────────────────────────────────────────────────────────

def _generate_code(domain: str, delay: float, allowed_paths: list[str]) -> str:
    paths = allowed_paths[:3] if allowed_paths else ["/"]
    paths_list = "\n".join([f'    "https://{domain}{p}",' for p in paths])
    return f"""import requests
import time
from bs4 import BeautifulSoup

# Configuración generada por ScrapGuide
HEADERS = {{
    "User-Agent": "Mozilla/5.0 (compatible; ScrapGuide/1.0; +https://scrapguide.dev)",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
    "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
}}

DELAY = {delay}  # segundos — respeta el robots.txt

URLS = [
{paths_list}
]


def scrape_page(url: str) -> dict:
    \"\"\"Extrae contenido básico de una página.\"\"\"
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        return {{
            "url": url,
            "title": soup.find("title").get_text(strip=True) if soup.find("title") else "",
            "headings": [h.get_text(strip=True) for h in soup.find_all("h1", limit=5)],
            "links": [a["href"] for a in soup.find_all("a", href=True)][:20],
        }}

    except requests.exceptions.HTTPError as e:
        code = e.response.status_code
        if code == 429:
            print(f"⚠️  Rate limit (429) — aumenta el DELAY")
        elif code == 403:
            print(f"🚫 Acceso denegado (403) — revisa los headers")
        raise

    except requests.exceptions.RequestException as e:
        print(f"❌ Error de red: {{e}}")
        raise


def main():
    results = []

    for i, url in enumerate(URLS):
        print(f"[{{i + 1}}/{{len(URLS)}}] Scrapeando: {{url}}")
        try:
            data = scrape_page(url)
            results.append(data)
            print(f"  ✓ Título: {{data['title']}}")
        except Exception:
            print(f"  ✗ Error en {{url}}")

        if i < len(URLS) - 1:
            time.sleep(DELAY)

    print(f"\\n✅ Completado: {{len(results)}}/{{len(URLS)}} páginas procesadas")
    return results


if __name__ == "__main__":
    main()
"""


# ─── Public entry point ──────────────────────────────────────────────────────

def analyze_url(raw_url: str) -> dict:
    """Analyze a URL: fetch robots.txt, parse rules, evaluate risk. Returns AnalysisResult dict."""
    base_url, domain = _normalize_url(raw_url)
    robots_url = f"{base_url}/robots.txt"

    raw_robots = _fetch_robots(base_url) or ""
    rules = _parse_robots(raw_robots) if raw_robots else []

    wildcard = next((r for r in rules if r.user_agent == "*"), None)
    disallowed_paths: list[str] = wildcard.disallow if wildcard else []
    allowed_paths: list[str] = wildcard.allow if wildcard else []

    has_crawl_delay = any(r.crawl_delay is not None for r in rules)
    crawl_delay = next((r.crawl_delay for r in rules if r.crawl_delay is not None), None)

    site_type = _detect_site_type(domain)
    recommended_delay = float(crawl_delay) if crawl_delay else _DELAY_BY_TYPE[site_type]

    risk_level, risk_reasons = _calc_risk(site_type, rules, has_crawl_delay)
    generated_code = _generate_code(domain, recommended_delay, allowed_paths)

    serialized_rules = [
        {
            "userAgent": r.user_agent,
            "disallow": r.disallow,
            "allow": r.allow,
            "crawlDelay": r.crawl_delay,
        }
        for r in rules
    ]

    return {
        "url": base_url,
        "domain": domain,
        "siteType": site_type,
        "robotsUrl": robots_url,
        "rawRobots": raw_robots,
        "rules": serialized_rules,
        "hasCrawlDelay": has_crawl_delay,
        "crawlDelay": crawl_delay,
        "recommendedDelay": recommended_delay,
        "riskLevel": risk_level,
        "riskReasons": risk_reasons,
        "allowedPaths": allowed_paths,
        "disallowedPaths": disallowed_paths,
        "generatedCode": generated_code,
        "analyzedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
