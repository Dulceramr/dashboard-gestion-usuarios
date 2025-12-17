import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Login.css'; // Lo crearemos después

const Login = () => {
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({
    usuario: '',
    contrasena: ''
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // Credenciales válidas (simuladas para la prueba)
  const USUARIO_VALIDO = 'admin';
  const CONTRASENA_VALIDA = 'admin123';

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredenciales(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (error) setError('');
  };

  const manejarSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCargando(true);
    
    // Simular una petición a una API
    setTimeout(() => {
      if (credenciales.usuario === USUARIO_VALIDO && 
          credenciales.contrasena === CONTRASENA_VALIDA) {
        
        // 1. Guardar sesión en sessionStorage (persiste mientras la pestaña esté abierta)
        sessionStorage.setItem('estaAutenticado', 'true');
        sessionStorage.setItem('usuario', credenciales.usuario);
        
        // 2. Redirigir al dashboard de usuarios
        navigate('/users');
        
        // 3. (Opcional) Podrías guardar un token JWT real aquí
      } else {
        setError('Usuario o contraseña incorrectos. Usa: admin / admin123');
      }
      setCargando(false);
    }, 800); // Retraso simulado de 800ms
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo o título */}
        <div className="login-header">
          <h1>Dashboard de Gestión</h1>
          <p className="login-subtitle">Inicia sesión para acceder al panel</p>
        </div>

        {/* Formulario */}
        <form onSubmit={manejarSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={credenciales.usuario}
              onChange={manejarCambio}
              placeholder="Ej: admin"
              required
              disabled={cargando}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={credenciales.contrasena}
              onChange={manejarCambio}
              placeholder="Ej: admin123"
              required
              disabled={cargando}
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="login-error">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Botón de submit */}
          <button 
            type="submit" 
            className="login-btn"
            disabled={cargando || !credenciales.usuario || !credenciales.contrasena}
          >
            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Nota para evaluadores (puedes quitarla después) */}
        <div className="login-note">
          <p><strong>Credenciales para prueba:</strong></p>
          <p>Usuario: <code>admin</code> | Contraseña: <code>admin123</code></p>
        </div>
      </div>
    </div>
  );
};

export default Login;