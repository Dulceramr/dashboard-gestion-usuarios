import { useMessages } from '../../context/MessagesContext';
import MessageItem from './MessageItem';
import './MessageHistory.css';

interface MessageHistoryProps {
  userId: string;
  userName: string;
}

const MessageHistory: React.FC<MessageHistoryProps> = ({ userId, userName }) => {
  const { getUserMessages } = useMessages();
  const messages = getUserMessages(userId);

  if (messages.length === 0) {
    return (
      <div className="message-history empty">
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>No hay mensajes aún</h3>
          <p>Envía tu primer mensaje a {userName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-history">
      <div className="history-header">
        <h3>📨 Historial de mensajes</h3>
        <span className="message-count">
          {messages.length} mensaje{messages.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
          />
        ))}
      </div>
      
      <div className="history-footer">
        <small>
          {messages.filter(m => m.type === 'received').length} 
        </small>
        <small>
          Último: {new Date(messages[0]?.timestamp).toLocaleDateString('es-MX')}
        </small>
      </div>
    </div>
  );
};

export default MessageHistory;