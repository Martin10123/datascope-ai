# Viral Products Module

## Descripción
Módulo de análisis de productos virales en e-commerce. Detecta productos en tendencia en plataformas como Amazon, AliExpress, MercadoLibre y Shopify.

## Características

### Funcionalidades principales:
- **Búsqueda inteligente**: Buscar productos por nombre o descripción
- **Filtros por categoría**: Electrónicos, Fitness, Audio, Cocina, Gaming, etc.
- **Ordenamiento**: Por viralidad, ventas, precio o nombre
- **Paginación**: 9 productos por página (3x3 grid)
- **Puntuación viral**: Score de 0-100 basado en engagement
- **Análisis de plataformas**: Distribución de ventas entre diferentes marketplaces
- **Engagement metrics**: Views, shares, reviews por producto
- **Top 5 ranking**: Productos más virales

### Visualizaciones:
1. **Tendencia de Viralidad**: Evolución temporal de productos virales
2. **Distribución por Categoría**: Gráfico de dona con categorías
3. **Ventas por Plataforma**: Comparación de marketplaces
4. **Rango de Precios**: Distribución de productos por precio

## Estructura

```
viralProducts/
├── components/         # Componentes específicos del módulo
├── hooks/             # Custom hooks
├── pages/
│   ├── index.ts
│   └── ViralProductsPage.tsx
├── services/          # Lógica de negocio y API calls
└── README.md
```

## Datos Mockeados

Actualmente el módulo utiliza datos de ejemplo (`viralProductsMockData.ts`) con:
- 12 productos de ejemplo
- Puntuaciones virales: 72-95
- Precios: $24.99 - $199.99
- Categorías: Electrónicos, Fitness, Audio, Cocina, Gaming, etc.
- Plataformas: Amazon, AliExpress, MercadoLibre, Shopify

## Próximos pasos

1. Integrar con backend real para datos en vivo
2. Implementar WebSockets para updates en tiempo real
3. Agregar filtros avanzados (rango de precio, rating mínimo)
4. Página de detalle individual por producto
5. Comparador de precios entre plataformas
6. Alertas de nuevos productos virales
