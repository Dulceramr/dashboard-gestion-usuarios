import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUsuarios } from '../hooks/useUsuarios';
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { usuarios, eliminarUsuario } = useUsuarios();
  
  // Buscar el usuario por ID
  const usuario = usuarios.find(u => u.login.uuid === id);
  
  if (!usuario) {
    return (
      <div className="user-not-found">
        <h1>Usuario no encontrado</h1>
        <p>El usuario con ID "{id}" no existe o fue eliminado.</p>
        <button onClick={() => navigate('/users')} className="btn-back">
          ← Volver al listado
        </button>
      </div>
    );
  }
  
  // Formatear fecha de nacimiento
  const fechaNacimiento = new Date(usuario.dob.date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Formatear teléfono (quitar caracteres extraños)
  const telefonoFormateado = usuario.phone.replace(/[^\d+()-]/g, ' ');
  
  return (
    <div className="user-detail-container">
      {/* Header con navegación */}
      <header className="detail-header">
        <Link to="/users" className="back-link">
          ← Volver al listado
        </Link>
        <h1>Detalle del Usuario</h1>
        <div className="user-actions">
          <button 
            className="btn-message"
            onClick={() => alert(`Enviar mensaje a ${usuario.name.first}`)}
          >
            💬 Enviar mensaje
          </button>
          <button 
            className="btn-delete"
            onClick={() => {
              if (window.confirm(`¿Estás seguro de eliminar a ${usuario.name.first} ${usuario.name.last}?`)) {
                alert(`Usuario ${usuario.name.first} eliminado (simulado)`);
                navigate('/users');
              }
            }}
          >
            🗑️ Eliminar usuario
          </button>
        </div>
      </header>
      
      <div className="detail-content">
        {/* Sección izquierda: Información principal */}
        <div className="main-info">
          <div className="user-card">
            <div className="user-avatar-large">
              <img 
                src={usuario.picture.large} 
                alt={`${usuario.name.first} ${usuario.name.last}`}
              />
              <div className="online-status"></div>
            </div>
            
            <div className="user-basic-info">
              <h2>{usuario.name.first} {usuario.name.last}</h2>
              <p className="user-title">{usuario.gender === 'male' ? 'Hombre' : 'Mujer'} • {usuario.dob.age} años</p>
              
              <div className="contact-info">
                <div className="contact-item">
                  <span className="icon">📧</span>
                  <div>
                    <strong>Email</strong>
                    <a href={`mailto:${usuario.email}`}>{usuario.email}</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <span className="icon">📱</span>
                  <div>
                    <strong>Teléfono</strong>
                    <a href={`tel:${usuario.phone}`}>{telefonoFormateado}</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <span className="icon">🎂</span>
                  <div>
                    <strong>Fecha de nacimiento</strong>
                    <span>{fechaNacimiento}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Información adicional */}
          <div className="additional-info">
            <div className="info-section">
              <h3>📍 Ubicación</h3>
              <p>
                <strong>País:</strong> {usuario.location.country}<br/>
                <strong>Ciudad:</strong> {usuario.location.city}<br/>
                <strong>Calle:</strong> {usuario.location.street.name} {usuario.location.street.number}<br/>
                <strong>Código Postal:</strong> {usuario.location.postcode}
              </p>
              <div className="map-placeholder">
                🌎 Mapa de {usuario.location.country}
                <small>(Integrar Google Maps API aquí)</small>
              </div>
            </div>
            
            <div className="info-section">
              <h3>📊 Información de la cuenta</h3>
              <p>
                <strong>ID de usuario:</strong> <code>{usuario.login.uuid.substring(0, 12)}...</code><br/>
                <strong>Nombre de usuario:</strong> {usuario.login.username}<br/>
                <strong>Registrado desde:</strong> {new Date(usuario.registered.date).toLocaleDateString('es-MX')}<br/>
                <strong>Nacionalidad:</strong> {usuario.nat}
              </p>
            </div>
          </div>
        </div>
        
        {/* Sección derecha: Historial de mensajes (simulado) */}
        <div className="message-history">
          <h3>📨 Historial de mensajes</h3>
          <div className="messages-list">
            <div className="message received">
              <div className="message-header">
                <strong>Sistema</strong>
                <span className="message-time">Hoy, 10:30 AM</span>
              </div>
              <p>¡Bienvenido/a al sistema, {usuario.name.first}!</p>
            </div>
            
            <div className="message sent">
              <div className="message-header">
                <strong>Tú</strong>
                <span className="message-time">Ayer, 15:45 PM</span>
              </div>
              <p>Recordatorio: Tu próxima revisión está programada para el próximo mes.</p>
            </div>
            
            <div className="message received">
              <div className="message-header">
                <strong>{usuario.name.first}</strong>
                <span className="message-time">15/Nov, 09:20 AM</span>
              </div>
              <p>Gracias por la actualización, todo está funcionando bien.</p>
            </div>
          </div>
          
          <div className="new-message">
            <textarea placeholder={`Escribe un mensaje para ${usuario.name.first}...`} />
            <button className="btn-send">Enviar mensaje</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;