import React from 'react';

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all', label: 'Все' },
    { id: 'current', label: 'Текущие' },
    { id: 'completed', label: 'Выполненные' },
    { id: 'cancelled', label: 'Отмененные' }
  ];

  return (
    <div className="order-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
        >
          <div className="tab-content">
            {tab.label}
          </div>
        </button>
      ))}

      <style jsx>{`
        .order-tabs {
          display: flex;
          gap: 20px;
          flex: 1;
        }

        .tab-button {
          flex: 1;
          background: #E6EDF6;
          border: none;
          border-radius: 12px;
          padding: 0;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 48px;
        }

        .tab-button.active {
          background: #EC1C24;
        }

        .tab-button:hover {
          transform: translateY(-1px);
        }

        .tab-content {
          padding: 14px 22px;
          font-size: 18px;
          font-weight: 500;
          line-height: 1.2;
          color: #000814;
          border-radius: 12px;
          width: 100%;
        }

        .tab-button.active .tab-content {
          color: white;
        }

        @media (max-width: 768px) {
          .order-tabs {
            flex-direction: column;
            gap: 10px;
          }

          .tab-button {
            flex: none;
          }

          .tab-content {
            font-size: 16px;
            padding: 12px 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderTabs; 