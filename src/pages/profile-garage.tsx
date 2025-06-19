import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileSidebar from '@/components/ProfileSidebar';
import {
  GET_USER_VEHICLES,
  GET_VEHICLE_SEARCH_HISTORY,
  CREATE_USER_VEHICLE,
  DELETE_USER_VEHICLE,
  ADD_VEHICLE_FROM_SEARCH,
  DELETE_SEARCH_HISTORY_ITEM,
  SEARCH_VEHICLE_BY_VIN,
  UserVehicle,
  VehicleSearchHistory,
  UserVehicleInput
} from '@/lib/graphql/garage';

const ProfileGaragePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCar, setNewCar] = useState<UserVehicleInput>({
    name: '',
    vin: '',
    comment: ''
  });
  const router = useRouter();

  // GraphQL queries
  const { data: vehiclesData, loading: vehiclesLoading, refetch: refetchVehicles } = useQuery(GET_USER_VEHICLES);
  const { data: historyData, loading: historyLoading, refetch: refetchHistory } = useQuery(GET_VEHICLE_SEARCH_HISTORY);

  // GraphQL mutations
  const [createVehicle] = useMutation(CREATE_USER_VEHICLE, {
    onCompleted: () => {
      refetchVehicles();
      setNewCar({ name: '', vin: '', comment: '' });
      setShowAddForm(false);
    },
    onError: (error) => {
      console.error('Ошибка создания автомобиля:', error);
      alert('Ошибка при добавлении автомобиля');
    }
  });

  const [deleteVehicle] = useMutation(DELETE_USER_VEHICLE, {
    onCompleted: () => {
      refetchVehicles();
    },
    onError: (error) => {
      console.error('Ошибка удаления автомобиля:', error);
      alert('Ошибка при удалении автомобиля');
    }
  });

  const [addFromSearch] = useMutation(ADD_VEHICLE_FROM_SEARCH, {
    onCompleted: () => {
      refetchVehicles();
    },
    onError: (error) => {
      console.error('Ошибка добавления из истории:', error);
      alert('Ошибка при добавлении автомобиля из истории');
    }
  });

  const [deleteHistoryItem] = useMutation(DELETE_SEARCH_HISTORY_ITEM, {
    onCompleted: () => {
      refetchHistory();
    },
    onError: (error) => {
      console.error('Ошибка удаления истории:', error);
      alert('Ошибка при удалении из истории');
    }
  });

  const cars: UserVehicle[] = vehiclesData?.userVehicles || [];
  const searchHistory: VehicleSearchHistory[] = historyData?.vehicleSearchHistory || [];

  const handleAddCar = () => {
    setShowAddForm(true);
  };

  const handleSaveCar = async () => {
    if (!newCar.vin?.trim()) {
      alert('Введите VIN номер');
      return;
    }

    if (!newCar.name?.trim()) {
      alert('Введите название автомобиля');
      return;
    }

    try {
      await createVehicle({
        variables: {
          input: newCar
        }
      });
    } catch (error) {
      console.error('Ошибка сохранения автомобиля:', error);
    }
  };

  const handleCancelAdd = () => {
    setNewCar({ name: '', vin: '', comment: '' });
    setShowAddForm(false);
  };

  const handleDeleteCar = async (carId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
      try {
        await deleteVehicle({
          variables: { id: carId }
        });
      } catch (error) {
        console.error('Ошибка удаления автомобиля:', error);
      }
    }
  };

  const handleAddFromHistory = async (historyCar: VehicleSearchHistory) => {
    try {
      await addFromSearch({
        variables: {
          vin: historyCar.vin,
          comment: ''
        }
      });
    } catch (error) {
      console.error('Ошибка добавления из истории:', error);
    }
  };

  const handleDeleteFromHistory = async (historyId: string) => {
    try {
      await deleteHistoryItem({
        variables: { id: historyId }
      });
    } catch (error) {
      console.error('Ошибка удаления истории:', error);
    }
  };

  return (
    <div className="page-wrapper">

      
      {/* Хлебные крошки */}
      <section className="breadcrumbs">
        <div className="w-layout-blockcontainer container w-container">
          <div className="breadcrumb-wrapper">
            <a href="/" className="breadcrumb-link">Главная</a>
            <span className="breadcrumb-separator">→</span>
            <a href="/profile" className="breadcrumb-link">Личный кабинет</a>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-current">Гараж</span>
          </div>
          <h1 className="profile-title">Гараж</h1>
        </div>
      </section>

      {/* Основной контент */}
      <section className="profile-content">
        <div className="w-layout-blockcontainer container w-container">
          <div className="profile-layout">
            
            {/* Боковое меню */}
            <ProfileSidebar activeItem="garage" />

            {/* Основной контент */}
            <div className="profile-main">
              
              {/* Поиск */}
              <div className="search-section">
                <div className="search-wrapper">
                  <input
                    type="text"
                    placeholder="Поиск по гаражу"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <div className="search-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M19 19L14.65 14.65" stroke="#8893A1" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="9" cy="9" r="7" stroke="#8893A1" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Мои автомобили */}
              <div className="garage-section">
                <h2 className="section-title">Мои автомобили</h2>
                <div className="cars-grid">
                  {cars.map((car) => (
                    <div key={car.id} className="car-card">
                      <div className="car-info">
                        <div className="car-details">
                          <h3 className="car-name">{car.name}</h3>
                          <p className="car-vin">{car.vin}</p>
                        </div>
                        {car.comment && (
                          <div className="car-comment-display">
                            {car.comment}
                          </div>
                        )}
                        <div className="car-actions">
                          <button 
                            onClick={() => handleDeleteCar(car.id)}
                            className="action-button delete"
                          >
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                              <path d="M2 4H16M7 4V2H11V4M3 4L4 14H14L15 4H3Z" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Удалить
                          </button>
                          <button className="action-button expand">
                            Развернуть
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 4L7 9L12 4" stroke="#000814" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Форма добавления автомобиля */}
                {showAddForm && (
                  <div className="add-car-form">
                    <h3 className="form-title">Добавить авто в гараж</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Название</label>
                        <input
                          type="text"
                          value={newCar.name}
                          onChange={(e) => setNewCar({...newCar, name: e.target.value})}
                          placeholder="Название автомобиля"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">VIN</label>
                        <input
                          type="text"
                          value={newCar.vin || ''}
                          onChange={(e) => setNewCar({...newCar, vin: e.target.value})}
                          placeholder="VIN"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Комментарий</label>
                        <input
                          type="text"
                          value={newCar.comment || ''}
                          onChange={(e) => setNewCar({...newCar, comment: e.target.value})}
                          placeholder="Комментарий"
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button onClick={handleSaveCar} className="btn-primary">
                        Сохранить
                      </button>
                      <button onClick={handleCancelAdd} className="btn-secondary">
                        Отменить
                      </button>
                    </div>
                  </div>
                )}

                {!showAddForm && (
                  <button onClick={handleAddCar} className="btn-primary add-car-btn">
                    Добавить авто
                  </button>
                )}
              </div>

              {/* История поиска */}
              <div className="garage-section">
                <h2 className="section-title">Ранее вы искали</h2>
                <div className="history-grid">
                  {searchHistory.map((item) => (
                    <div key={item.id} className="history-card">
                      <div className="history-info">
                        <div className="car-details">
                          <h3 className="car-name-history">{item.brand && item.model ? `${item.brand} ${item.model}` : 'Неизвестный автомобиль'}</h3>
                          <p className="car-vin">{item.vin}</p>
                        </div>
                        <button 
                          onClick={() => handleAddFromHistory(item)}
                          className="action-button add"
                        >
                          <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                            <path d="M9 3V13M3 8H15" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Добавить в гараж
                        </button>
                        <div className="history-meta">
                          <span className="search-date">{item.searchDate}</span>
                          <button 
                            onClick={() => handleDeleteFromHistory(item.id)}
                            className="action-button delete small"
                          >
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                              <path d="M2 4H16M7 4V2H11V4M3 4L4 14H14L15 4H3Z" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
        }

        .breadcrumbs {
          background: white;
          padding: 30px 0;
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
        }

        .breadcrumb-link:hover {
          color: #EC1C24;
        }

        .breadcrumb-separator {
          color: #8E9AAC;
          font-size: 14px;
        }

        .breadcrumb-current {
          color: #8E9AAC;
          font-size: 14px;
        }

        .profile-title {
          font-size: 36px;
          font-weight: 800;
          color: #000814;
          margin: 0;
        }

        .profile-content {
          padding: 40px 0 60px;
        }

        .profile-layout {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }

        .profile-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .search-section {
          margin-bottom: 20px;
        }

        .search-wrapper {
          position: relative;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 12px 50px 12px 30px;
          border: none;
          border-radius: 8px;
          background: white;
          font-size: 16px;
          color: #000814;
          box-sizing: border-box;
        }

        .search-input::placeholder {
          color: #8893A1;
        }

        .search-icon {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .garage-section {
          background: white;
          border-radius: 16px;
          padding: 30px;
        }

        .section-title {
          font-size: 30px;
          font-weight: 700;
          color: #000814;
          margin: 0 0 30px 0;
        }

        .cars-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 30px;
        }

        .car-card {
          background: #F5F8FB;
          border-radius: 8px;
          padding: 12px 20px;
        }

        .car-info {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .car-details {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .car-name {
          font-size: 20px;
          font-weight: 700;
          color: #000814;
          margin: 0;
        }

        .car-name-history {
          font-size: 18px;
          font-weight: 700;
          color: #000814;
          margin: 0;
        }

        .car-vin {
          font-size: 14px;
          color: #424F60;
          margin: 0;
        }

        .car-comment-display {
          padding: 6px 14px;
          background: white;
          border: 1px solid #F0F0F0;
          border-radius: 4px;
          font-size: 14px;
          color: #D0D0D0;
          height: 32px;
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 200px;
        }

        .car-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-left: auto;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #424F60;
          padding: 0;
        }

        .action-button:hover {
          color: #EC1C24;
        }

        .action-button:hover svg path {
          stroke: #EC1C24;
        }

        .action-button.small {
          font-size: 12px;
        }

        .add-car-form {
          border-top: 1px solid #E6EDF6;
          padding-top: 20px;
        }

        .form-title {
          font-size: 30px;
          font-weight: 700;
          color: #000814;
          margin: 0 0 20px 0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 400;
          color: #000814;
        }

        .form-input {
          padding: 16px 24px;
          border: 1px solid #D0D0D0;
          border-radius: 4px;
          font-size: 14px;
          color: #000814;
        }

        .form-input:focus {
          outline: none;
          border-color: #EC1C24;
        }

        .form-actions {
          display: flex;
          gap: 30px;
        }

        .btn-primary {
          padding: 14px 20px;
          background: #EC1C24;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary:hover {
          background: #d91920;
        }

        .btn-secondary {
          padding: 14px 20px;
          background: transparent;
          color: #000814;
          border: 1px solid #EC1C24;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-secondary:hover {
          background: #f8f9fa;
        }

        .add-car-btn {
          align-self: flex-start;
        }

        .history-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .history-card {
          background: #F5F8FB;
          border-radius: 8px;
          padding: 12px 20px;
          height: 44px;
          display: flex;
          align-items: center;
        }

        .history-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          gap: 30px;
        }

        .history-meta {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .search-date {
          font-size: 14px;
          color: #424F60;
        }

        @media (max-width: 768px) {
          .profile-layout {
            flex-direction: column;
            gap: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .car-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .car-actions {
            margin-left: 0;
            width: 100%;
            justify-content: space-between;
          }

          .history-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .history-card {
            height: auto;
            padding: 15px 20px;
          }

          .form-actions {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileGaragePage; 