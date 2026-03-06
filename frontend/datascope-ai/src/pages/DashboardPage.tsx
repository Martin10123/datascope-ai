import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Brain, TrendingUp, Building2, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const modules = [
    {
      icon: TrendingUp,
      title: 'Tendencias Tecnológicas',
      description: 'Análisis de GitHub, Stack Overflow y Reddit',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Building2,
      title: 'Reputación Empresarial',
      description: 'Análisis de sentimiento de Glassdoor y Trustpilot',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      icon: ShoppingBag,
      title: 'Productos Virales',
      description: 'Tendencias de Amazon, AliExpress y TikTok',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-30 rounded-full" />
                <Brain className="h-10 w-10 relative text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  DataScope AI
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dashboard de Análisis
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
              <Button
                variant="outline"
                icon={LogOut}
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Welcome Section */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">
              ¡Bienvenido, {user?.name?.split(' ')[0]}! 👋
            </h2>
            <p className="text-blue-100">
              Explora los módulos de análisis y descubre tendencias en tiempo real
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`${module.bgColor} rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer group`}
              >
                <div className={`inline-flex p-3 rounded-lg bg-linear-to-r ${module.color} shadow-lg mb-4`}>
                  <module.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {module.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {module.description}
                </p>
                <div className="mt-4">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                    Explorar módulo →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard
              label="Total de Análisis"
              value="1,234"
              change="+12%"
              isPositive
            />
            <StatCard
              label="Tendencias Detectadas"
              value="89"
              change="+23%"
              isPositive
            />
            <StatCard
              label="Fuentes Activas"
              value="12"
              change="+5%"
              isPositive
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, isPositive }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
    <div className="flex items-baseline justify-between">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
      <span className={`text-sm font-medium ${
        isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      }`}>
        {change}
      </span>
    </div>
  </div>
);
