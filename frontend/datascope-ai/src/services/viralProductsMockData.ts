// Mock data para el módulo de Productos Virales

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  viralScore: number;
  salesCount: number;
  trend: 'up' | 'down' | 'stable';
  trendChange: number;
  platforms: {
    amazon: number;
    aliexpress: number;
    mercadolibre: number;
    shopify: number;
  };
  engagement: {
    views: number;
    shares: number;
    reviews: number;
  };
  avgRating: number;
  lastUpdated: string;
  tags: string[];
  color: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Smartwatch Pro X9',
    category: 'Electrónicos',
    description: 'Reloj inteligente con monitoreo de salud y GPS integrado',
    price: 149.99,
    image: '⌚',
    viralScore: 95,
    salesCount: 45680,
    trend: 'up',
    trendChange: 32.5,
    platforms: {
      amazon: 18900,
      aliexpress: 15400,
      mercadolibre: 8200,
      shopify: 3180,
    },
    engagement: {
      views: 1240000,
      shares: 38900,
      reviews: 12450,
    },
    avgRating: 4.7,
    lastUpdated: '2026-03-06',
    tags: ['Tech', 'Fitness', 'Trending'],
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Wireless Earbuds Pro',
    category: 'Audio',
    description: 'Audífonos inalámbricos con cancelación de ruido activa',
    price: 89.99,
    image: '🎧',
    viralScore: 92,
    salesCount: 67890,
    trend: 'up',
    trendChange: 45.8,
    platforms: {
      amazon: 28900,
      aliexpress: 22100,
      mercadolibre: 12300,
      shopify: 4590,
    },
    engagement: {
      views: 2180000,
      shares: 54300,
      reviews: 18900,
    },
    avgRating: 4.8,
    lastUpdated: '2026-03-06',
    tags: ['Audio', 'Music', 'Wireless'],
    color: 'bg-purple-500',
  },
  {
    id: 3,
    name: 'LED Ring Light Kit',
    category: 'Fotografía',
    description: 'Aro de luz LED profesional para fotografía y streaming',
    price: 45.99,
    image: '💡',
    viralScore: 88,
    salesCount: 34560,
    trend: 'up',
    trendChange: 28.3,
    platforms: {
      amazon: 15600,
      aliexpress: 11200,
      mercadolibre: 5400,
      shopify: 2360,
    },
    engagement: {
      views: 890000,
      shares: 28400,
      reviews: 9870,
    },
    avgRating: 4.6,
    lastUpdated: '2026-03-05',
    tags: ['Photography', 'Streaming', 'Content'],
    color: 'bg-yellow-500',
  },
  {
    id: 4,
    name: 'Smart Water Bottle',
    category: 'Fitness',
    description: 'Botella inteligente que rastrea tu hidratación diaria',
    price: 34.99,
    image: '💧',
    viralScore: 78,
    salesCount: 23450,
    trend: 'up',
    trendChange: 18.7,
    platforms: {
      amazon: 9800,
      aliexpress: 7600,
      mercadolibre: 4200,
      shopify: 1850,
    },
    engagement: {
      views: 560000,
      shares: 15600,
      reviews: 6780,
    },
    avgRating: 4.4,
    lastUpdated: '2026-03-06',
    tags: ['Health', 'Fitness', 'Smart'],
    color: 'bg-cyan-500',
  },
  {
    id: 5,
    name: 'Portable Blender',
    category: 'Cocina',
    description: 'Licuadora portátil recargable para smoothies al instante',
    price: 29.99,
    image: '🥤',
    viralScore: 85,
    salesCount: 41230,
    trend: 'up',
    trendChange: 22.4,
    platforms: {
      amazon: 18700,
      aliexpress: 13900,
      mercadolibre: 6400,
      shopify: 2230,
    },
    engagement: {
      views: 780000,
      shares: 21300,
      reviews: 11200,
    },
    avgRating: 4.5,
    lastUpdated: '2026-03-06',
    tags: ['Kitchen', 'Portable', 'Healthy'],
    color: 'bg-green-500',
  },
  {
    id: 6,
    name: 'Gaming RGB Keyboard',
    category: 'Gaming',
    description: 'Teclado mecánico gaming con iluminación RGB personalizable',
    price: 79.99,
    image: '⌨️',
    viralScore: 90,
    salesCount: 28900,
    trend: 'up',
    trendChange: 35.6,
    platforms: {
      amazon: 12400,
      aliexpress: 9800,
      mercadolibre: 5100,
      shopify: 1600,
    },
    engagement: {
      views: 1120000,
      shares: 32400,
      reviews: 8900,
    },
    avgRating: 4.7,
    lastUpdated: '2026-03-06',
    tags: ['Gaming', 'RGB', 'Mechanical'],
    color: 'bg-indigo-500',
  },
  {
    id: 7,
    name: 'Yoga Mat Premium',
    category: 'Fitness',
    description: 'Tapete de yoga antideslizante ecológico con marcas de alineación',
    price: 39.99,
    image: '🧘',
    viralScore: 72,
    salesCount: 19870,
    trend: 'stable',
    trendChange: 3.2,
    platforms: {
      amazon: 8900,
      aliexpress: 6700,
      mercadolibre: 3200,
      shopify: 1070,
    },
    engagement: {
      views: 420000,
      shares: 12300,
      reviews: 5670,
    },
    avgRating: 4.6,
    lastUpdated: '2026-03-05',
    tags: ['Yoga', 'Fitness', 'Eco-friendly'],
    color: 'bg-pink-500',
  },
  {
    id: 8,
    name: 'Mini Projector 4K',
    category: 'Electrónicos',
    description: 'Proyector portátil 4K con conexión WiFi y Bluetooth',
    price: 199.99,
    image: '📽️',
    viralScore: 87,
    salesCount: 15670,
    trend: 'up',
    trendChange: 25.8,
    platforms: {
      amazon: 7800,
      aliexpress: 5100,
      mercadolibre: 2100,
      shopify: 670,
    },
    engagement: {
      views: 680000,
      shares: 19800,
      reviews: 4230,
    },
    avgRating: 4.5,
    lastUpdated: '2026-03-04',
    tags: ['Home Theater', '4K', 'Portable'],
    color: 'bg-red-500',
  },
  {
    id: 9,
    name: 'Electric Toothbrush',
    category: 'Cuidado Personal',
    description: 'Cepillo dental eléctrico sónico con 5 modos de limpieza',
    price: 49.99,
    image: '🪥',
    viralScore: 81,
    salesCount: 32100,
    trend: 'up',
    trendChange: 15.3,
    platforms: {
      amazon: 14500,
      aliexpress: 10900,
      mercadolibre: 5200,
      shopify: 1500,
    },
    engagement: {
      views: 540000,
      shares: 16700,
      reviews: 8900,
    },
    avgRating: 4.7,
    lastUpdated: '2026-03-06',
    tags: ['Dental', 'Health', 'Smart'],
    color: 'bg-teal-500',
  },
  {
    id: 10,
    name: 'Resistance Bands Set',
    category: 'Fitness',
    description: 'Set de bandas de resistencia con 5 niveles de intensidad',
    price: 24.99,
    image: '💪',
    viralScore: 76,
    salesCount: 27650,
    trend: 'stable',
    trendChange: 2.1,
    platforms: {
      amazon: 12300,
      aliexpress: 9100,
      mercadolibre: 4800,
      shopify: 1450,
    },
    engagement: {
      views: 470000,
      shares: 14200,
      reviews: 7890,
    },
    avgRating: 4.5,
    lastUpdated: '2026-03-05',
    tags: ['Workout', 'Home Gym', 'Portable'],
    color: 'bg-orange-500',
  },
  {
    id: 11,
    name: 'Smart Door Lock',
    category: 'Hogar Inteligente',
    description: 'Cerradura inteligente con huella digital y app móvil',
    price: 129.99,
    image: '🔐',
    viralScore: 84,
    salesCount: 18900,
    trend: 'up',
    trendChange: 20.5,
    platforms: {
      amazon: 8700,
      aliexpress: 6100,
      mercadolibre: 3200,
      shopify: 900,
    },
    engagement: {
      views: 620000,
      shares: 18900,
      reviews: 5430,
    },
    avgRating: 4.6,
    lastUpdated: '2026-03-06',
    tags: ['Smart Home', 'Security', 'IoT'],
    color: 'bg-gray-700',
  },
  {
    id: 12,
    name: 'Laptop Stand Aluminum',
    category: 'Oficina',
    description: 'Soporte ergonómico de aluminio para laptop con ventilación',
    price: 35.99,
    image: '💻',
    viralScore: 79,
    salesCount: 22340,
    trend: 'up',
    trendChange: 12.8,
    platforms: {
      amazon: 10200,
      aliexpress: 7600,
      mercadolibre: 3600,
      shopify: 940,
    },
    engagement: {
      views: 510000,
      shares: 15800,
      reviews: 6780,
    },
    avgRating: 4.7,
    lastUpdated: '2026-03-05',
    tags: ['Office', 'Ergonomic', 'WFH'],
    color: 'bg-slate-500',
  },
];

