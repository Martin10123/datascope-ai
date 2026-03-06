import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Server,
  CheckCircle,
  HardDrive,
  Activity,
  AlertCircle,
  Clock,
  Download,
  Play,
  Pause,
  RefreshCw,
  ArrowUpRight,
  Circle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Globe,
  TrendingUp,
  Building2,
  ShoppingBag,
} from 'lucide-react';
import { MainLayout } from '../components/layout';
import {
  dataSources,
  scrapingLogs,
  dataQualityMetrics,
  databaseStats,
  recentDataRecords,
  exportFormats,
  type DataSource,
  type ScrapingLog,
  type DataRecord,
} from '../services/dataManagementMockData';

export const DataPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'sources' | 'logs' | 'quality' | 'records'>('sources');
  const [selectedModule, setSelectedModule] = useState<'all' | 'Tech Trends' | 'Business Reputation' | 'Viral Products'>('all');

  const filteredSources = selectedModule === 'all' 
    ? dataSources 
    : dataSources.filter(s => s.module === selectedModule);

  const filteredLogs = selectedModule === 'all'
    ? scrapingLogs
    : scrapingLogs.filter(l => l.module === selectedModule);

  const filteredRecords = selectedModule === 'all'
    ? recentDataRecords
    : recentDataRecords.filter(r => r.module === selectedModule);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
              <Database className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Gestión de Datos
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Monitoreo de fuentes, logs de scraping y calidad de datos
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {databaseStats.map((stat, index) => {
            const Icon = stat.icon === 'Database' ? Database :
                        stat.icon === 'Server' ? Server :
                        stat.icon === 'CheckCircle' ? CheckCircle : HardDrive;

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
                  <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                    <Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Module Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedModule('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                selectedModule === 'all'
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span>Todos los Módulos</span>
            </button>
            <button
              onClick={() => setSelectedModule('Tech Trends')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                selectedModule === 'Tech Trends'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Tech Trends</span>
            </button>
            <button
              onClick={() => setSelectedModule('Business Reputation')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                selectedModule === 'Business Reputation'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Reputación</span>
            </button>
            <button
              onClick={() => setSelectedModule('Viral Products')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                selectedModule === 'Viral Products'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Productos</span>
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setSelectedTab('sources')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  selectedTab === 'sources'
                    ? 'border-cyan-600 text-cyan-600 dark:text-cyan-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Server className="h-4 w-4" />
                  <span>Fuentes de Datos</span>
                </div>
              </button>
              <button
                onClick={() => setSelectedTab('logs')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  selectedTab === 'logs'
                    ? 'border-cyan-600 text-cyan-600 dark:text-cyan-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Logs de Scraping</span>
                </div>
              </button>
              <button
                onClick={() => setSelectedTab('quality')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  selectedTab === 'quality'
                    ? 'border-cyan-600 text-cyan-600 dark:text-cyan-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Calidad de Datos</span>
                </div>
              </button>
              <button
                onClick={() => setSelectedTab('records')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  selectedTab === 'records'
                    ? 'border-cyan-600 text-cyan-600 dark:text-cyan-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>Datos Recientes</span>
                </div>
              </button>
            </div>
          </div>

          <div className="p-6">
            {selectedTab === 'sources' && <SourcesTab sources={filteredSources} />}
            {selectedTab === 'logs' && <LogsTab logs={filteredLogs} />}
            {selectedTab === 'quality' && <QualityTab />}
            {selectedTab === 'records' && <RecordsTab records={filteredRecords} />}
          </div>
        </motion.div>

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-linear-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Download className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Exportar Datos
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {exportFormats.map((format) => (
              <button
                key={format.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors group"
              >
                <div className="text-3xl mb-2">{format.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {format.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {format.description}
                </p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

// Sources Tab Component
const SourcesTab: React.FC<{ sources: DataSource[] }> = ({ sources }) => {
  const getStatusColor = (status: DataSource['status']) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'inactive': return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
      case 'error': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'maintenance': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    }
  };

  const getStatusIcon = (status: DataSource['status']) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="h-5 w-5" />;
      case 'inactive': return <Circle className="h-5 w-5" />;
      case 'error': return <XCircle className="h-5 w-5" />;
      case 'maintenance': return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {sources.map((source, index) => (
        <motion.div
          key={source.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(source.status)}`}>
                  {getStatusIcon(source.status)}
                  <span className="text-xs font-bold capitalize">{source.status}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">{source.name}</h3>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-full text-gray-700 dark:text-gray-300">
                  {source.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {source.url}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Última: {source.lastRun}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <RefreshCw className="h-3 w-3" />
                  <span>Próxima: {source.nextRun}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Registros</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {source.recordsCollected.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Éxito</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {source.successRate}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Respuesta</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {source.avgResponseTime}ms
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Errores</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                  {source.errorCount}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-cyan-100 dark:bg-cyan-900/20 hover:bg-cyan-200 dark:hover:bg-cyan-900/40 rounded-lg transition-colors">
                <Play className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              </button>
              <button className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Pause className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Logs Tab Component
const LogsTab: React.FC<{ logs: ScrapingLog[] }> = ({ logs }) => {
  const getStatusColor = (status: ScrapingLog['status']) => {
    switch (status) {
      case 'success': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'failed': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'partial': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    }
  };

  const getStatusIcon = (status: ScrapingLog['status']) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'partial': return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Estado</th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Fuente</th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Timestamp</th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Registros</th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Duración</th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <motion.tr
              key={log.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
            >
              <td className="py-3 px-4">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full w-fit ${getStatusColor(log.status)}`}>
                  {getStatusIcon(log.status)}
                  <span className="text-xs font-bold capitalize">{log.status}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-900 dark:text-white font-medium">
                {log.source}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                {log.timestamp}
              </td>
              <td className="py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">
                {log.recordsCollected.toLocaleString()}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                {log.duration}s
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                {log.errorMessage || '-'}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Quality Tab Component
const QualityTab: React.FC = () => {
  return (
    <div className="space-y-4">
      {dataQualityMetrics.map((metric, index) => {
        const getStatusColor = () => {
          switch (metric.status) {
            case 'good': return 'bg-green-500';
            case 'warning': return 'bg-yellow-500';
            case 'critical': return 'bg-red-500';
          }
        };

        const getStatusBg = () => {
          switch (metric.status) {
            case 'good': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
            case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
            case 'critical': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
          }
        };

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg p-4 border ${getStatusBg()}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{metric.metric}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{metric.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Target: {metric.target}%
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${getStatusColor()}`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Records Tab Component
const RecordsTab: React.FC<{ records: DataRecord[] }> = ({ records }) => {
  const getStatusColor = (status: DataRecord['status']) => {
    switch (status) {
      case 'processed': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'pending': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'error': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">ID</th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Fuente</th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Tipo</th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Título</th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Timestamp</th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Estado</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <motion.tr
              key={record.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
            >
              <td className="py-3 px-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                #{record.id}
              </td>
              <td className="py-3 px-4 text-sm text-gray-900 dark:text-white font-medium">
                {record.source}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                {record.type}
              </td>
              <td className="py-3 px-4 text-sm text-gray-900 dark:text-white max-w-md truncate">
                {record.title}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                {record.timestamp}
              </td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
