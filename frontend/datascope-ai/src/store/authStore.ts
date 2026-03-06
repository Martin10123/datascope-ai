import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, LoginCredentials, RegisterData, User } from '../types/auth.types';
import { MOCK_USERS, simulateApiDelay } from '../services/mockData';

// 🚀 MODO DESARROLLO: Usando autenticación MOCK sin backend
// Para producción, descomentar las importaciones de authService

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simular delay de red
          await simulateApiDelay(800);

          // Buscar usuario en la lista mock
          const user = MOCK_USERS.find(
            u => u.email.toLowerCase() === credentials.email.toLowerCase() &&
                 u.password === credentials.password
          );

          if (!user) {
            throw new Error('Credenciales inválidas. Intenta con admin@datascope.ai / admin123');
          }

          // Crear datos de respuesta mock
          const { password, ...userWithoutPassword } = user;
          const mockToken = `mock-token-${Date.now()}`;

          set({
            user: userWithoutPassword,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : 'Error al iniciar sesión';
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simular delay de red
          await simulateApiDelay(1000);

          // Verificar si el email ya existe
          const emailExists = MOCK_USERS.some(
            u => u.email.toLowerCase() === data.email.toLowerCase()
          );

          if (emailExists) {
            throw new Error('Este correo electrónico ya está registrado');
          }

          // Crear nuevo usuario mock
          const newUser: User = {
            id: `mock-${Date.now()}`,
            name: data.name,
            email: data.email,
            role: 'user',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random&color=fff`,
            createdAt: new Date().toISOString(),
          };

          const mockToken = `mock-token-${Date.now()}`;

          set({
            user: newUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : 'Error al registrarse';
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        localStorage.removeItem('auth-storage');
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
