import type { User } from '../types/auth.types';

// Usuarios ficticios para desarrollo
export const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    name: 'Admin DataScope',
    email: 'admin@datascope.ai',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+DataScope&background=3b82f6&color=fff',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Juan Analista',
    email: 'juan@datascope.ai',
    password: 'analyst123',
    role: 'analyst',
    avatar: 'https://ui-avatars.com/api/?name=Juan+Analista&background=6366f1&color=fff',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'María Usuario',
    email: 'maria@datascope.ai',
    password: 'user123',
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Usuario&background=8b5cf6&color=fff',
    createdAt: new Date().toISOString(),
  },
];

// Delay para simular llamada a API
export const simulateApiDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));
