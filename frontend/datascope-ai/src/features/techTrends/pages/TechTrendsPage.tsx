import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown,
  Code,
  Globe,
  BarChart3,
  Github, 
  MessageSquare,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ExternalLink,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { MainLayout } from '../../../components/layout';
import { ChartCard, LineChart, BarChart, DoughnutChart } from '../../../components/charts';
import { 
  technologies, 
  trendLineData, 
  categoryDistributionData,
  sourcesComparisonData,
  weeklyActivityData,
  stats,
  type Technology,
} from '../../../services/techTrendsMockData';

export const TechTrendsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'growth' | 'name'>('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  const categories = ['all', 'Frontend Framework', 'Backend', 'Full-stack Framework', 'CSS Framework', 'JavaScript Runtime', 'ORM', 'Programming Language'];

  // Filtered and sorted technologies
  const filteredTechnologies = useMemo(() => {
    return technologies
      .filter(tech => {
        const matchesCategory = selectedCategory === 'all' || tech.category === selectedCategory;
        const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             tech.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'popularity') return b.popularity - a.popularity;
        if (sortBy === 'growth') return b.growthRate - a.growthRate;
        return a.name.localeCompare(b.name);
      });
  }, [selectedCategory, searchTerm, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTechnologies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTechnologies = filteredTechnologies.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  const topTrending = technologies
    .filter(t => t.trend === 'up')
    .sort((a, b) => b.growthRate - a.growthRate)
    .slice(0, 5);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Tendencias Tecnológicas
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Análisis en tiempo real de GitHub, Stack Overflow y Reddit
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon === 'Code' ? Code : 
                        stat.icon === 'TrendingUp' ? TrendingUp :
                        stat.icon === 'Globe' ? Globe : BarChart3;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </h3>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium ml-1">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ChartCard title="Tendencias de Popularidad">
              <LineChart data={trendLineData} />
            </ChartCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChartCard title="Distribución por Categoría">
              <DoughnutChart data={categoryDistributionData} />
            </ChartCard>
          </motion.div>
        </div>

        {/* Second Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ChartCard title="Fuentes de Información">
              <BarChart data={sourcesComparisonData} />
            </ChartCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ChartCard title="Actividad Semanal">
              <BarChart data={weeklyActivityData} />
            </ChartCard>
          </motion.div>
        </div>

        {/* Top Trending Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Star className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Top 5 Tendencias al Alza
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topTrending.map((tech, index) => (
              <div 
                key={tech.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-300 dark:text-gray-600">
                    #{index + 1}
                  </span>
                  <div className="flex items-center space-x-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-bold">+{tech.growthRate}%</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {tech.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {tech.category}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tecnología..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popularity' | 'growth' | 'name')}
                className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popularity">Más Popular</option>
                <option value="growth">Mayor Crecimiento</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'Todas' : category}
              </button>
            ))}
          </div>

          {/* Results counter */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredTechnologies.length)} de {filteredTechnologies.length} tecnologías
          </div>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTechnologies.map((tech, index) => (
            <TechCard key={tech.id} tech={tech} index={index} />
          ))}
        </div>

        {/* No results */}
        {filteredTechnologies.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No se encontraron tecnologías
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intenta con otros filtros o términos de búsqueda
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredTechnologies.length > 0 && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center space-x-2"
          >
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-colors ${
                currentPage === 1
                  ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage = 
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1);
                
                const showEllipsis = 
                  (page === currentPage - 2 && currentPage > 3) ||
                  (page === currentPage + 2 && currentPage < totalPages - 2);

                if (showEllipsis) {
                  return (
                    <span key={page} className="px-2 text-gray-500 dark:text-gray-400">
                      ...
                    </span>
                  );
                }

                if (!showPage) return null;

                return (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

// Tech Card Component
interface TechCardProps {
  tech: Technology;
  index: number;
}

const TechCard: React.FC<TechCardProps> = ({ tech, index }) => {
  const getTrendIcon = () => {
    if (tech.trend === 'up') return <TrendingUp className="h-5 w-5 text-green-500" />;
    if (tech.trend === 'down') return <TrendingDown className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (tech.trend === 'up') return 'text-green-500';
    if (tech.trend === 'down') return 'text-red-500';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.05 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${tech.color} rounded-lg flex items-center justify-center`}>
            <Code className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tech.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {tech.category}
            </p>
          </div>
        </div>
        {getTrendIcon()}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {tech.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Popularidad</p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${tech.popularity}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              {tech.popularity}%
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Crecimiento</p>
          <div className="flex items-center space-x-1">
            {tech.trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : tech.trend === 'down' ? (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            ) : (
              <Minus className="h-4 w-4 text-gray-400" />
            )}
            <span className={`text-sm font-bold ${getTrendColor()}`}>
              {tech.growthRate > 0 ? '+' : ''}{tech.growthRate}%
            </span>
          </div>
        </div>
      </div>

      {/* Sources */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Menciones por fuente</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <Github className="h-4 w-4 mx-auto text-gray-700 dark:text-gray-300 mb-1" />
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {tech.sources.github.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <MessageSquare className="h-4 w-4 mx-auto text-orange-500 mb-1" />
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {tech.sources.stackoverflow.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <MessageSquare className="h-4 w-4 mx-auto text-orange-600 mb-1" />
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {tech.sources.reddit.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tech.keywords.slice(0, 3).map((keyword, idx) => (
          <span 
            key={idx}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
          >
            {keyword}
          </span>
        ))}
      </div>

      {/* View More */}
      <button className="mt-4 w-full flex items-center justify-center space-x-2 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors group">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Ver detalles
        </span>
        <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
      </button>
    </motion.div>
  );
};
