# 🔍 DataScope AI - Frontend

Plataforma de análisis inteligente con web scraping para identificar tendencias tecnológicas, reputación empresarial y productos virales.

## 📋 Características

- ✅ **Sistema de Autenticación Completo** - Login y registro con validación
- ✅ **Autenticación Mock** - 3 usuarios ficticios para desarrollo sin backend
- ✅ **Dashboard Interactivo** - 5 gráficos con Chart.js, estadísticas en tiempo real
- ✅ **Diseño Responsive** - Optimizado para móvil, tablet y escritorio
- ✅ **Sidebar Profesional** - Navegación intuitiva con 8 opciones
- ✅ **Navbar Moderno** - Búsqueda, notificaciones, modo oscuro, menú de usuario
- ✅ **Gestión de Estado** - Zustand con persistencia en localStorage
- ✅ **Animaciones Suaves** - Framer Motion para transiciones elegantes
- ✅ **TypeScript Completo** - Type-safe en toda la aplicación

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd frontend/datascope-ai

# Instalar dependencias
npm install

# Instalar dependencia de gráficos (IMPORTANTE)
npm install react-chartjs-2

# Iniciar servidor de desarrollo
npm run dev
```

## 👥 Usuarios Mock (Desarrollo)

Durante el desarrollo, usa estos usuarios ficticios:

| Email | Contraseña | Rol | Descripción |
|-------|-----------|-----|-------------|
| `admin@datascope.ai` | `admin123` | Admin | Acceso completo |
| `juan@datascope.ai` | `analyst123` | Analyst | Análisis de datos |
| `maria@datascope.ai` | `user123` | User | Usuario estándar |

**Nota**: También puedes registrarte con cualquier email y contraseña. Los datos se almacenan temporalmente.

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes UI básicos (Button, Input)
│   ├── layout/          # Sidebar, Navbar, MainLayout
│   ├── charts/          # Componentes Chart.js (Line, Bar, Doughnut)
│   └── MockUserInfo.tsx # Info de usuarios mock
├── features/            # Módulos por feature
│   └── auth/           # Sistema de autenticación
│       ├── components/ # Componentes específicos de auth
│       ├── hooks/      # Hooks personalizados
│       ├── pages/      # Login y Register
│       └── services/   # Servicios de API
├── layout/             # Layouts principales
│   └── AuthLayout.tsx  # Layout para login/register
├── pages/              # Páginas de la aplicación
│   ├── DashboardPage.tsx        # Dashboard principal
│   ├── TechTrendsPage.tsx       # Tendencias tecnológicas
│   ├── BusinessReputationPage.tsx # Reputación empresarial
│   ├── ViralProductsPage.tsx    # Productos virales
│   ├── AnalyticsPage.tsx        # Analytics
│   ├── DataPage.tsx             # Datos
│   ├── SettingsPage.tsx         # Configuración
│   └── NotificationsPage.tsx    # Notificaciones
├── services/           # Servicios y datos
│   ├── authService.ts         # API de autenticación (futuro)
│   ├── mockData.ts            # Usuarios mock
│   └── chartMockData.ts       # Datos de gráficos
├── store/              # Estado global
│   └── authStore.ts    # Store de autenticación (Zustand)
├── types/              # Definiciones TypeScript
│   └── auth.types.ts   # Tipos de autenticación
├── App.tsx             # Componente raíz con routing
└── main.tsx            # Punto de entrada
```

## 📊 Dashboard - Gráficos Disponibles

El dashboard incluye 5 gráficos interactivos:

1. **Tendencias Tecnológicas** - Line chart con React, Vue y Angular
2. **Análisis de Sentimientos** - Doughnut chart con 5 categorías
3. **Productos más Buscados** - Bar chart horizontal con 6 productos
4. **Tráfico del Sitio Web** - Line chart semanal
5. **Revenue Analysis** - Bar chart comparativo 2025 vs 2026

## 🎨 Componentes UI

### Button Component
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

