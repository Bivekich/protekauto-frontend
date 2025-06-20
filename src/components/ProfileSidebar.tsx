import React from 'react';
import { useIsClient } from '@/lib/useIsomorphicLayoutEffect';

interface ProfileSidebarProps {
  activeItem: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeItem }) => {
  const isClient = useIsClient();
  
  const menuItems = [
    { id: 'orders', icon: 'order', label: 'Заказы', href: '/profile-orders' },
    { id: 'history', icon: 'history', label: 'История поиска', href: '/profile-history' },
    { id: 'notifications', icon: 'bell', label: 'Уведомления', href: '/profile-notifications' },
    { id: 'messages', icon: 'message', label: 'Оповещения', href: '/profile-messages' },
    { id: 'addresses', icon: 'location', label: 'Адреса доставки', href: '/profile-addresses' },
    { id: 'garage', icon: 'garage', label: 'Гараж', href: '/profile-garage' },
    { id: 'settings', icon: 'settings', label: 'Настройки аккаунта', href: '/profile-settings' }
  ];

  const handleLogout = () => {
    if (isClient) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/';
    }
  };

  const financeItems = [
    { id: 'balance', icon: 'wallet', label: 'Баланс', href: '/profile-balance' },
    { id: 'requisites', icon: 'case', label: 'Реквизиты', href: '/profile-requisites' },
    { id: 'mutual', icon: 'finance_check', label: 'Взаиморасчеты', href: '/profile-mutual' },
    { id: 'acts', icon: 'order', label: 'Акты сверки', href: '/profile-acts' }
  ];

  const renderIcon = (iconType: string, isActive: boolean) => {
    const color = isActive ? '#424F60' : '#424F60';
    
    switch (iconType) {
      case 'order':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2L6 16H14L17 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'history':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="2"/>
            <path d="m10 6 0 4 3 3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'bell':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 8C6 5.79086 7.79086 4 10 4C12.2091 4 14 5.79086 14 8C14 11 15 12 15 12H5C5 12 6 11 6 8Z" stroke={color} strokeWidth="2"/>
            <path d="M9 16C9.26522 16.3333 9.63043 16.5 10 16.5C10.3696 16.5 10.7348 16.3333 11 16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'message':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12L12 8M8 8L12 12M18 4H2V14H6L10 18L14 14H18V4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'location':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" stroke={color} strokeWidth="2"/>
            <path d="M17 9C17 13.5 10 19 10 19C10 19 3 13.5 3 9C3 5.68629 6.31371 2 10 2C13.6863 2 17 5.68629 17 9Z" stroke={color} strokeWidth="2"/>
          </svg>
        );
      case 'garage':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8L10 3L18 8V18H14V12H6V18H2V8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'settings':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="3" stroke={color} strokeWidth="2"/>
            <path d="M10 1V3M10 17V19M18.66 9L16.66 10M3.34 10L1.34 9M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'wallet':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="5" width="16" height="12" rx="2" stroke={color} strokeWidth="2"/>
            <path d="M2 7H18M5 3H15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'case':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="7" width="16" height="10" rx="2" stroke={color} strokeWidth="2"/>
            <path d="M6 7V5C6 3.89543 6.89543 3 8 3H12C13.1046 3 14 3.89543 14 5V7M2 11H18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'finance_check':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="16" height="14" rx="2" stroke={color} strokeWidth="2"/>
            <path d="M8 12L10 14L15 9M2 7H18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-sidebar">
      <div className="sidebar-section">
        <div className="sidebar-header">
          <h3 className="sidebar-title">Личный кабинет</h3>
        </div>
        <div className="sidebar-menu">
          {menuItems
            .filter(item => !['notifications', 'messages'].includes(item.id)) // Временно скрываем уведомления и оповещения
            .map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
            >
              <div className="sidebar-icon">
                {renderIcon(item.icon, activeItem === item.id)}
              </div>
              <span className="sidebar-label">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header">
          <h3 className="sidebar-title">Финансы</h3>
        </div>
        <div className="sidebar-menu">
          {financeItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
            >
              <div className="sidebar-icon">
                {renderIcon(item.icon, activeItem === item.id)}
              </div>
              <span className="sidebar-label">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Кнопка выхода */}
      <div className="logout-section">
        <button onClick={handleLogout} className="logout-button">
          <div className="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#424F60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17L21 12L16 7" stroke="#424F60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H9" stroke="#424F60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="sidebar-label">Выйти</span>
        </button>
      </div>

      <style jsx>{`
        .profile-sidebar {
          width: 320px;
          background: white;
          border-radius: 20px;
          padding: 15px 15px 25px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: fit-content;
          align-self: flex-start;
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sidebar-header {
          padding: 10px 10px 0px;
        }

        .sidebar-title {
          font-size: 20px;
          font-weight: 600;
          color: #000814;
          margin: 0;
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 8px;
          text-decoration: none;
          color: #424F60;
          font-size: 16px;
          font-weight: 400;
          transition: all 0.2s;
          width: 290px;
        }

        .sidebar-item:hover {
          background: #E6EDF6;
        }

        .sidebar-item.active {
          background: #E6EDF6;
          color: #424F60;
        }

        .sidebar-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-label {
          flex: 1;
        }

        .logout-section {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid #E6EDF6;
        }

        .logout-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 8px;
          background: none;
          border: none;
          cursor: pointer;
          color: #424F60;
          font-size: 16px;
          font-weight: 400;
          transition: all 0.2s;
          width: 290px;
          text-align: left;
        }

        .logout-button:hover {
          background: #E6EDF6;
          color: #EC1C24;
        }

        .logout-button:hover svg path {
          stroke: #EC1C24;
        }

        @media (max-width: 768px) {
          .profile-sidebar {
            width: 100%;
          }

          .sidebar-item {
            width: 100%;
          }

          .logout-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileSidebar; 