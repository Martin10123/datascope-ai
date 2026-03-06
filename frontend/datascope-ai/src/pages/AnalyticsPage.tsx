import React from 'react';
import { MainLayout } from '../components/layout';
import { BarChart3 } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
            <BarChart3 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Análisis Avanzado
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Métricas y estadísticas detalladas
            </p>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-8 text-center">
          <p className="text-orange-900 dark:text-orange-100 font-medium">
            🚧 Módulo en desarrollo - Próximamente disponible
          </p>
        </div>
      </div>
    </MainLayout>
  );
};
