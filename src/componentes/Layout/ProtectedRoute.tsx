import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const estaAutenticado = sessionStorage.getItem('estaAutenticado') === 'true';

    
  console.log('🔐 ProtectedRoute - ¿Autenticado?:', estaAutenticado);
  console.log('🔐 sessionStorage keys:', Object.keys(sessionStorage));
  
  if (!estaAutenticado) {
    console.log('🔐 Redirigiendo a /login');
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;