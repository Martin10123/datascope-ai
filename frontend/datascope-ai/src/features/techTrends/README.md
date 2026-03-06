# Tech Trends Feature

Módulo de análisis de tendencias tecnológicas con datos de GitHub, Stack Overflow y Reddit.

## 📁 Estructura

```
features/techTrends/
├── components/       # Componentes específicos del feature (futuro)
├── hooks/           # Hooks personalizados (futuro)
├── pages/           # Páginas del módulo
│   ├── index.ts
│   └── TechTrendsPage.tsx
└── services/        # Servicios API (futuro backend)
```

## 🎯 Características Implementadas

### TechTrendsPage
- ✅ **Paginación**: 9 tecnologías por página (grid 3x3)
- ✅ **Búsqueda en tiempo real**: Por nombre y descripción
- ✅ **Filtros por categoría**: 8 categorías diferentes
- ✅ **Ordenamiento**: Por popularidad, crecimiento, o nombre
- ✅ **Estadísticas**: 4 cards con métricas generales
- ✅ **Gráficos**: 4 charts interactivos con Chart.js
- ✅ **Top 5 Trending**: Ranking de tecnologías al alza
- ✅ **Responsive**: Mobile, tablet y desktop
- ✅ **Dark mode**: Compatible
- ✅ **Animaciones**: Framer Motion

### Paginación
- Items por página: 9 (configurable)
- Navegación: Prev/Next + números de página
- Scroll automático al cambiar página
- Contador de resultados: "Mostrando X-Y de Z tecnologías"
- Reset a página 1 al cambiar filtros

## 📊 Datos Mock

Los datos se importan desde: `src/services/techTrendsMockData.ts`

- **12 tecnologías** con información completa
- **5 datasets** para gráficos
- **4 estadísticas** generales

## 🔄 Migración a Backend

Cuando el backend esté listo:

1. Crear servicio API en `services/techTrendsService.ts`
2. Implementar paginación server-side
3. Conectar filtros con query params
4. Actualizar imports en TechTrendsPage

## 🚀 Uso

```tsx
import { TechTrendsPage } from '@/features/techTrends/pages';

// En App.tsx ya está configurado:
<Route path="/tech-trends" element={<TechTrendsPage />} />
```

## 📝 TODO

- [ ] Extraer TechCard a componente separado
- [ ] Crear hook `useTechPagination`
- [ ] Crear hook `useTechFilters`
- [ ] Componente TechFilters separado
- [ ] Componente TechStats separado
- [ ] Implementar servicio API real
- [ ] Agregar tests unitarios
- [ ] Página de detalles de tecnología
