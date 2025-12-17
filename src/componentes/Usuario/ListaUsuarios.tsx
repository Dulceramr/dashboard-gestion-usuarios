import { useUsuarios } from '../../hooks/useUsuarios';
import { Link } from 'react-router-dom';
import UserActions from './UserActions';
import './ListaUsuarios.css'; 
import './UserActions.css'; 

interface Filtros {
  genero: string;
  nacionalidad: string;
  rangoEdad: { min: number; max: number };
}

interface Props {
  filtros?: Filtros;
}

const ListaUsuarios = ({ filtros }: Props) => {
  const { 
    usuarios, 
    cargando, 
    error, 
    recargarUsuarios,
    totalUsuarios,
    hombres,
    mujeres,
    filtrarUsuarios,
    eliminarUsuario
  } = useUsuarios();

  // Filtrar usuarios si hay filtros
  const usuariosFiltrados = filtros ? filtrarUsuarios(filtros) : usuarios;
  const totalFiltrados = usuariosFiltrados.length;

  // Calcular estadísticas de los usuarios filtrados
  const hombresFiltrados = usuariosFiltrados.filter(u => u.gender === 'male').length;
  const mujeresFiltradas = usuariosFiltrados.filter(u => u.gender === 'female').length;

  // Función para manejar eliminación (puedes personalizar esto)
  const handleDeleteUser = (userId: string) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      eliminarUsuario(userId);
      // Puedes usar tu ToastNotificacion aquí
      alert('Usuario eliminado exitosamente');
    }
  };

  if (cargando) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>❌ {error}</p>
        <button onClick={recargarUsuarios} className="btn-retry">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="lista-usuarios-container">
      <div className="header-dashboard">
        <h2>Dashboard de Usuarios</h2>
        <div className="stats">
          <span>👥 Total: {totalUsuarios}</span>
          <span>👨 Hombres: {hombresFiltrados}</span>
          <span>👩 Mujeres: {mujeresFiltradas}</span>
          {filtros && (filtros.genero !== 'all' || filtros.nacionalidad !== 'all') && (
            <span className="filtro-activo">✅ Mostrando: {totalFiltrados}</span>
          )}
        </div>
        <button onClick={recargarUsuarios} className="btn-refresh">
          🔄 Actualizar
        </button>
      </div>

      {/* Tabla de usuarios */}
      <div className="table-responsive">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Edad</th>
              <th>País</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.login.uuid}>
                <td>
                  <img 
                    src={usuario.picture.large} 
                    alt={`${usuario.name.first} ${usuario.name.last}`}
                    className="user-avatar"
                  />
                </td>
                <td>
                  <Link to={`/users/${usuario.login.uuid}`} className="user-link">
                    {usuario.name.first} {usuario.name.last}
                  </Link>
                </td>
                <td>{usuario.email}</td>
                <td>{usuario.dob.age}</td>
                <td>{usuario.location.country}</td>
                <td>{usuario.phone}</td>
                <td>
                  <UserActions 
                    userId={usuario.login.uuid}
                    userName={`${usuario.name.first} ${usuario.name.last}`}
                    onDelete={handleDeleteUser}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalFiltrados === 0 && !cargando && (
        <div className="sin-resultados">
          <p>😔 No se encontraron usuarios con los filtros aplicados.</p>
          <button onClick={() => window.location.reload()} className="btn-limpiar">
            🔄 Mostrar todos los usuarios
          </button>
        </div>
      )}
    </div>
  );
};

export default ListaUsuarios;