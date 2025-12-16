import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Páginas crarlas dsp
// import LoginPage from './paginas/Login';
// import UsersPage from './paginas/Users';
// import UserDetailPage from './paginas/UserDetail';

function App() {
  return (
    <BrowserRouter>
      {/* Contenedor principal con la paleta de colores */}
      <div className="app-container">
        <Routes>
          {/* Ruta pública de Login */}
          <Route path="/login" element={
            <div className="page login-page">
              <h1>Iniciar Sesión</h1>
              <p>Página de Login (en desarrollo)</p>
              <button className="btn-primary" onClick={() => alert('Redirigiendo al dashboard...')}>
                Login Simulado
              </button>
            </div>
          } />
          
          {/* Ruta principal: redirige a /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Ruta protegida del Dashboard/Lista de Usuarios */}
          <Route path="/users" element={
            <div className="page users-page">
              <h1>Dashboard de Usuarios</h1>
              <p>Listado de usuarios (próximamente)</p>
              <div className="card">
                <p>Aquí irá la tabla/tarjetas con los 30 usuarios de la API.</p>
              </div>
            </div>
          } />
          
          {/* Ruta de Detalle de Usuario (con parámetro :id) */}
          <Route path="/users/:id" element={
            <div className="page detail-page">
              <h1>Detalle del Usuario</h1>
              <p>Vista detallada del usuario con ID específico.</p>
            </div>
          } />
          
          {/* Ruta 404 para cualquier otra dirección */}
          <Route path="*" element={
            <div className="page not-found">
              <h1>404 - Página no encontrada</h1>
              <p>La ruta a la que intentas acceder no existe.</p>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;