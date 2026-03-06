import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Globe, Database, LineChart, Binary, Network } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const floatingIcons = [
    { Icon: Brain, delay: 0, x: 20, y: -20 },
    { Icon: Globe, delay: 0.5, x: -30, y: 30 },
    { Icon: Database, delay: 1, x: 40, y: 20 },
    { Icon: LineChart, delay: 1.5, x: -20, y: -30 },
    { Icon: Binary, delay: 2, x: 30, y: 40 },
    { Icon: Network, delay: 2.5, x: -40, y: -10 },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-400/10 hidden lg:block"
          animate={{
            y: [y, y + 20, y],
            x: [x, x + 10, x],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: delay,
          }}
          style={{
            left: `${15 + (index % 3) * 35}%`,
            top: `${20 + (index % 2) * 50}%`,
          }}
        >
          <Icon size={100} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Main content container */}
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col space-y-8 text-white"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center space-x-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 rounded-full" />
                <Brain className="h-16 w-16 relative text-blue-400" strokeWidth={1.5} />
              </div>
              <h1 className="text-5xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                DataScope AI
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-blue-200/80 font-light"
            >
              Plataforma Inteligente de Análisis de Tendencias
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <Feature
              icon={Globe}
              title="Web Scraping Avanzado"
              description="Recopilación automática de datos desde múltiples fuentes"
            />
            <Feature
              icon={Brain}
              title="Inteligencia Artificial"
              description="Análisis de sentimiento y detección de tendencias con IA"
            />
            <Feature
              icon={LineChart}
              title="Visualización Interactiva"
              description="Dashboards dinámicos y reportes en tiempo real"
            />
          </motion.div>
        </motion.div>

        {/* Right side - Auth form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-200/20 dark:border-gray-700/20">
            {/* Mobile logo */}
            <div className="lg:hidden mb-8 text-center">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Brain className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  DataScope AI
                </h1>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Plataforma Inteligente de Análisis de Tendencias
              </p>
            </div>

            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="flex items-start space-x-4 group cursor-default"
  >
    <div className="shrink-0 mt-1">
      <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-lg text-white">{title}</h3>
      <p className="text-blue-200/70 text-sm">{description}</p>
    </div>
  </motion.div>
);
