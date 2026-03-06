import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  Star,
  Globe,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Trophy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  Share2,
  MessageSquare,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import { MainLayout } from '../../../components/layout';
import { ChartCard, LineChart, BarChart, DoughnutChart } from '../../../components/charts';
import {
  products,
  viralityTrendData,
  categoryDistributionData,
  platformSalesData,
  priceRangeData,
  stats,
  type Product,
} from '../../../services/viralProductsMockData';

export const ViralProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'viral' | 'sales' | 'price' | 'name'>('viral');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const categories = ['all', 'Electrónicos', 'Fitness', 'Audio', 'Cocina', 'Gaming', 'Fotografía', 'Cuidado Personal', 'Hogar Inteligente', 'Oficina'];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'viral') return b.viralScore - a.viralScore;
        if (sortBy === 'sales') return b.salesCount - a.salesCount;
        if (sortBy === 'price') return b.price - a.price;
        return a.name.localeCompare(b.name);
      });
  }, [selectedCategory, searchTerm, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  const topViral = products
    .sort((a, b) => b.viralScore - a.viralScore)
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
            <div className="p-3 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Productos Virales
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Detección de productos en tendencia en e-commerce
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon === 'ShoppingBag' ? ShoppingBag :
                        stat.icon === 'TrendingUp' ? TrendingUp :
                        stat.icon === 'Star' ? Star : Globe;

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
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
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
            <ChartCard title="Tendencia de Viralidad">
              <LineChart data={viralityTrendData} />
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
            <ChartCard title="Ventas por Plataforma">
              <BarChart data={platformSalesData} />
            </ChartCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ChartCard title="Rango de Precios">
              <BarChart data={priceRangeData} />
            </ChartCard>
          </motion.div>
        </div>

        {/* Top Viral Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Top 5 Más Virales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topViral.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl">{product.image}</span>
                  <div className="px-2 py-1 bg-green-100 dark:bg-green-900/40 rounded-full">
                    <span className="text-xs font-bold text-green-700 dark:text-green-300">
                      {product.viralScore}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ${product.price}
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
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'viral' | 'sales' | 'price' | 'name')}
                className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="viral">Más Viral</option>
                <option value="sales">Más Vendidos</option>
                <option value="price">Mayor Precio</option>
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
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'Todos' : category}
              </button>
            ))}
          </div>

          {/* Results counter */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length} productos
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intenta con otros filtros o términos de búsqueda
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && totalPages > 1 && (
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
                        ? 'bg-green-600 text-white shadow-lg'
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

// Product Card Component
interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const getTrendIcon = () => {
    if (product.trend === 'up') return <TrendingUp className="h-5 w-5 text-green-500" />;
    if (product.trend === 'down') return <TrendingDown className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (product.trend === 'up') return 'text-green-500';
    if (product.trend === 'down') return 'text-red-500';
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
          <div className="text-5xl">{product.image}</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {product.category}
            </p>
          </div>
        </div>
        {getTrendIcon()}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {product.description}
      </p>

      {/* Price and Rating */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {product.price}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.avgRating)
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
            {product.avgRating}
          </span>
        </div>
      </div>

      {/* Viral Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">Puntuación Viral</p>
          <span className="text-sm font-bold text-green-600 dark:text-green-400">
            {product.viralScore}/100
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all"
            style={{ width: `${product.viralScore}%` }}
          />
        </div>
      </div>

      {/* Engagement */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Eye className="h-4 w-4 mx-auto text-blue-600 dark:text-blue-400 mb-1" />
          <p className="text-xs font-bold text-gray-900 dark:text-white">
            {(product.engagement.views / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Share2 className="h-4 w-4 mx-auto text-green-600 dark:text-green-400 mb-1" />
          <p className="text-xs font-bold text-gray-900 dark:text-white">
            {(product.engagement.shares / 1000).toFixed(1)}K
          </p>
        </div>
        <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <MessageSquare className="h-4 w-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
          <p className="text-xs font-bold text-gray-900 dark:text-white">
            {(product.engagement.reviews / 1000).toFixed(1)}K
          </p>
        </div>
      </div>

      {/* Platforms */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Ventas por plataforma</p>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">AMZ</p>
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {(product.platforms.amazon / 1000).toFixed(1)}K
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ali</p>
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {(product.platforms.aliexpress / 1000).toFixed(1)}K
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">ML</p>
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {(product.platforms.mercadolibre / 1000).toFixed(1)}K
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Shp</p>
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {(product.platforms.shopify / 1000).toFixed(1)}K
            </p>
          </div>
        </div>
      </div>

      {/* Sales and Trend */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.salesCount.toLocaleString()} ventas
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {product.trend === 'up' ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : product.trend === 'down' ? (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          ) : (
            <Minus className="h-4 w-4 text-gray-400" />
          )}
          <span className={`text-sm font-bold ${getTrendColor()}`}>
            {product.trendChange > 0 ? '+' : ''}{product.trendChange}%
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.tags.map((tag, idx) => (
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
          Ver análisis detallado
        </span>
        <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
      </button>
    </motion.div>
  );
};