// Datos para gráficos
export const viralityTrendData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Productos Virales',
      data: [45, 52, 61, 58, 68, 75, 85],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Ventas Totales (Miles)',
      data: [280, 310, 350, 340, 390, 420, 480],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

export const categoryDistributionData = {
  labels: ['Electrónicos', 'Fitness', 'Audio', 'Cocina', 'Gaming', 'Otros'],
  datasets: [
    {
      label: 'Productos',
      data: [28, 22, 18, 15, 12, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(156, 163, 175, 0.8)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(34, 197, 94)',
        'rgb(168, 85, 247)',
        'rgb(34, 197, 94)',
        'rgb(99, 102, 241)',
        'rgb(156, 163, 175)',
      ],
      borderWidth: 2,
    },
  ],
};

export const platformSalesData = {
  labels: ['Amazon', 'AliExpress', 'MercadoLibre', 'Shopify'],
  datasets: [
    {
      label: 'Ventas',
      data: [167000, 125000, 63000, 21000],
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderColor: 'rgb(34, 197, 94)',
      borderWidth: 2,
    },
  ],
};

export const priceRangeData = {
  labels: ['$0-$25', '$25-$50', '$50-$100', '$100-$150', '$150+'],
  datasets: [
    {
      label: 'Productos',
      data: [2, 4, 3, 2, 1],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(74, 222, 128, 0.8)',
        'rgba(132, 204, 22, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(74, 222, 128)',
        'rgb(132, 204, 22)',
        'rgb(251, 191, 36)',
        'rgb(239, 68, 68)',
      ],
      borderWidth: 2,
    },
  ],
};

export const stats = [
  {
    label: 'Productos Virales',
    value: '1,847',
    change: '+156',
    isPositive: true,
    icon: 'ShoppingBag',
  },
  {
    label: 'Ventas Totales',
    value: '427K',
    change: '+24%',
    isPositive: true,
    icon: 'TrendingUp',
  },
  {
    label: 'Rating Promedio',
    value: '4.6',
    change: '+0.3',
    isPositive: true,
    icon: 'Star',
  },
  {
    label: 'Plataformas',
    value: '28',
    change: '+4',
    isPositive: true,
    icon: 'Globe',
  },
];
