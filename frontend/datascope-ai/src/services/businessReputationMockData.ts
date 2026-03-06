// Mock data para el módulo de Reputación Empresarial

export interface Company {
  id: number;
  name: string;
  industry: string;
  description: string;
  logo: string;
  overallRating: number;
  reviewCount: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  sources: {
    google: number;
    trustpilot: number;
    glassdoor: number;
    yelp: number;
  };
  trend: 'up' | 'down' | 'stable';
  trendChange: number;
  lastUpdated: string;
  tags: string[];
  color: string;
}

export const companies: Company[] = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    industry: 'Tecnología',
    description: 'Empresa líder en desarrollo de software empresarial',
    logo: '💻',
    overallRating: 4.8,
    reviewCount: 12847,
    sentiment: {
      positive: 78,
      neutral: 18,
      negative: 4,
    },
    sources: {
      google: 5420,
      trustpilot: 3890,
      glassdoor: 2341,
      yelp: 1196,
    },
    trend: 'up',
    trendChange: 12.5,
    lastUpdated: '2026-03-06',
    tags: ['Software', 'B2B', 'Enterprise'],
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'GreenEco Industries',
    industry: 'Energía Renovable',
    description: 'Soluciones sostenibles para energía limpia',
    logo: '🌱',
    overallRating: 4.6,
    reviewCount: 8934,
    sentiment: {
      positive: 72,
      neutral: 22,
      negative: 6,
    },
    sources: {
      google: 4120,
      trustpilot: 2890,
      glassdoor: 1234,
      yelp: 690,
    },
    trend: 'up',
    trendChange: 8.3,
    lastUpdated: '2026-03-05',
    tags: ['Sustentabilidad', 'Energía', 'Verde'],
    color: 'bg-green-500',
  },
  {
    id: 3,
    name: 'FastFood Chain',
    industry: 'Restaurantes',
    description: 'Cadena internacional de comida rápida',
    logo: '🍔',
    overallRating: 3.2,
    reviewCount: 45230,
    sentiment: {
      positive: 42,
      neutral: 28,
      negative: 30,
    },
    sources: {
      google: 18900,
      trustpilot: 12340,
      glassdoor: 8765,
      yelp: 5225,
    },
    trend: 'down',
    trendChange: -5.7,
    lastUpdated: '2026-03-06',
    tags: ['Comida', 'Retail', 'Servicio'],
    color: 'bg-red-500',
  },
  {
    id: 4,
    name: 'HealthPlus Clinic',
    industry: 'Salud',
    description: 'Red de clínicas médicas especializadas',
    logo: '🏥',
    overallRating: 4.9,
    reviewCount: 6543,
    sentiment: {
      positive: 85,
      neutral: 12,
      negative: 3,
    },
    sources: {
      google: 3210,
      trustpilot: 1890,
      glassdoor: 987,
      yelp: 456,
    },
    trend: 'up',
    trendChange: 15.2,
    lastUpdated: '2026-03-06',
    tags: ['Medicina', 'Cuidado', 'Profesional'],
    color: 'bg-cyan-500',
  },
  {
    id: 5,
    name: 'FashionHub Store',
    industry: 'Retail',
    description: 'Tienda de moda y accesorios moderna',
    logo: '👗',
    overallRating: 4.1,
    reviewCount: 15670,
    sentiment: {
      positive: 62,
      neutral: 25,
      negative: 13,
    },
    sources: {
      google: 7890,
      trustpilot: 4320,
      glassdoor: 2100,
      yelp: 1360,
    },
    trend: 'stable',
    trendChange: 0.8,
    lastUpdated: '2026-03-05',
    tags: ['Moda', 'Retail', 'E-commerce'],
    color: 'bg-pink-500',
  },
  {
    id: 6,
    name: 'EduLearn Platform',
    industry: 'Educación',
    description: 'Plataforma de cursos online y certificaciones',
    logo: '📚',
    overallRating: 4.7,
    reviewCount: 23450,
    sentiment: {
      positive: 76,
      neutral: 19,
      negative: 5,
    },
    sources: {
      google: 10200,
      trustpilot: 8900,
      glassdoor: 3200,
      yelp: 1150,
    },
    trend: 'up',
    trendChange: 18.9,
    lastUpdated: '2026-03-06',
    tags: ['Educación', 'Online', 'Certificaciones'],
    color: 'bg-indigo-500',
  },
  {
    id: 7,
    name: 'AutoDrive Motors',
    industry: 'Automotriz',
    description: 'Concesionario y servicio automotriz premium',
    logo: '🚗',
    overallRating: 3.8,
    reviewCount: 5432,
    sentiment: {
      positive: 55,
      neutral: 30,
      negative: 15,
    },
    sources: {
      google: 2890,
      trustpilot: 1340,
      glassdoor: 876,
      yelp: 326,
    },
    trend: 'down',
    trendChange: -3.2,
    lastUpdated: '2026-03-04',
    tags: ['Autos', 'Servicio', 'Premium'],
    color: 'bg-gray-700',
  },
  {
    id: 8,
    name: 'CloudBank Financial',
    industry: 'Finanzas',
    description: 'Banco digital con servicios innovadores',
    logo: '🏦',
    overallRating: 4.4,
    reviewCount: 18765,
    sentiment: {
      positive: 68,
      neutral: 24,
      negative: 8,
    },
    sources: {
      google: 8900,
      trustpilot: 5670,
      glassdoor: 3100,
      yelp: 1095,
    },
    trend: 'up',
    trendChange: 10.4,
    lastUpdated: '2026-03-06',
    tags: ['Fintech', 'Banca', 'Digital'],
    color: 'bg-purple-500',
  },
  {
    id: 9,
    name: 'HomeComfort Real Estate',
    industry: 'Inmobiliaria',
    description: 'Agencia inmobiliaria de confianza',
    logo: '🏠',
    overallRating: 4.3,
    reviewCount: 7234,
    sentiment: {
      positive: 65,
      neutral: 27,
      negative: 8,
    },
    sources: {
      google: 3890,
      trustpilot: 2100,
      glassdoor: 890,
      yelp: 354,
    },
    trend: 'stable',
    trendChange: 1.2,
    lastUpdated: '2026-03-05',
    tags: ['Inmobiliaria', 'Ventas', 'Arriendos'],
    color: 'bg-orange-500',
  },
  {
    id: 10,
    name: 'FitLife Gym',
    industry: 'Fitness',
    description: 'Cadena de gimnasios y wellness centers',
    logo: '💪',
    overallRating: 4.5,
    reviewCount: 11234,
    sentiment: {
      positive: 70,
      neutral: 23,
      negative: 7,
    },
    sources: {
      google: 5670,
      trustpilot: 3200,
      glassdoor: 1654,
      yelp: 710,
    },
    trend: 'up',
    trendChange: 6.8,
    lastUpdated: '2026-03-06',
    tags: ['Fitness', 'Salud', 'Bienestar'],
    color: 'bg-yellow-500',
  },
  {
    id: 11,
    name: 'TravelExplore Agency',
    industry: 'Turismo',
    description: 'Agencia de viajes y tours personalizados',
    logo: '✈️',
    overallRating: 4.2,
    reviewCount: 9876,
    sentiment: {
      positive: 64,
      neutral: 26,
      negative: 10,
    },
    sources: {
      google: 4560,
      trustpilot: 3100,
      glassdoor: 1456,
      yelp: 760,
    },
    trend: 'stable',
    trendChange: -0.5,
    lastUpdated: '2026-03-04',
    tags: ['Viajes', 'Turismo', 'Experiencias'],
    color: 'bg-teal-500',
  },
  {
    id: 12,
    name: 'PetCare Veterinary',
    industry: 'Veterinaria',
    description: 'Clínica veterinaria integral 24/7',
    logo: '🐾',
    overallRating: 4.9,
    reviewCount: 4567,
    sentiment: {
      positive: 88,
      neutral: 10,
      negative: 2,
    },
    sources: {
      google: 2340,
      trustpilot: 1456,
      glassdoor: 567,
      yelp: 204,
    },
    trend: 'up',
    trendChange: 22.3,
    lastUpdated: '2026-03-06',
    tags: ['Mascotas', 'Veterinaria', 'Emergencias'],
    color: 'bg-amber-500',
  },
];

