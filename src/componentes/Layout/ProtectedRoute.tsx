import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const estaAutenticado = sessionStorage.getItem('estaAutenticado') === 'true';
  
  if (!estaAutenticado) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;