# DataScope AI - Frontend

Sistema de autenticación y dashboard para la plataforma DataScope AI.

## 🎨 Diseño

El diseño del sistema de autenticación está orientado a IA y web scraping con una estética:
- **Minimalista y profesional**
- **Gradientes modernos** con tonos azules e índigos
- **Animaciones fluidas** con Framer Motion
- **Responsive design** adaptable a todos los dispositivos
- **Dark mode ready** (preparado para modo oscuro)

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   └── ui/                 # Componentes reutilizables
│       ├── Button.tsx      # Botón con variantes y estados
│       ├── Input.tsx       # Input con validación y estilos
│       └── index.ts
│
├── features/
│   └── auth/               # Módulo de autenticación
│       ├── pages/
│       │   ├── LoginPage.tsx
│       │   ├── RegisterPage.tsx
│       │   └── index.ts
│       ├── components/     # Componentes específicos de auth
│       ├── hooks/          # Custom hooks de autenticación
│       └── services/       # Servicios API de auth
│
├── layout/
│   └── AuthLayout.tsx      # Layout para páginas de autenticación
│
├── pages/
│   └── DashboardPage.tsx   # Dashboard principal
│
├── services/
│   └── authService.ts      # Servicio de API de autenticación
│
├── store/
│   └── authStore.ts        # Estado global con Zustand
│
├── types/
│   └── auth.types.ts       # Tipos TypeScript de autenticación
│
├── App.tsx                 # Configuración de rutas
└── main.tsx               # Punto de entrada
```

## 🚀 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tu configuración:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

## 📦 Tecnologías Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **React Router DOM** - Enrutamiento
- **Tailwind CSS 4** - Estilos utility-first
- **Zustand** - Estado global
- **Axios** - Cliente HTTP
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **Vite** - Build tool

## 🔐 Sistema de Autenticación

### Características

- ✅ **Login** con validación de formularios
- ✅ **Registro** con validación de contraseña fuerte
- ✅ **Indicador de fortaleza** de contraseña
- ✅ **Manejo de errores** con mensajes claros
- ✅ **Estados de carga** durante peticiones
- ✅ **Persistencia de sesión** con localStorage
- ✅ **Rutas protegidas** con redirección automática
- ✅ **Validación en tiempo real** de campos

### Rutas Disponibles

- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/dashboard` - Dashboard (requiere autenticación)
- `/` - Redirecciona a `/login`

## 🎯 Componentes UI Creados

### Button

Botón con múltiples variantes y estados:

```tsx
<Button 
  variant="primary" // primary | secondary | outline | ghost | danger
  size="md"         // sm | md | lg
  icon={Icon}       // Icono de Lucide React
  iconPosition="left" // left | right
  isLoading={false}
  fullWidth={false}
>
  Texto del botón
</Button>
```

### Input

Input con validación y estilos:

```tsx
<Input
  label="Email"
  type="email"
  name="email"
  placeholder="tu@email.com"
  icon={Mail}
  value={value}
  onChange={handleChange}
  error={error}
  helperText="Texto de ayuda"
/>
```

## 🎨 Paleta de Colores

El diseño utiliza una paleta enfocada en tecnología e IA:

- **Primarios:** Azul (#3B82F6) a Índigo (#6366F1)
- **Secundarios:** Púrpura (#9333EA) a Rosa (#EC4899)
- **Acentos:** Verde (#10B981), Rojo (#EF4444)
- **Neutros:** Grises de la escala de Tailwind

## 📱 Responsive Design

El diseño es completamente responsive:

- **Mobile:** Vista optimizada para móviles
- **Tablet:** Layout adaptado
- **Desktop:** Diseño completo con elementos decorativos

## 🔄 Estado Global

El estado de autenticación se maneja con Zustand:

```typescript
const { 
  user,           // Usuario actual
  token,          // Token de autenticación
  isAuthenticated, // Estado de autenticación
  isLoading,      // Estado de carga
  error,          // Mensajes de error
  login,          // Función de login
  register,       // Función de registro
  logout,         // Función de logout
  clearError      // Limpiar errores
} = useAuthStore();
```

## 🛡️ Validaciones

### Login
- Email válido
- Contraseña mínima de 6 caracteres

### Registro
- Nombre de al menos 3 caracteres
- Email válido
- Contraseña de al menos 8 caracteres
- Debe incluir mayúsculas, minúsculas y números
- Confirmación de contraseña

## 🎭 Animaciones

Todas las páginas y componentes incluyen animaciones suaves:

- **Entrada de página:** Fade in + slide
- **Hover effects:** Scale y color transitions
- **Estados de carga:** Spinners animados
- **Elementos flotantes:** Partículas y gradientes animados

## 🌙 Dark Mode

El diseño está preparado para dark mode usando las clases `dark:` de Tailwind CSS.

## 📝 Próximos Pasos

- [ ] Implementar recuperación de contraseña
- [ ] Agregar autenticación social (Google, GitHub)
- [ ] Implementar 2FA (autenticación de dos factores)
- [ ] Agregar página de perfil de usuario
- [ ] Implementar refresh token automático

## 👨‍💻 Desarrollo

Para agregar nuevas funcionalidades:

1. Crear componentes en `src/components/` o `src/features/`
2. Añadir tipos en `src/types/`
3. Crear servicios en `src/services/`
4. Actualizar el store si es necesario en `src/store/`
5. Configurar rutas en `App.tsx`

---

**Desarrollado como parte del proyecto DataScope AI** 🚀
