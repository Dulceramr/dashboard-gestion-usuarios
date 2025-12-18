import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  type: 'sent' | 'received';
  read: boolean;
}

interface MessagesContextType {
  messages: Message[];
  sendMessage: (userId: string, userName: string, content: string) => void;
  getUserMessages: (userId: string) => Message[];
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('user_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
    return [];
  });

  const sendMessage = useCallback((userId: string, userName: string, content: string) => {
    console.log('🚀 ENVIANDO MENSAJE:', { userId, userName, content });
    
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      userId,
      userName,
      content: content.trim(),
      timestamp: new Date(),
      type: 'sent',
      read: true,
    };

    // Respuesta automática
    const autoReply: Message = {
      id: `msg_${Date.now() + 1}`,
      userId,
      userName,
      content: `Gracias por tu mensaje! Te responderé pronto.`,
      timestamp: new Date(Date.now() + 3000),
      type: 'received',
      read: false,
    };

    setMessages(prev => {
      const updated = [...prev, newMessage, autoReply];
      localStorage.setItem('user_messages', JSON.stringify(updated));
      console.log('💾 Mensajes guardados:', updated);
      return updated;
    });

    return newMessage.id;
  }, []);

  const getUserMessages = useCallback((userId: string) => {
    return messages
      .filter(msg => msg.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [messages]);

  const value = {
    messages,
    sendMessage,
    getUserMessages,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within MessagesProvider');
  }
  return context;
};