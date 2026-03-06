import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Building2, 
  ShoppingBag, 
  Activity, 
  Users, 
  Globe,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { MainLayout } from '../components/layout';
import { ChartCard, LineChart, BarChart, DoughnutChart } from '../components/charts';
import { 
  trendingTechnologiesData,
  sentimentAnalysisData,
  topProductsData,
  websiteTrafficData,
  revenueData,
} from '../services/chartMockData';

export const DashboardPage: React.FC = () => {
  const stats = [
    {
      label: 'Total Análisis',
      value: '12,543',
      change: '+12.5%',
      isPositive: true,
      icon: BarChart3,
      color: 'blue',
    },
    {
      label: 'Tendencias Activas',
      value: '89',
      change: '+23.1%',
      isPositive: true,
      icon: TrendingUp,
      color: 'green',
    },
    {
      label: 'Fuentes Monitoreadas',
      value: '24',
      change: '+8.0%',
      isPositive: true,
      icon: Globe,
      color: 'purple',
    },
    {
      label: 'Usuarios Activos',
      value: '1,429',
      change: '-2.4%',
      isPositive: false,
      icon: Users,
      color: 'orange',
    },
  ];

  const quickModules = [
    {
      icon: TrendingUp,
      title: 'Tendencias Tecnológicas',
      description: 'GitHub, Stack Overflow, Reddit',
      color: 'from-blue-500 to-indigo-500',
      value: '156',
      label: 'Tendencias',
    },
    {
      icon: Building2,
      title: 'Reputación Empresarial',
      description: 'Glassdoor, Trustpilot',
      color: 'from-purple-500 to-pink-500',
      value: '2,341',
      label: 'Reseñas',
    },
    {
      icon: ShoppingBag,
      title: 'Productos Virales',
      description: 'Amazon, AliExpress, TikTok',
      color: 'from-green-500 to-emerald-500',
      value: '89',
      label: 'Productos',
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Bienvenido al panel de análisis de DataScope AI
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart - Tendencias Tecnológicas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ChartCard title="Tendencias Tecnológicas">
              <LineChart data={trendingTechnologiesData} />
            </ChartCard>
          </motion.div>

          {/* Doughnut Chart - Análisis de Sentimiento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChartCard title="Análisis de Sentimiento">
              <DoughnutChart data={sentimentAnalysisData} />
            </ChartCard>
          </motion.div>

          {/* Bar Chart - Productos Más Vendidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ChartCard title="Categorías de Productos">
              <BarChart data={topProductsData} />
            </ChartCard>
          </motion.div>

          {/* Line Chart - Tráfico Web */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ChartCard title="Tráfico Semanal">
              <LineChart data={websiteTrafficData} />
            </ChartCard>
          </motion.div>
        </div>

        {/* Full Width Chart - Revenue Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ChartCard title="Comparación de Análisis Mensuales">
            <BarChart data={revenueData} />
          </ChartCard>
        </motion.div>

        {/* Quick Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className={`inline-flex p-3 rounded-lg bg-linear-to-r ${module.color} shadow-lg mb-4`}>
                <module.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {module.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {module.description}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {module.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {module.label}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-gray-300 dark:text-gray-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
