import React from 'react';
import { MainLayout } from '../components/layout';
import { Bell } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <Bell className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Notificaciones
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Alertas y actualizaciones del sistema
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8 text-center">
          <p className="text-yellow-900 dark:text-yellow-100 font-medium">
            🚧 Módulo en desarrollo - Próximamente disponible
          </p>
        </div>
      </div>
    </MainLayout>
  );
};
