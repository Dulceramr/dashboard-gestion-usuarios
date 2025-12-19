import { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import './UserActions.scss'; 
import SendMessageModal from '../UI/SendMessageModal';

interface UserActionsProps {
  userId: string;
  userName: string;
  onDelete: (id: string) => void;
}

const UserActions = memo(({ 
  userId, 
  userName, 
  onDelete 
}: UserActionsProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

    // MEMORIZAR handlers para evitar renders
  const handleMouseEnter = useCallback(() => setShowActions(true), []);
  const handleMouseLeave = useCallback(() => {
    setShowActions(false);
    setShowDeleteConfirm(false);
  }, []);
  
  const handleDeleteClick = useCallback(() => setShowDeleteConfirm(true), []);
  const handleCloseMessageModal = useCallback(() => setShowMessageModal(false), []);
  const handleOpenMessageModal = useCallback(() => setShowMessageModal(true), []);

  const handleDelete = useCallback(() => {
    onDelete(userId);
    setShowDeleteConfirm(false);
  }, [onDelete, userId]);

  return (
    <div 
      className="user-actions-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Botón de menú (solo en hover) */}
      {showActions && (
        <div className="actions-menu">
          {/* Botón eliminar */}
          <button 
            className="action-btn delete-btn"
            onClick={handleDeleteClick}
            title="Eliminar usuario"
          >
            🗑️ Eliminar
          </button>
          
          {/* Botón enviar mensaje */}
          <button 
            className="action-btn message-btn"
            onClick={handleOpenMessageModal}
          >
            💬 Mensaje
          </button>
          
          {/* Botón ver detalles */}
          <Link to={`/users/${userId}`}
            className="action-btn detail-btn"
          >
            👁️ Ver
          </Link>
        </div>
      )}

      {/* Indicador de hover (puntos) */}
      {!showActions && (
        <div className="actions-indicator">⋯</div>
      )}

      <SendMessageModal
        userId={userId}
        userName={userName}
        isOpen={showMessageModal}
        onClose={handleCloseMessageModal}
      />

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
});

export default UserActions;