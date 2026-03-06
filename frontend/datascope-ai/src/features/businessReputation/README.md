# Business Reputation Feature

Módulo de análisis de reputación empresarial con análisis de sentimiento de reseñas de múltiples fuentes.

## 📁 Estructura

```
features/businessReputation/
├── components/       # Componentes específicos del feature (futuro)
├── hooks/           # Hooks personalizados (futuro)
├── pages/           # Páginas del módulo
│   ├── index.ts
│   └── BusinessReputationPage.tsx
└── services/        # Servicios API (futuro backend)
```

## 🎯 Características Implementadas

### BusinessReputationPage
- ✅ **Paginación**: 9 empresas por página (grid 3x3)
- ✅ **Búsqueda en tiempo real**: Por nombre y descripción
- ✅ **Filtros por industria**: 10 categorías diferentes
- ✅ **Ordenamiento**: Por calificación, cantidad de reseñas, o nombre
- ✅ **Estadísticas**: 4 cards con métricas generales
- ✅ **Gráficos**: 4 charts interactivos con Chart.js
  - Tendencia de sentimientos (positivo, neutral, negativo)
  - Distribución por industria
  - Fuentes de reseñas
  - Distribución de calificaciones (1-5 estrellas)
- ✅ **Top 5 Mejor Valoradas**: Ranking de empresas
- ✅ **Responsive**: Mobile, tablet y desktop
- ✅ **Dark mode**: Compatible
- ✅ **Animaciones**: Framer Motion

### CompanyCard
Cada tarjeta incluye:
- Logo emoji de la empresa
- Nombre e industria
- Descripción
- Calificación con estrellas (1-5)
- Cantidad de reseñas
- **Análisis de sentimiento**:
  - % Positivo (con 👍)
  - % Neutral (con ➖)
  - % Negativo (con 👎)
- Fuentes de reseñas (Google, Trustpilot, Glassdoor, Yelp)
- Tendencia (arriba/abajo/estable) con % de cambio
- Fecha de última actualización
- Tags de categoría
- Botón "Ver análisis completo"

### Paginación
- Items por página: 9 (configurable)
- Navegación: Prev/Next + números de página
- Scroll automático al cambiar página
- Contador de resultados: "Mostrando X-Y de Z empresas"
- Reset a página 1 al cambiar filtros

## 📊 Datos Mock

Los datos se importan desde: `src/services/businessReputationMockData.ts`

- **12 empresas** con información completa:
  - TechCorp Solutions (Tecnología)
  - GreenEco Industries (Energía Renovable)
  - FastFood Chain (Restaurantes)
  - HealthPlus Clinic (Salud)
  - FashionHub Store (Retail)
  - EduLearn Platform (Educación)
  - AutoDrive Motors (Automotriz)
  - CloudBank Financial (Finanzas)
  - HomeComfort Real Estate (Inmobiliaria)
  - FitLife Gym (Fitness)
  - TravelExplore Agency (Turismo)
  - PetCare Veterinary (Veterinaria)

- **4 datasets** para gráficos
- **4 estadísticas** generales

## 🔄 Migración a Backend

Cuando el backend esté listo:

1. Crear servicio API en `services/reputationService.ts`
2. Implementar paginación server-side
3. Conectar filtros con query params
4. Integrar API de análisis de sentimiento real
5. Actualizar imports en BusinessReputationPage

## 🚀 Uso

```tsx
import { BusinessReputationPage } from '@/features/businessReputation/pages';

// En App.tsx ya está configurado:
<Route path="/business-reputation" element={<BusinessReputationPage />} />
```

## 📈 Métricas de Sentimiento

El análisis de sentimiento se divide en tres categorías:
- **Positivo**: Reseñas con sentimiento favorable
- **Neutral**: Reseñas objetivas o equilibradas
- **Negativo**: Reseñas con sentimiento desfavorable

Cada empresa tiene distribución porcentual de sentimientos que suma 100%.

## 🌟 Fuentes de Datos

- **Google Reviews**: Reseñas de Google Business
- **Trustpilot**: Plataforma de reseñas de clientes
- **Glassdoor**: Reseñas de empleados y cultura empresarial
- **Yelp**: Reseñas de negocios locales

## 📝 TODO

- [ ] Extraer CompanyCard a componente separado
- [ ] Crear hook `useCompanyPagination`
- [ ] Crear hook `useCompanyFilters`
- [ ] Crear hook `useSentimentAnalysis`
- [ ] Componente CompanyFilters separado
- [ ] Componente SentimentChart separado
- [ ] Implementar servicio API real
- [ ] Agregar tests unitarios
- [ ] Página de detalles de empresa individual
- [ ] Histórico de tendencias por empresa
- [ ] Comparador de empresas
- [ ] Exportar reportes PDF
