import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { UsuariosProvider } from './context/UsuariosContext';
import { MessagesProvider } from './context/MessagesContext';

import Login from './paginas/Login';
import ProtectedRoute from './componentes/Layout/ProtectedRoute';
import Users from './paginas/Users';
import UserDetail from './paginas/UserDetail';

function App() {
  return (
    <UsuariosProvider>
      <MessagesProvider>
        <BrowserRouter>
          {/* Contenedor principal con la paleta de colores */}
          <div className="app-container">
            <Routes>
              {/* Ruta pública de Login */}
              <Route path="/login"  element={<Login />} />
              
              {/* Ruta principal: redirige a /login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Ruta protegida del Dashboard/Lista de Usuarios */}
              <Route path="/users" element={
                <ProtectedRoute>
                  <Users /> 
                </ProtectedRoute>
              } />
              
              {/* Ruta de Detalle de Usuario (con parámetro :id) */}
              <Route path="/users/:id" element={
                <ProtectedRoute>
                  <UserDetail />
                </ProtectedRoute>
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
      </MessagesProvider>
    </UsuariosProvider>
  );
}

export default App;