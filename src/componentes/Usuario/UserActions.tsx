import { useState } from 'react';
import './UserActions.css'; 

interface UserActionsProps {
  userId: string;
  userName: string;
  onDelete: (id: string) => void;
}

const UserActions: React.FC<UserActionsProps> = ({ 
  userId, 
  userName, 
  onDelete 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleDelete = () => {
    onDelete(userId);
    setShowDeleteConfirm(false);
  };

  return (
    <div 
      className="user-actions-container"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowDeleteConfirm(false);
      }}
    >
      {/* Botón de menú (solo en hover) */}
      {showActions && (
        <div className="actions-menu">
          {/* Botón eliminar */}
          <button 
            className="action-btn delete-btn"
            onClick={() => setShowDeleteConfirm(true)}
          >
            🗑️ Eliminar
          </button>
          
          {/* Botón enviar mensaje */}
          <button 
            className="action-btn message-btn"
            onClick={() => alert(`Enviar mensaje a ${userName}`)}
          >
            💬 Mensaje
          </button>
          
          {/* Botón ver detalles */}
          <a 
            href={`/users/${userId}`}
            className="action-btn detail-btn"
          >
            👁️ Ver
          </a>
        </div>
      )}

      {/* Indicador de hover (puntos) */}
      {!showActions && (
        <div className="actions-indicator">⋯</div>
      )}

      {/* Modal de confirmación para eliminar */}
      {showDeleteConfirm && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h3>Confirmar eliminación</h3>
            <p>
              ¿Estás seguro de eliminar al usuario 
              <strong> {userName}</strong>?
              <br />
              <small>Esta acción no se puede deshacer.</small>
            </p>
            
            <div className="modal-actions">
              <button 
                className="modal-btn confirm-delete"
                onClick={handleDelete}
              >
                Sí, eliminar
              </button>
              <button 
                className="modal-btn cancel"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActions;