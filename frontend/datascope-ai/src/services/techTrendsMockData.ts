// Mock data para el módulo de Tendencias Tecnológicas

export interface Technology {
  id: number;
  name: string;
  category: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  growthRate: number;
  popularity: number;
  sources: {
    github: number;
    stackoverflow: number;
    reddit: number;
  };
  keywords: string[];
  color: string;
}

export interface TrendData {
  month: string;
  value: number;
}

export const technologies: Technology[] = [
  {
    id: 1,
    name: 'React 19',
    category: 'Frontend Framework',
    description: 'Nueva versión con Server Components y mejoras de performance',
    trend: 'up',
    growthRate: 45.8,
    popularity: 92,
    sources: {
      github: 15420,
      stackoverflow: 8934,
      reddit: 2341,
    },
    keywords: ['react', 'server-components', 'rsc', 'frontend'],
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Next.js 15',
    category: 'Full-stack Framework',
    description: 'Framework React con App Router y optimizaciones automáticas',
    trend: 'up',
    growthRate: 52.3,
    popularity: 89,
    sources: {
      github: 18750,
      stackoverflow: 6823,
      reddit: 1987,
    },
    keywords: ['nextjs', 'react', 'app-router', 'fullstack'],
    color: 'bg-black',
  },
  {
    id: 3,
    name: 'Bun 1.0',
    category: 'JavaScript Runtime',
    description: 'Runtime ultrarrápido como alternativa a Node.js',
    trend: 'up',
    growthRate: 78.5,
    popularity: 67,
    sources: {
      github: 12430,
      stackoverflow: 3421,
      reddit: 1654,
    },
    keywords: ['bun', 'runtime', 'javascript', 'performance'],
    color: 'bg-orange-500',
  },
  {
    id: 4,
    name: 'Astro',
    category: 'Static Site Generator',
    description: 'Framework de contenido con arquitectura de islas',
    trend: 'up',
    growthRate: 62.1,
    popularity: 71,
    sources: {
      github: 9876,
      stackoverflow: 2341,
      reddit: 987,
    },
    keywords: ['astro', 'islands', 'static-site', 'performance'],
    color: 'bg-purple-500',
  },
  {
    id: 5,
    name: 'Tailwind CSS',
    category: 'CSS Framework',
    description: 'Utility-first CSS framework para diseño rápido',
    trend: 'stable',
    growthRate: 12.3,
    popularity: 94,
    sources: {
      github: 22340,
      stackoverflow: 12456,
      reddit: 3421,
    },
    keywords: ['tailwind', 'css', 'utility-first', 'styling'],
    color: 'bg-cyan-500',
  },
  {
    id: 6,
    name: 'TypeScript',
    category: 'Programming Language',
    description: 'JavaScript con tipado estático para mayor seguridad',
    trend: 'stable',
    growthRate: 8.7,
    popularity: 96,
    sources: {
      github: 28930,
      stackoverflow: 18765,
      reddit: 4532,
    },
    keywords: ['typescript', 'javascript', 'typed', 'language'],
    color: 'bg-blue-600',
  },
  {
    id: 7,
    name: 'Svelte 5',
    category: 'Frontend Framework',
    description: 'Framework compilado con Runes para reactividad',
    trend: 'up',
    growthRate: 38.4,
    popularity: 73,
    sources: {
      github: 8765,
      stackoverflow: 3421,
      reddit: 1234,
    },
    keywords: ['svelte', 'runes', 'compiler', 'reactive'],
    color: 'bg-orange-600',
  },
  {
    id: 8,
    name: 'Vue 3',
    category: 'Frontend Framework',
    description: 'Framework progresivo con Composition API',
    trend: 'stable',
    growthRate: 5.2,
    popularity: 85,
    sources: {
      github: 16540,
      stackoverflow: 9876,
      reddit: 2103,
    },
    keywords: ['vue', 'composition-api', 'progressive', 'frontend'],
    color: 'bg-green-500',
  },
  {
    id: 9,
    name: 'Deno 2.0',
    category: 'JavaScript Runtime',
    description: 'Runtime seguro y moderno para JavaScript/TypeScript',
    trend: 'up',
    growthRate: 42.6,
    popularity: 58,
    sources: {
      github: 7654,
      stackoverflow: 2341,
      reddit: 876,
    },
    keywords: ['deno', 'runtime', 'secure', 'typescript'],
    color: 'bg-gray-800',
  },
  {
    id: 10,
    name: 'Solid.js',
    category: 'Frontend Framework',
    description: 'Framework reactivo ultrarrápido sin Virtual DOM',
    trend: 'up',
    growthRate: 56.3,
    popularity: 64,
    sources: {
      github: 6543,
      stackoverflow: 1987,
      reddit: 654,
    },
    keywords: ['solidjs', 'reactive', 'performance', 'no-vdom'],
    color: 'bg-blue-400',
  },
  {
    id: 11,
    name: 'Prisma',
    category: 'ORM',
    description: 'ORM moderno para Node.js y TypeScript',
    trend: 'up',
    growthRate: 34.7,
    popularity: 81,
    sources: {
      github: 11234,
      stackoverflow: 5432,
      reddit: 1432,
    },
    keywords: ['prisma', 'orm', 'database', 'typescript'],
    color: 'bg-indigo-600',
  },
  {
    id: 12,
    name: 'Angular',
    category: 'Frontend Framework',
    description: 'Framework empresarial de Google',
    trend: 'down',
    growthRate: -3.2,
    popularity: 76,
    sources: {
      github: 14320,
      stackoverflow: 11234,
      reddit: 1876,
    },
    keywords: ['angular', 'google', 'enterprise', 'typescript'],
    color: 'bg-red-600',
  },
];

