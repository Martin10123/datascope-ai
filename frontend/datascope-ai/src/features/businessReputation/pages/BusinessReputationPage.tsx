import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Star,
  MessageSquare,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Award,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  MinusCircle,
} from 'lucide-react';
import { MainLayout } from '../../../components/layout';
import { ChartCard, LineChart, BarChart, DoughnutChart } from '../../../components/charts';
import {
  companies,
  sentimentTrendData,
  industryDistributionData,
  reviewSourcesData,
  ratingDistributionData,
  stats,
  type Company,
} from '../../../services/businessReputationMockData';

export const BusinessReputationPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const industries = ['all', 'Tecnología', 'Retail', 'Salud', 'Finanzas', 'Educación', 'Restaurantes', 'Fitness', 'Turismo', 'Veterinaria'];

  // Filtered and sorted companies
  const filteredCompanies = useMemo(() => {
    return companies
      .filter(company => {
        const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             company.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesIndustry && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.overallRating - a.overallRating;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        return a.name.localeCompare(b.name);
      });
  }, [selectedIndustry, searchTerm, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedIndustry, searchTerm, sortBy]);

  const topRated = companies
    .sort((a, b) => b.overallRating - a.overallRating)
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
            <div className="p-3 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Reputación Empresarial
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Análisis de sentimiento y reseñas empresariales
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon === 'Building2' ? Building2 :
                        stat.icon === 'MessageSquare' ? MessageSquare :
                        stat.icon === 'Star' ? Star : TrendingUp;

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
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
            <ChartCard title="Tendencia de Sentimientos">
              <LineChart data={sentimentTrendData} />
            </ChartCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChartCard title="Distribución por Industria">
              <DoughnutChart data={industryDistributionData} />
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
            <ChartCard title="Fuentes de Reseñas">
              <BarChart data={reviewSourcesData} />
            </ChartCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ChartCard title="Distribución de Calificaciones">
              <BarChart data={ratingDistributionData} />
            </ChartCard>
          </motion.div>
        </div>

        {/* Top Rated Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Award className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Top 5 Mejor Valoradas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topRated.map((company) => (
              <div
                key={company.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl">{company.logo}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {company.overallRating}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">
                  {company.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {company.reviewCount.toLocaleString()} reseñas
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
                placeholder="Buscar empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'name')}
                className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="rating">Mejor Calificación</option>
                <option value="reviews">Más Reseñas</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </div>

          {/* Industry Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedIndustry === industry
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {industry === 'all' ? 'Todas' : industry}
              </button>
            ))}
          </div>

          {/* Results counter */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredCompanies.length)} de {filteredCompanies.length} empresas
          </div>
        </motion.div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCompanies.map((company, index) => (
            <CompanyCard key={company.id} company={company} index={index} />
          ))}
        </div>

        {/* No results */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No se encontraron empresas
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intenta con otros filtros o términos de búsqueda
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredCompanies.length > 0 && totalPages > 1 && (
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
                        ? 'bg-purple-600 text-white shadow-lg'
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

// Company Card Component
interface CompanyCardProps {
  company: Company;
  index: number;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, index }) => {
  const getTrendIcon = () => {
    if (company.trend === 'up') return <TrendingUp className="h-5 w-5 text-green-500" />;
    if (company.trend === 'down') return <TrendingDown className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (company.trend === 'up') return 'text-green-500';
    if (company.trend === 'down') return 'text-red-500';
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
          <div className="text-5xl">{company.logo}</div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {company.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {company.industry}
            </p>
          </div>
        </div>
        {getTrendIcon()}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {company.description}
      </p>

      {/* Rating */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(company.overallRating)
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>
        <span className="font-bold text-gray-900 dark:text-white">
          {company.overallRating}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({company.reviewCount.toLocaleString()})
        </span>
      </div>

      {/* Sentiment */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Análisis de sentimiento</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <ThumbsUp className="h-4 w-4 mx-auto text-green-600 dark:text-green-400 mb-1" />
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {company.sentiment.positive}%
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <MinusCircle className="h-4 w-4 mx-auto text-gray-600 dark:text-gray-400 mb-1" />
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {company.sentiment.neutral}%
            </p>
          </div>
          <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <ThumbsDown className="h-4 w-4 mx-auto text-red-600 dark:text-red-400 mb-1" />
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {company.sentiment.negative}%
            </p>
          </div>
        </div>
      </div>

      {/* Sources */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Fuentes de reseñas</p>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Google</p>
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {(company.sources.google / 1000).toFixed(1)}K
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Trust</p>
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {(company.sources.trustpilot / 1000).toFixed(1)}K
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Glass</p>
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {(company.sources.glassdoor / 1000).toFixed(1)}K
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Yelp</p>
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {(company.sources.yelp / 1000).toFixed(1)}K
            </p>
          </div>
        </div>
      </div>

      {/* Trend Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          {company.trend === 'up' ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : company.trend === 'down' ? (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          ) : (
            <Minus className="h-4 w-4 text-gray-400" />
          )}
          <span className={`text-sm font-bold ${getTrendColor()}`}>
            {company.trendChange > 0 ? '+' : ''}{company.trendChange}%
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {company.lastUpdated}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {company.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* View More */}
      <button className="w-full flex items-center justify-center space-x-2 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors group">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Ver análisis completo
        </span>
        <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
      </button>
    </motion.div>
  );
};
