'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export type NotificationType = 'info' | 'success' | 'partnership' | 'winner';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

// Global emitter
type Listener = (notification: Notification) => void;
const listeners = new Set<Listener>();

export const triggerNotification = (notification: Omit<Notification, 'id'>) => {
  const id = Math.random().toString(36).substr(2, 9);
  listeners.forEach(listener => listener({ ...notification, id }));
};

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const listener = (notification: Notification) => {
      setNotifications(prev => [...prev, notification]);
      
      if (notification.duration !== 0) {
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== notification.id));
        }, notification.duration || 5000);
      }
    };
    
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="notification-container">
      {notifications.map(notif => (
        <div key={notif.id} className={`notification-card notification--${notif.type} animate-slide-in`}>
          <div className="notification-icon">
            {notif.type === 'partnership' && '🤝'}
            {notif.type === 'winner' && '🏆'}
            {notif.type === 'success' && '✅'}
            {notif.type === 'info' && '👋'}
          </div>
          <div className="notification-content">
            <h4 className="notification-title">{notif.title}</h4>
            <p className="notification-message">{notif.message}</p>
          </div>
          <button className="notification-close" onClick={() => removeNotification(notif.id)}>
            &times;
          </button>
        </div>
      ))}
      <style jsx>{`
        .notification-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
        }
        .notification-card {
          pointer-events: auto;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px;
          border-radius: 12px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          min-width: 300px;
          max-width: 400px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          color: white;
          position: relative;
          overflow: hidden;
        }
        .notification-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--primary-color, #3b82f6);
        }
        .notification--partnership::before {
          background: #f59e0b; /* amber */
        }
        .notification--winner::before {
          background: #10b981; /* emerald */
        }
        .notification--info::before {
          background: #3b82f6; /* blue */
        }
        .notification-icon {
          font-size: 1.5rem;
          line-height: 1;
        }
        .notification-content {
          flex: 1;
        }
        .notification-title {
          margin: 0 0 4px 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .notification-message {
          margin: 0;
          font-size: 0.875rem;
          color: #94a3b8;
          line-height: 1.4;
        }
        .notification-close {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          transition: color 0.2s;
        }
        .notification-close:hover {
          color: white;
        }
        .animate-slide-in {
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
