// Mock Data for Data Management Module

export interface DataSource {
  id: number;
  name: string;
  type: 'Web Scraping' | 'API' | 'Database';
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  url: string;
  lastRun: string;
  nextRun: string;
  recordsCollected: number;
  successRate: number;
  avgResponseTime: number; // ms
  errorCount: number;
  module: 'Tech Trends' | 'Business Reputation' | 'Viral Products';
}

export interface ScrapingLog {
  id: number;
  source: string;
  timestamp: string;
  status: 'success' | 'failed' | 'partial';
  recordsCollected: number;
  duration: number; // seconds
  errorMessage?: string;
  module: string;
}

export interface DataQualityMetric {
  metric: string;
  value: number;
  target: number;
  status: 'good' | 'warning' | 'critical';
  description: string;
}

export interface DatabaseStats {
  label: string;
  value: string;
  change: string;
  icon: string;
}

// Data Sources
export const dataSources: DataSource[] = [
  {
    id: 1,
    name: 'GitHub API',
    type: 'API',
    status: 'active',
    url: 'https://api.github.com',
    lastRun: '2026-03-06 14:30:00',
    nextRun: '2026-03-06 18:30:00',
    recordsCollected: 15420,
    successRate: 98.5,
    avgResponseTime: 245,
    errorCount: 3,
    module: 'Tech Trends',
  },
  {
    id: 2,
    name: 'Stack Overflow',
    type: 'Web Scraping',
    status: 'active',
    url: 'https://stackoverflow.com',
    lastRun: '2026-03-06 14:15:00',
    nextRun: '2026-03-06 18:15:00',
    recordsCollected: 8934,
    successRate: 95.2,
    avgResponseTime: 1850,
    errorCount: 12,
    module: 'Tech Trends',
  },
  {
    id: 3,
    name: 'Reddit API',
    type: 'API',
    status: 'active',
    url: 'https://api.reddit.com',
    lastRun: '2026-03-06 14:00:00',
    nextRun: '2026-03-06 17:00:00',
    recordsCollected: 12567,
    successRate: 99.1,
    avgResponseTime: 312,
    errorCount: 1,
    module: 'Tech Trends',
  },
  {
    id: 4,
    name: 'Glassdoor',
    type: 'Web Scraping',
    status: 'maintenance',
    url: 'https://www.glassdoor.com',
    lastRun: '2026-03-06 10:00:00',
    nextRun: '2026-03-06 22:00:00',
    recordsCollected: 4521,
    successRate: 87.3,
    avgResponseTime: 3200,
    errorCount: 45,
    module: 'Business Reputation',
  },
  {
    id: 5,
    name: 'Trustpilot',
    type: 'Web Scraping',
    status: 'active',
    url: 'https://www.trustpilot.com',
    lastRun: '2026-03-06 14:45:00',
    nextRun: '2026-03-06 18:45:00',
    recordsCollected: 6789,
    successRate: 96.8,
    avgResponseTime: 1950,
    errorCount: 8,
    module: 'Business Reputation',
  },
  {
    id: 6,
    name: 'Amazon Products',
    type: 'Web Scraping',
    status: 'active',
    url: 'https://www.amazon.com',
    lastRun: '2026-03-06 13:30:00',
    nextRun: '2026-03-06 19:30:00',
    recordsCollected: 23456,
    successRate: 92.4,
    avgResponseTime: 2100,
    errorCount: 67,
    module: 'Viral Products',
  },
  {
    id: 7,
    name: 'AliExpress API',
    type: 'API',
    status: 'error',
    url: 'https://api.aliexpress.com',
    lastRun: '2026-03-06 12:00:00',
    nextRun: '2026-03-06 16:00:00',
    recordsCollected: 0,
    successRate: 0,
    avgResponseTime: 0,
    errorCount: 156,
    module: 'Viral Products',
  },
  {
    id: 8,
    name: 'TikTok Trends',
    type: 'API',
    status: 'active',
    url: 'https://api.tiktok.com',
    lastRun: '2026-03-06 14:35:00',
    nextRun: '2026-03-06 16:35:00',
    recordsCollected: 18924,
    successRate: 97.6,
    avgResponseTime: 428,
    errorCount: 5,
    module: 'Viral Products',
  },
];

// Scraping Logs
export const scrapingLogs: ScrapingLog[] = [
  {
    id: 1,
    source: 'GitHub API',
    timestamp: '2026-03-06 14:30:15',
    status: 'success',
    recordsCollected: 1834,
    duration: 124,
    module: 'Tech Trends',
  },
  {
    id: 2,
    source: 'TikTok Trends',
    timestamp: '2026-03-06 14:35:42',
    status: 'success',
    recordsCollected: 2156,
    duration: 89,
    module: 'Viral Products',
  },
  {
    id: 3,
    source: 'Trustpilot',
    timestamp: '2026-03-06 14:45:18',
    status: 'success',
    recordsCollected: 945,
    duration: 178,
    module: 'Business Reputation',
  },
  {
    id: 4,
    source: 'Stack Overflow',
    timestamp: '2026-03-06 14:15:33',
    status: 'partial',
    recordsCollected: 674,
    duration: 256,
    errorMessage: '3 pages failed to load',
    module: 'Tech Trends',
  },
  {
    id: 5,
    source: 'Amazon Products',
    timestamp: '2026-03-06 13:30:06',
    status: 'success',
    recordsCollected: 3421,
    duration: 342,
    module: 'Viral Products',
  },
  {
    id: 6,
    source: 'Reddit API',
    timestamp: '2026-03-06 14:00:54',
    status: 'success',
    recordsCollected: 1567,
    duration: 67,
    module: 'Tech Trends',
  },
  {
    id: 7,
    source: 'AliExpress API',
    timestamp: '2026-03-06 12:00:00',
    status: 'failed',
    recordsCollected: 0,
    duration: 15,
    errorMessage: 'Authentication failed - API key expired',
    module: 'Viral Products',
  },
  {
    id: 8,
    source: 'Glassdoor',
    timestamp: '2026-03-06 10:00:22',
    status: 'partial',
    recordsCollected: 234,
    duration: 445,
    errorMessage: 'Rate limit exceeded',
    module: 'Business Reputation',
  },
];