// Datos para gráficos
export const sentimentTrendData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Positivas',
      data: [65, 68, 72, 70, 75, 78, 82],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Neutrales',
      data: [25, 24, 22, 23, 20, 18, 15],
      borderColor: 'rgb(156, 163, 175)',
      backgroundColor: 'rgba(156, 163, 175, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Negativas',
      data: [10, 8, 6, 7, 5, 4, 3],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

export const industryDistributionData = {
  labels: ['Tecnología', 'Retail', 'Salud', 'Finanzas', 'Educación', 'Otros'],
  datasets: [
    {
      label: 'Empresas',
      data: [28, 22, 18, 15, 12, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(6, 182, 212, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(156, 163, 175, 0.8)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(236, 72, 153)',
        'rgb(6, 182, 212)',
        'rgb(168, 85, 247)',
        'rgb(99, 102, 241)',
        'rgb(156, 163, 175)',
      ],
      borderWidth: 2,
    },
  ],
};

export const reviewSourcesData = {
  labels: ['Google', 'Trustpilot', 'Glassdoor', 'Yelp'],
  datasets: [
    {
      label: 'Reseñas',
      data: [52000, 38000, 24000, 12000],
      backgroundColor: 'rgba(168, 85, 247, 0.8)',
      borderColor: 'rgb(168, 85, 247)',
      borderWidth: 2,
    },
  ],
};

export const ratingDistributionData = {
  labels: ['1 estrella', '2 estrellas', '3 estrellas', '4 estrellas', '5 estrellas'],
  datasets: [
    {
      label: 'Cantidad de reseñas',
      data: [1200, 2800, 8500, 28000, 45000],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(250, 204, 21, 0.8)',
        'rgba(163, 230, 53, 0.8)',
        'rgba(34, 197, 94, 0.8)',
      ],
      borderColor: [
        'rgb(239, 68, 68)',
        'rgb(251, 146, 60)',
        'rgb(250, 204, 21)',
        'rgb(163, 230, 53)',
        'rgb(34, 197, 94)',
      ],
      borderWidth: 2,
    },
  ],
};

export const stats = [
  {
    label: 'Empresas Monitoreadas',
    value: '1,247',
    change: '+23',
    isPositive: true,
    icon: 'Building2',
  },
  {
    label: 'Reseñas Analizadas',
    value: '126K',
    change: '+18%',
    isPositive: true,
    icon: 'MessageSquare',
  },
  {
    label: 'Rating Promedio',
    value: '4.3',
    change: '+0.2',
    isPositive: true,
    icon: 'Star',
  },
  {
    label: 'Sentimiento Positivo',
    value: '68%',
    change: '+5%',
    isPositive: true,
    icon: 'TrendingUp',
  },
];
