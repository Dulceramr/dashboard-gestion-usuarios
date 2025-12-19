import { useUsuarios } from './useUsuarios';

export const useUsuariosMetrics = () => {
  const { usuarios } = useUsuarios();
  const totalUsuarios = usuarios.length;
  const hombres = usuarios.filter(u => u.gender === 'male').length;
  const mujeres = usuarios.filter(u => u.gender === 'female').length;
  
  return {
    totalUsuarios,
    hombres,
    mujeres
  };
};