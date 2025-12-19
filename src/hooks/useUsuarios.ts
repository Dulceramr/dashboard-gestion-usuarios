// src/hooks/useUsuarios.ts
import { useUsuariosContext } from '../context/UsuariosContext';
import { useUsuariosMetrics } from './useUsuariosMetrics';

// Reexportamos el tipo Usuario también
export type { Usuario } from '../context/UsuariosContext';

// Hook principal para datos
export const useUsuarios = () => {
  return useUsuariosContext();
};

// Hook para métricas (exportamos también)
export { useUsuariosMetrics };