// Datos de tendencia temporal para gráficos
export const trendLineData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'React',
      data: [65, 68, 72, 75, 79, 85, 92],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Next.js',
      data: [45, 52, 58, 64, 71, 78, 89],
      borderColor: 'rgb(0, 0, 0)',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Bun',
      data: [15, 22, 31, 38, 48, 58, 67],
      borderColor: 'rgb(249, 115, 22)',
      backgroundColor: 'rgba(249, 115, 22, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Vue',
      data: [78, 79, 80, 82, 83, 84, 85],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
    },
  ],
};

// Datos de distribución por categoría
export const categoryDistributionData = {
  labels: ['Frontend', 'Backend', 'Full-stack', 'Database', 'DevOps', 'Mobile'],
  datasets: [
    {
      label: 'Tecnologías',
      data: [35, 22, 18, 12, 8, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(14, 165, 233, 0.8)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(34, 197, 94)',
        'rgb(168, 85, 247)',
        'rgb(249, 115, 22)',
        'rgb(239, 68, 68)',
        'rgb(14, 165, 233)',
      ],
      borderWidth: 2,
    },
  ],
};

// Datos de fuentes de información
export const sourcesComparisonData = {
  labels: ['GitHub', 'Stack Overflow', 'Reddit', 'Twitter', 'Dev.to', 'Medium'],
  datasets: [
    {
      label: 'Menciones',
      data: [45000, 32000, 18000, 28000, 12000, 15000],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2,
    },
  ],
};

// Actividad semanal
export const weeklyActivityData = {
  labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  datasets: [
    {
      label: 'Discusiones',
      data: [320, 380, 450, 420, 390, 180, 120],
      backgroundColor: 'rgba(168, 85, 247, 0.8)',
      borderColor: 'rgb(168, 85, 247)',
      borderWidth: 2,
    },
    {
      label: 'Commits',
      data: [280, 340, 380, 360, 320, 140, 90],
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderColor: 'rgb(34, 197, 94)',
      borderWidth: 2,
    },
  ],
};

// Estadísticas generales
export const stats = [
  {
    label: 'Total Tecnologías',
    value: '2,847',
    change: '+12%',
    isPositive: true,
    icon: 'Code',
  },
  {
    label: 'Tendencias Activas',
    value: '156',
    change: '+34%',
    isPositive: true,
    icon: 'TrendingUp',
  },
  {
    label: 'Fuentes Monitoreadas',
    value: '18',
    change: '+3',
    isPositive: true,
    icon: 'Globe',
  },
  {
    label: 'Análisis Diarios',
    value: '3,421',
    change: '+8%',
    isPositive: true,
    icon: 'BarChart3',
  },
];