### Input Component
```tsx
import { Input } from '@/components/ui/Input';

<Input 
  type="email"
  placeholder="Email"
  icon={Mail}
/>
```

### Charts
```tsx
import { LineChart, BarChart, DoughnutChart } from '@/components/charts/Charts';

<LineChart data={lineChartData} />
<BarChart data={barChartData} />
<DoughnutChart data={doughnutChartData} />
```

## 🔒 Sistema de Autenticación

### Login
```tsx
const { login } = useAuthStore();

await login({ email, password });
// Redirige automáticamente a /dashboard
```

### Register
```tsx
const { register } = useAuthStore();

await register({ 
  name, 
  email, 
  password 
});
// Redirige automáticamente a /dashboard
```

### Logout
```tsx
const { logout } = useAuthStore();

logout();
// Limpia localStorage y redirige a /login
```

### Protected Routes
Todas las rutas están protegidas excepto `/login` y `/register`:

```tsx
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<DashboardPage />} />
  {/* ... otras rutas */}
</Route>
```

## 🌐 Rutas Disponibles

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/` | Redirige a /dashboard | ✅ |
| `/login` | Página de inicio de sesión | ✅ |
| `/register` | Página de registro | ✅ |
| `/dashboard` | Dashboard principal | ✅ |
| `/tech-trends` | Tendencias tecnológicas | 🚧 |
| `/business-reputation` | Reputación empresarial | 🚧 |
| `/viral-products` | Productos virales | 🚧 |
| `/analytics` | Analytics | 🚧 |
| `/data` | Datos | 🚧 |
| `/settings` | Configuración | 🚧 |
| `/notifications` | Notificaciones | 🚧 |

Estado: ✅ Completado | 🚧 En desarrollo

## 🔧 Tecnologías

- **React 19.1.0** - UI Library
- **TypeScript 5.5.3** - Type Safety
- **Vite 7.0.4** - Build Tool
- **Tailwind CSS 4.2.1** - Styling
- **React Router DOM 7.13.1** - Routing
- **Zustand 5.0.11** - State Management
- **Framer Motion 12.35.0** - Animations
- **Chart.js 4.5.1** - Gráficos
- **react-chartjs-2 5.3.3** - React wrapper para Chart.js
- **Lucide React 0.577.0** - Icons
- **Axios 1.13.6** - HTTP Client

## 🔄 Migración a Backend Real

Cuando el backend esté listo:

1. **Actualizar authStore.ts**:
```tsx
// Reemplazar:
const mockUser = MOCK_USERS.find(u => 
  u.email === credentials.email && 
  u.password === credentials.password
);

// Por:
const response = await authService.login(credentials);
```

2. **Configurar variables de entorno**:
```bash
# .env
VITE_API_URL=http://localhost:8000/api
```

3. **Habilitar authService.ts**:
El servicio ya está preparado con Axios:
```tsx
export const authService = {
  login: (credentials: LoginCredentials) => 
    api.post<AuthResponse>('/auth/login', credentials),
  // ...
};
```

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo en http://localhost:5173
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Lint con ESLint
npm run type-check   # Verificar tipos TypeScript
```

## 🎯 Próximos Pasos

- [ ] Instalar `react-chartjs-2` para habilitar gráficos
- [ ] Desarrollar contenido de páginas en desarrollo
- [ ] Implementar funcionalidad de modo oscuro completa
- [ ] Conectar con backend real (cuando esté disponible)
- [ ] Añadir exportación de datos (CSV/Excel)
- [ ] Implementar búsqueda funcional en Navbar
- [ ] Añadir notificaciones en tiempo real
- [ ] Crear tests con Vitest

## 📖 Documentación Adicional

- [Guía de Autenticación Mock](./MOCK_AUTH.md)
- [Documentación del Sistema de Auth](./README_AUTH.md)

## 🤝 Contribución

Este es un proyecto académico de grado. Por favor contacta al equipo antes de contribuir.

## 📄 Licencia

Proyecto académico - COTECMAR

---

**Desarrollado con ❤️ para análisis inteligente de tendencias**
