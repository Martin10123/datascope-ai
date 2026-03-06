import React from 'react';
import { MainLayout } from '../components/layout';
import { Settings } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Settings className="h-8 w-8 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Configuración
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Ajustes y preferencias de la aplicación
            </p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-900 dark:text-gray-100 font-medium">
            🚧 Módulo en desarrollo - Próximamente disponible
          </p>
        </div>
      </div>
    </MainLayout>
  );
};
