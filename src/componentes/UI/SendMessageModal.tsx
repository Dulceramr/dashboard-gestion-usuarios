import { useState, useEffect } from 'react';
import { useMessages } from '../../context/MessagesContext';
import './SendMessageModal.css';

interface SendMessageModalProps {
  userId: string;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({
  userId,
  userName,
  isOpen,
  onClose,
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { sendMessage } = useMessages();

    useEffect(() => {
    if (isOpen) {
      console.log('🎯 Modal abierto para:', userName);
    }
  }, [isOpen, userName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      alert('Por favor escribe un mensaje');
      return;
    }

    console.log('📝 Enviando mensaje:', message);
    setIsSending(true);
    
    try {
      // Llama a la función del contexto
      sendMessage(userId, userName, message);
      
      console.log('✅ Mensaje enviado exitosamente');
      alert(`✅ Mensaje enviado a ${userName}`);
      
      setMessage('');
      onClose();
      
    } catch (error) {
      console.error('❌ Error sending message:', error);
      alert('Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="send-message-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📨 Enviar mensaje a {userName}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Escribe tu mensaje para ${userName}...`}
              rows={5}
              disabled={isSending}
              className="message-textarea"
            />
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={isSending || !message.trim()}>
              {isSending ? 'Enviando...' : '📤 Enviar mensaje'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessageModal;