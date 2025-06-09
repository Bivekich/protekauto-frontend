import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileSidebar from '@/components/ProfileSidebar';
import OrderTabs from '@/components/OrderTabs';

const ProfileOrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="page-wrapper">
      <Header />
      
      {/* Хлебные крошки */}
      <section className="breadcrumbs">
        <div className="w-layout-blockcontainer container w-container">
          <div className="breadcrumb-wrapper">
            <a href="/" className="breadcrumb-link">Главная</a>
            <span className="breadcrumb-separator">→</span>
            <a href="/profile" className="breadcrumb-link">Личный кабинет</a>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-current">Заказы</span>
          </div>
          <h1 className="profile-title">Заказы</h1>
        </div>
      </section>

      {/* Основной контент */}
      <section className="profile-section">
        <div className="w-layout-blockcontainer container w-container">
          <div className="profile-layout">
            {/* Боковое меню */}
            <ProfileSidebar activeItem="orders" />

            {/* Основной контент */}
            <div className="profile-content">
              {/* Верхняя панель с табами и поиском */}
              <div className="orders-header">
                <OrderTabs 
                  activeTab={activeTab} 
                  onTabChange={setActiveTab} 
                />
                <div className="orders-search">
                  <input 
                    type="text"
                    placeholder="Поиск уведомлений"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <div className="search-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5 17.5L13.8834 13.8833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Контент заказов */}
              <div className="orders-content">
                <div className="orders-empty">
                  <h2 className="orders-empty-title">Все</h2>
                  <p className="orders-empty-text">В данный момент у вас нет заказов</p>
                  <button className="btn-primary">
                    Перейти к покупкам
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .page-wrapper {
          background-color: #F5F8FB;
          min-height: 100vh;
          font-family: 'Onest', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .breadcrumbs {
          background: white;
          padding: 30px 0;
        }

        .container {
          max-width: 1660px;
          margin: 0 auto;
          padding: 0 130px;
        }

        .breadcrumb-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .breadcrumb-link {
          color: #000000;
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.4;
        }

        .breadcrumb-link:hover {
          color: #EC1C24;
        }

        .breadcrumb-separator {
          color: #8E9AAC;
          font-size: 14px;
          line-height: 1.3;
        }

        .breadcrumb-current {
          color: #8E9AAC;
          font-size: 14px;
          line-height: 1.3;
        }

        .profile-title {
          font-size: 36px;
          font-weight: 800;
          color: #000814;
          margin: 0;
          line-height: 1;
        }

        .profile-section {
          padding: 40px 0 60px;
        }

        .profile-layout {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }

        .profile-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .orders-header {
          display: flex;
          gap: 20px;
          align-items: stretch;
        }

        .orders-search {
          position: relative;
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 12px 50px 12px 30px;
          border: none;
          border-radius: 8px;
          background: white;
          font-size: 16px;
          color: #000814;
          outline: none;
          line-height: 1.4;
          box-sizing: border-box;
        }

        .search-input::placeholder {
          color: #8893A1;
        }

        .search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #8893A1;
          width: 20px;
          height: 20px;
          pointer-events: none;
        }

        .orders-content {
          background: white;
          border-radius: 16px;
          padding: 30px;
          align-self: stretch;
        }

        .orders-empty {
          text-align: left;
        }

        .orders-empty-title {
          font-size: 30px;
          font-weight: 700;
          color: #000814;
          margin: 0 0 30px 0;
          line-height: 1;
        }

        .orders-empty-text {
          font-size: 20px;
          font-weight: 500;
          color: #000814;
          margin: 0 0 30px 0;
          line-height: 1.4;
          width: 100%;
        }

        .btn-primary {
          background: #EC1C24;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 14px 20px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          height: 50px;
          transition: background-color 0.2s;
          line-height: 1.2;
          text-align: center;
        }

        .btn-primary:hover {
          background: #d91820;
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 20px;
          }

          .profile-layout {
            flex-direction: column;
            gap: 20px;
          }

          .orders-header {
            flex-direction: column;
            gap: 15px;
          }

          .orders-search {
            max-width: none;
          }

          .breadcrumb-wrapper {
            flex-wrap: wrap;
          }

          .profile-title {
            font-size: 28px;
          }

          .orders-content {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileOrdersPage; 