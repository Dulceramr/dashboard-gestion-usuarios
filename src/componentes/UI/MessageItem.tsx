import type { Message } from '../../context/MessagesContext';
import './MessageItem.css';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const msgDate = new Date(date);
    const diffDays = Math.floor((now.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return msgDate.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div 
      className={`message-item ${message.type} ${!message.read && message.type === 'received' ? 'unread' : ''}`}
    >
      <div className="message-header">
        <span className="message-type">
          {message.type === 'sent' ? '📤 Tú' : '📥 Sistema'}
        </span>
        <span className="message-time">
          {formatDate(message.timestamp)} • {formatTime(message.timestamp)}
        </span>
      </div>
      
      <div className="message-content">
        {message.content}
      </div>
    </div>
  );
};

export default MessageItem;