import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Info } from 'lucide-react';

export const MockUserInfo: React.FC = () => {
  const mockUsers = [
    {
      email: 'admin@datascope.ai',
      password: 'admin123',
      role: '👑 Admin',
      color: 'text-blue-600',
    },
    {
      email: 'juan@datascope.ai',
      password: 'analyst123',
      role: '📊 Analista',
      color: 'text-indigo-600',
    },
    {
      email: 'maria@datascope.ai',
      password: 'user123',
      role: '👤 Usuario',
      color: 'text-purple-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            🚀 Modo Desarrollo - Usuarios de Prueba
          </h3>
          <div className="space-y-2 text-sm">
            {mockUsers.map((user, index) => (
              <div
                key={index}
                className="bg-white/50 dark:bg-gray-800/50 rounded-md p-2 space-y-1"
              >
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-gray-500" />
                  <span className={`font-medium ${user.color}`}>{user.role}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="h-3.5 w-3.5" />
                  <code className="text-xs">{user.email}</code>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Lock className="h-3.5 w-3.5" />
                  <code className="text-xs">{user.password}</code>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-blue-700 dark:text-blue-300">
            💡 También puedes registrar un nuevo usuario para probar
          </p>
        </div>
      </div>
    </motion.div>
  );
};
