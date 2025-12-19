import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUsuarios } from '../hooks/useUsuarios';
import { useState } from 'react';
import MessageHistory from '../componentes/UI/MessageHistory';
import SendMessageModal from '../componentes/UI/SendMessageModal';
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { usuarios, eliminarUsuario } = useUsuarios();
  const [showMessageModal, setShowMessageModal] = useState(false);
  
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
  
  const fechaNacimiento = new Date(usuario.dob.date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const telefonoFormateado = usuario.phone.replace(/[^\d+()-]/g, ' ');
  
  const handleEliminarUsuario = () => {
    if (window.confirm(`¿Estás seguro de eliminar a ${usuario.name.first} ${usuario.name.last}?`)) {
      eliminarUsuario(usuario.login.uuid);
      alert(`Usuario ${usuario.name.first} eliminado exitosamente`);
      navigate('/users');
    }
  };
  
  return (
    <div className="user-detail-container">
      <header className="detail-header">
        <Link to="/users" className="back-link">
          ← Volver al listado
        </Link>
        <h1>Detalle del Usuario</h1>
        <div className="user-actions">
          <button 
            className="btn-message"
            onClick={() => setShowMessageModal(true)}
          >
            💬 Enviar mensaje
          </button>
          <button 
            className="btn-delete"
            onClick={handleEliminarUsuario}
          >
            🗑️ Eliminar usuario
          </button>
        </div>
      </header>
      
      <div className="detail-content">
        <div className="main-info">
          <div className="user-card">
            <div className="user-avatar-large">
              <img 
                src={usuario.picture.large} 
                alt={`${usuario.name.first} ${usuario.name.last}`}
              />
            </div>
            
            <div className="user-basic-info">
              <h2>{usuario.name.first} {usuario.name.last}</h2>
              <p className="user-title">
                {usuario.gender === 'male' ? 'Hombre' : 'Mujer'} • {usuario.dob.age} años
              </p>
              
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
          
          <div className="additional-info">
            <div className="info-section">
              <h3>📍 Ubicación</h3>
              <p>
                <strong>País:</strong> {usuario.location.country}<br/>
                <strong>Ciudad:</strong> {usuario.location.city}<br/>
                <strong>Calle:</strong> {usuario.location.street.name} {usuario.location.street.number}<br/>
                <strong>Código Postal:</strong> {usuario.location.postcode}
              </p>
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
        
        <div className="message-history-section">
          <MessageHistory 
            userId={usuario.login.uuid}
            userName={`${usuario.name.first} ${usuario.name.last}`}
          />
        </div>
      </div>

      <SendMessageModal
        userId={usuario.login.uuid}
        userName={`${usuario.name.first} ${usuario.name.last}`}
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)} 
      />
    </div>
  );
};

export default UserDetail;