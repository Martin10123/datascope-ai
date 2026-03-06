// Mock data para los gráficos del dashboard

export const trendingTechnologiesData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'React',
      data: [65, 72, 78, 85, 92, 98, 105],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
    },
    {
      label: 'Vue.js',
      data: [45, 48, 52, 55, 58, 62, 66],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
    },
    {
      label: 'Angular',
      data: [35, 38, 40, 42, 44, 46, 48],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
    },
  ],
};

export const sentimentAnalysisData = {
  labels: ['Muy Positivo', 'Positivo', 'Neutral', 'Negativo', 'Muy Negativo'],
  datasets: [
    {
      data: [320, 450, 280, 150, 80],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(59, 130, 246)',
        'rgb(234, 179, 8)',
        'rgb(249, 115, 22)',
        'rgb(239, 68, 68)',
      ],
      borderWidth: 2,
    },
  ],
};

export const topProductsData = {
  labels: ['Electrónicos', 'Moda', 'Hogar', 'Deportes', 'Belleza', 'Juguetes'],
  datasets: [
    {
      label: 'Ventas (miles)',
      data: [850, 720, 650, 580, 520, 450],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(59, 130, 246, 0.8)',
      ],
      borderColor: [
        'rgb(99, 102, 241)',
        'rgb(168, 85, 247)',
        'rgb(236, 72, 153)',
        'rgb(251, 146, 60)',
        'rgb(245, 158, 11)',
        'rgb(59, 130, 246)',
      ],
      borderWidth: 2,
    },
  ],
};

export const websiteTrafficData = {
  labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  datasets: [
    {
      label: 'Visitantes',
      data: [1200, 1900, 1500, 2100, 2400, 1800, 1600],
      borderColor: 'rgb(139, 92, 246)',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
    },
  ],
};

export const revenueData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Ingresos 2026',
      data: [12000, 19000, 15000, 22000, 25000, 28000],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2,
    },
    {
      label: 'Ingresos 2025',
      data: [10000, 15000, 13000, 18000, 20000, 23000],
      backgroundColor: 'rgba(156, 163, 175, 0.5)',
      borderColor: 'rgb(156, 163, 175)',
      borderWidth: 2,
    },
  ],
};

export const platformDistributionData = {
  labels: ['GitHub', 'Stack Overflow', 'Reddit', 'Twitter', 'LinkedIn'],
  datasets: [
    {
      data: [35, 25, 20, 12, 8],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(14, 165, 233, 0.8)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(249, 115, 22)',
        'rgb(239, 68, 68)',
        'rgb(59, 130, 246)',
        'rgb(14, 165, 233)',
      ],
      borderWidth: 2,
    },
  ],
};