// Data Quality Metrics
export const dataQualityMetrics: DataQualityMetric[] = [
  {
    metric: 'Completitud',
    value: 94.2,
    target: 95,
    status: 'warning',
    description: 'Porcentaje de campos obligatorios completados',
  },
  {
    metric: 'Precisión',
    value: 98.7,
    target: 98,
    status: 'good',
    description: 'Datos sin errores de formato o validación',
  },
  {
    metric: 'Duplicados',
    value: 1.3,
    target: 2,
    status: 'good',
    description: 'Porcentaje de registros duplicados',
  },
  {
    metric: 'Actualización',
    value: 89.4,
    target: 90,
    status: 'warning',
    description: 'Datos actualizados en las últimas 24h',
  },
  {
    metric: 'Consistencia',
    value: 96.8,
    target: 95,
    status: 'good',
    description: 'Coherencia entre campos relacionados',
  },
  {
    metric: 'Validez',
    value: 82.1,
    target: 85,
    status: 'critical',
    description: 'Registros que cumplen reglas de negocio',
  },
];

// Database Statistics
export const databaseStats: DatabaseStats[] = [
  {
    label: 'Registros Totales',
    value: '892.4K',
    change: '+12.3%',
    icon: 'Database',
  },
  {
    label: 'Fuentes Activas',
    value: '6/8',
    change: '+1',
    icon: 'Server',
  },
  {
    label: 'Tasa de Éxito',
    value: '95.8%',
    change: '+2.1%',
    icon: 'CheckCircle',
  },
  {
    label: 'Espacio Usado',
    value: '14.2 GB',
    change: '+1.8 GB',
    icon: 'HardDrive',
  },
];

// Recent Data Sample (for table view)
export interface DataRecord {
  id: number;
  source: string;
  type: string;
  title: string;
  timestamp: string;
  module: string;
  status: 'processed' | 'pending' | 'error';
}

export const recentDataRecords: DataRecord[] = [
  {
    id: 10234,
    source: 'GitHub',
    type: 'Repository',
    title: 'facebook/react - Latest stars update',
    timestamp: '2026-03-06 14:30:15',
    module: 'Tech Trends',
    status: 'processed',
  },
  {
    id: 10235,
    source: 'TikTok',
    type: 'Product Trend',
    title: 'Viral smartwatch hits 2M views',
    timestamp: '2026-03-06 14:35:42',
    module: 'Viral Products',
    status: 'processed',
  },
  {
    id: 10236,
    source: 'Trustpilot',
    type: 'Review',
    title: 'TechCorp - 5 star review',
    timestamp: '2026-03-06 14:45:18',
    module: 'Business Reputation',
    status: 'processed',
  },
  {
    id: 10237,
    source: 'Stack Overflow',
    type: 'Question',
    title: 'How to use React 19 hooks?',
    timestamp: '2026-03-06 14:15:33',
    module: 'Tech Trends',
    status: 'pending',
  },
  {
    id: 10238,
    source: 'Amazon',
    type: 'Product',
    title: 'Wireless Earbuds Pro - Price update',
    timestamp: '2026-03-06 13:30:06',
    module: 'Viral Products',
    status: 'processed',
  },
  {
    id: 10239,
    source: 'Reddit',
    type: 'Post',
    title: 'Discussion: Next.js 15 features',
    timestamp: '2026-03-06 14:00:54',
    module: 'Tech Trends',
    status: 'processed',
  },
  {
    id: 10240,
    source: 'AliExpress',
    type: 'Product',
    title: 'Smart water bottle trending',
    timestamp: '2026-03-06 12:00:00',
    module: 'Viral Products',
    status: 'error',
  },
  {
    id: 10241,
    source: 'Glassdoor',
    type: 'Review',
    title: 'GreenEco - Employee review',
    timestamp: '2026-03-06 10:00:22',
    module: 'Business Reputation',
    status: 'processed',
  },
];

// Export formats
export const exportFormats = [
  { id: 'csv', name: 'CSV', icon: '📊', description: 'Comma-separated values' },
  { id: 'json', name: 'JSON', icon: '📋', description: 'JavaScript Object Notation' },
  { id: 'excel', name: 'Excel', icon: '📗', description: 'Microsoft Excel format' },
  { id: 'sql', name: 'SQL', icon: '🗄️', description: 'SQL dump file' },
];
