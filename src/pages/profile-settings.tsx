import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import Header from '../components/Header';
import ProfileSidebar from '../components/ProfileSidebar';
import { 
  GET_CLIENT_ME, 
  UPDATE_CLIENT_PERSONAL_DATA, 
  CREATE_CLIENT_LEGAL_ENTITY, 
  UPDATE_CLIENT_LEGAL_ENTITY, 
  DELETE_CLIENT_LEGAL_ENTITY 
} from '../lib/graphql';

interface PersonalData {
  name: string;
  phone: string;
  email: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

interface LegalEntity {
  id: string;
  shortName: string;
  fullName: string;
  form: string;
  legalAddress: string;
  actualAddress?: string;
  taxSystem: string;
  responsiblePhone?: string;
  responsiblePosition?: string;
  responsibleName?: string;
  accountant?: string;
  signatory?: string;
  registrationReasonCode?: string;
  ogrn?: string;
  inn: string;
  vatPercent: number;
}

interface NewLegalEntity {
  shortName: string;
  fullName: string;
  form: string;
  legalAddress: string;
  actualAddress?: string;
  taxSystem: string;
  responsiblePhone?: string;
  responsiblePosition?: string;
  responsibleName?: string;
  accountant?: string;
  signatory?: string;
  registrationReasonCode?: string;
  ogrn?: string;
  inn: string;
  vatPercent?: number;
}

const ProfileSettings: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingEntity, setEditingEntity] = useState<LegalEntity | null>(null);
  const [clientId, setClientId] = useState<string>('');

  const [personalData, setPersonalData] = useState<PersonalData>({
    name: '',
    phone: '',
    email: '',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: false
  });

  const [newEntity, setNewEntity] = useState<NewLegalEntity>({
    shortName: '',
    fullName: '',
    form: '',
    legalAddress: '',
    actualAddress: '',
    taxSystem: '',
    responsiblePhone: '',
    responsiblePosition: '',
    responsibleName: '',
    accountant: '',
    signatory: '',
    registrationReasonCode: '',
    ogrn: '',
    inn: '',
    vatPercent: 0
  });

  // GraphQL запросы и мутации
  const { data: clientData, loading: clientLoading, error: clientError, refetch } = useQuery(GET_CLIENT_ME, {
    skip: !isAuthenticated,
    onCompleted: (data) => {
      console.log('GET_CLIENT_ME onCompleted:', data);
      if (data?.clientMe) {
        setPersonalData({
          name: data.clientMe.name || '',
          phone: data.clientMe.phone || '',
          email: data.clientMe.email || '',
          emailNotifications: data.clientMe.emailNotifications ?? true,
          smsNotifications: data.clientMe.smsNotifications ?? false,
          pushNotifications: data.clientMe.pushNotifications ?? false
        });
      }
    },
    onError: (error) => {
      console.error('GET_CLIENT_ME onError:', error);
    }
  });

  const [updatePersonalData] = useMutation(UPDATE_CLIENT_PERSONAL_DATA);
  const [createLegalEntity] = useMutation(CREATE_CLIENT_LEGAL_ENTITY);
  const [updateLegalEntity] = useMutation(UPDATE_CLIENT_LEGAL_ENTITY);
  const [deleteLegalEntity] = useMutation(DELETE_CLIENT_LEGAL_ENTITY);

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        setIsAuthenticated(true);
        setClientId(user.id);
      } else {
        router.push('/');
        return;
      }
    };

    checkAuth();
  }, [router]);

  const handlePersonalDataChange = (field: keyof PersonalData, value: string | boolean) => {
    setPersonalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewEntityChange = (field: keyof NewLegalEntity, value: string | number) => {
    setNewEntity(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSavePersonalData = async () => {
    try {
      await updatePersonalData({
        variables: {
          input: {
            type: 'INDIVIDUAL', // Добавляем обязательное поле
            name: personalData.name,
            email: personalData.email,
            phone: personalData.phone,
            emailNotifications: personalData.emailNotifications,
            smsNotifications: personalData.smsNotifications,
            pushNotifications: personalData.pushNotifications
          }
        }
      });
      alert('Персональные данные сохранены');
    } catch (error) {
      console.error('Ошибка сохранения данных:', error);
      alert('Ошибка сохранения данных');
    }
  };

  const handleAddEntity = async () => {
    if (!newEntity.shortName || !newEntity.inn) {
      alert('Заполните обязательные поля');
      return;
    }

    try {
      await createLegalEntity({
        variables: {
          input: newEntity
        }
      });
      resetForm();
      setShowAddModal(false);
      refetch();
    } catch (error) {
      console.error('Ошибка создания юр. лица:', error);
      alert('Ошибка создания юридического лица');
    }
  };

  const resetForm = () => {
    setNewEntity({
      shortName: '',
      fullName: '',
      form: '',
      legalAddress: '',
      actualAddress: '',
      taxSystem: '',
      responsiblePhone: '',
      responsiblePosition: '',
      responsibleName: '',
      accountant: '',
      signatory: '',
      registrationReasonCode: '',
      ogrn: '',
      inn: '',
      vatPercent: 0
    });
    setEditingEntity(null);
  };

  const handleDeleteEntity = async (id: string) => {
    if (window.confirm('Удалить юридическое лицо?')) {
      try {
        await deleteLegalEntity({
          variables: { id }
        });
        refetch();
      } catch (error) {
        console.error('Ошибка удаления юр. лица:', error);
        alert('Ошибка удаления юридического лица');
      }
    }
  };

  const handleEditEntity = (entity: LegalEntity) => {
    setEditingEntity(entity);
    setNewEntity({
      shortName: entity.shortName,
      fullName: entity.fullName,
      form: entity.form,
      legalAddress: entity.legalAddress,
      actualAddress: entity.actualAddress || '',
      taxSystem: entity.taxSystem,
      responsiblePhone: entity.responsiblePhone || '',
      responsiblePosition: entity.responsiblePosition || '',
      responsibleName: entity.responsibleName || '',
      accountant: entity.accountant || '',
      signatory: entity.signatory || '',
      registrationReasonCode: entity.registrationReasonCode || '',
      ogrn: entity.ogrn || '',
      inn: entity.inn,
      vatPercent: entity.vatPercent
    });
    setShowAddModal(true);
  };

  const handleUpdateEntity = async () => {
    if (!editingEntity || !newEntity.shortName || !newEntity.inn) {
      alert('Заполните обязательные поля');
      return;
    }

    try {
      await updateLegalEntity({
        variables: {
          id: editingEntity.id,
          input: newEntity
        }
      });
      resetForm();
      setShowAddModal(false);
      refetch();
    } catch (error) {
      console.error('Ошибка обновления юр. лица:', error);
      alert('Ошибка обновления юридического лица');
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  if (clientLoading || !isAuthenticated) {
    return (
      <div className="loading-wrapper">
        <div className="loading-text">Загрузка...</div>
      </div>
    );
  }

  if (clientError) {
    console.error('GraphQL Error:', clientError);
    return (
      <div className="error-wrapper">
        <div className="error-text">Ошибка загрузки данных: {clientError.message}</div>
        <button onClick={() => window.location.reload()}>Перезагрузить</button>
      </div>
    );
  }

  const legalEntities = clientData?.clientMe?.legalEntities || [];

  return (
    <div className="page-wrapper">
      {/* Хлебные крошки */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="breadcrumb-wrapper">
            <span className="breadcrumb-link">Главная</span>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-link">Личный кабинет</span>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-current">Настройки аккаунта</span>
          </div>
          <h1 className="profile-title">
            Настройки аккаунта
          </h1>
        </div>
      </div>

      {/* Основной контент */}
      <div className="profile-section">
        <div className="container">
          <div className="profile-layout">
            <ProfileSidebar activeItem="Настройки" />
            
            <div className="profile-content">
              {/* Персональные данные */}
              <div className="settings-card">
                <h2 className="card-title">
                  Персональные данные
                </h2>
                
                <div className="personal-form">
                  <div className="form-grid">
                    <div className="form-field">
                      <label className="form-label">Имя</label>
                      <input
                        type="text"
                        value={personalData.name}
                        onChange={(e) => handlePersonalDataChange('name', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-field">
                      <label className="form-label">Телефон</label>
                      <input
                        type="tel"
                        value={personalData.phone}
                        onChange={(e) => handlePersonalDataChange('phone', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-field">
                      <label className="form-label">E-mail</label>
                      <input
                        type="email"
                        value={personalData.email}
                        onChange={(e) => handlePersonalDataChange('email', e.target.value)}
                        placeholder="@"
                        className="form-input email-input"
                      />
                    </div>
                  </div>
                  
                  <div className="notification-section">
                    <div className="notification-toggle">
                      <label className="toggle-label">
                        <div className="toggle-container">
                          <input
                            type="checkbox"
                            checked={personalData.emailNotifications}
                            onChange={(e) => handlePersonalDataChange('emailNotifications', e.target.checked)}
                            className="hidden-checkbox"
                          />
                          <div className={`toggle-switch ${personalData.emailNotifications ? 'active' : 'inactive'}`}>
                            <div className={`toggle-knob ${personalData.emailNotifications ? 'active' : 'inactive'}`} />
                          </div>
                        </div>
                        <span className="toggle-text">
                          Получать уведомления по Email
                        </span>
                      </label>
                    </div>
                    
                    <div className="notification-toggle">
                      <label className="toggle-label">
                        <div className="toggle-container">
                          <input
                            type="checkbox"
                            checked={personalData.smsNotifications}
                            onChange={(e) => handlePersonalDataChange('smsNotifications', e.target.checked)}
                            className="hidden-checkbox"
                          />
                          <div className={`toggle-switch ${personalData.smsNotifications ? 'active' : 'inactive'}`}>
                            <div className={`toggle-knob ${personalData.smsNotifications ? 'active' : 'inactive'}`} />
                          </div>
                        </div>
                        <span className="toggle-text">
                          Получать SMS уведомления
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Юридические лица */}
              <div className="settings-card">
                <h2 className="card-title">
                  Юридические лица
                </h2>
                
                {legalEntities.length > 0 ? (
                  <div className="legal-entities">
                    {legalEntities.map((entity: LegalEntity) => (
                      <div key={entity.id} className="entity-card">
                        <div className="entity-header">
                          <div className="entity-info">
                            <div>
                              <h3>{entity.shortName}</h3>
                              <p>ИНН {entity.inn}</p>
                              
                              <div className="entity-actions">
                                <button className="entity-link">
                                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                                    <path d="M2 3H14M2 7H14M2 11H14" stroke="currentColor" strokeWidth="1.5"/>
                                  </svg>
                                  Реквизиты компании
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="entity-controls">
                            <button 
                              onClick={() => handleEditEntity(entity)}
                              className="control-button"
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 10L10 2L12 4L4 12H2V10Z" stroke="currentColor" strokeWidth="1.5"/>
                              </svg>
                              Редактировать
                            </button>
                            
                            <button 
                              onClick={() => handleDeleteEntity(entity.id)}
                              className="control-button"
                            >
                              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                                <path d="M1 4H13M5 1H9M5 7V13M9 7V13" stroke="currentColor" strokeWidth="1.5"/>
                              </svg>
                              Удалить
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>У вас пока нет добавленных юридических лиц</p>
                  </div>
                )}
              </div>

              {/* Кнопки управления */}
              <div className="action-buttons">
                <button
                  onClick={handleSavePersonalData}
                  className="btn-primary"
                >
                  Сохранить изменения
                </button>
                
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn-secondary"
                >
                  Добавить юридическое лицо
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">
              {editingEntity ? 'Редактирование юридического лица' : 'Добавление юридического лица'}
            </h2>
            
            <div className="modal-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">ИНН *</label>
                  <input
                    type="text"
                    value={newEntity.inn}
                    onChange={(e) => handleNewEntityChange('inn', e.target.value)}
                    placeholder="ИНН"
                    className="form-input"
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">Краткое наименование *</label>
                  <input
                    type="text"
                    value={newEntity.shortName}
                    onChange={(e) => handleNewEntityChange('shortName', e.target.value)}
                    placeholder="Название компании"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Форма</label>
                  <select
                    value={newEntity.form}
                    onChange={(e) => handleNewEntityChange('form', e.target.value)}
                    className="select-input"
                  >
                    <option value="">Выбрать</option>
                    <option value="ООО">ООО</option>
                    <option value="ИП">ИП</option>
                    <option value="АО">АО</option>
                    <option value="ЗАО">ЗАО</option>
                  </select>
                </div>
                
                <div className="form-field">
                  <label className="form-label">ОГРН</label>
                  <input
                    type="text"
                    value={newEntity.ogrn}
                    onChange={(e) => handleNewEntityChange('ogrn', e.target.value)}
                    placeholder="ОГРН"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Юридический адрес</label>
                  <input
                    type="text"
                    value={newEntity.legalAddress}
                    onChange={(e) => handleNewEntityChange('legalAddress', e.target.value)}
                    placeholder="Юридический адрес"
                    className="form-input"
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">Полное наименование</label>
                  <input
                    type="text"
                    value={newEntity.fullName}
                    onChange={(e) => handleNewEntityChange('fullName', e.target.value)}
                    placeholder="Полное наименование"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Фактический адрес</label>
                  <input
                    type="text"
                    value={newEntity.actualAddress}
                    onChange={(e) => handleNewEntityChange('actualAddress', e.target.value)}
                    placeholder="Фактический адрес"
                    className="form-input"
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">Система налогообложения</label>
                  <select
                    value={newEntity.taxSystem}
                    onChange={(e) => handleNewEntityChange('taxSystem', e.target.value)}
                    className="select-input"
                  >
                    <option value="">Выбрать</option>
                    <option value="УСН">УСН</option>
                    <option value="ОСНО">ОСНО</option>
                    <option value="ЕНВД">ЕНВД</option>
                    <option value="ПСН">ПСН</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">НДС %</label>
                  <input
                    type="number"
                    value={newEntity.vatPercent}
                    onChange={(e) => handleNewEntityChange('vatPercent', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="form-input"
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">Бухгалтер</label>
                  <input
                    type="text"
                    value={newEntity.accountant}
                    onChange={(e) => handleNewEntityChange('accountant', e.target.value)}
                    placeholder="ФИО"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Ответственный</label>
                  <input
                    type="text"
                    value={newEntity.responsibleName}
                    onChange={(e) => handleNewEntityChange('responsibleName', e.target.value)}
                    placeholder="ФИО"
                    className="form-input"
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">Должность ответственного</label>
                  <input
                    type="text"
                    value={newEntity.responsiblePosition}
                    onChange={(e) => handleNewEntityChange('responsiblePosition', e.target.value)}
                    placeholder="Должность"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Телефон ответственного</label>
                  <input
                    type="tel"
                    value={newEntity.responsiblePhone}
                    onChange={(e) => handleNewEntityChange('responsiblePhone', e.target.value)}
                    placeholder="+7"
                    className="form-input"
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">Подписант</label>
                  <input
                    type="text"
                    value={newEntity.signatory}
                    onChange={(e) => handleNewEntityChange('signatory', e.target.value)}
                    placeholder="ФИО"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="modal-buttons">
                <button
                  onClick={editingEntity ? handleUpdateEntity : handleAddEntity}
                  className="btn-primary"
                >
                  {editingEntity ? 'Сохранить' : 'Добавить'}
                </button>
                
                <button
                  onClick={closeModal}
                  className="btn-secondary"
                >
                  Отменить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
          cursor: pointer;
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

        .settings-card {
          background: white;
          border-radius: 16px;
          padding: 30px;
        }

        .card-title {
          font-size: 30px;
          font-weight: 700;
          color: #000814;
          margin: 0 0 30px 0;
          line-height: 1;
        }

        .personal-form {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 14px;
          color: #000814;
          font-weight: 400;
        }

        .form-input {
          border: 1px solid #D0D0D0;
          border-radius: 4px;
          padding: 16px 24px;
          font-size: 14px;
          color: #424F60;
          font-family: 'Onest', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: #EC1C24;
        }

        .email-input::placeholder {
          color: #747474;
        }

        .notification-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .notification-toggle {
          display: flex;
          align-items: center;
        }

        .toggle-label {
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
        }

        .toggle-container {
          position: relative;
        }

        .hidden-checkbox {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .toggle-switch {
          width: 36px;
          height: 20px;
          border-radius: 10px;
          position: relative;
          transition: background-color 0.2s;
        }

        .toggle-switch.active {
          background-color: #000814;
        }

        .toggle-switch.inactive {
          background-color: #D0D0D0;
        }

        .toggle-knob {
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          transition: transform 0.2s;
        }

        .toggle-knob.active {
          transform: translateX(18px);
        }

        .toggle-knob.inactive {
          transform: translateX(2px);
        }

        .toggle-text {
          font-size: 16px;
          color: #424F60;
        }

        .legal-entities {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .entity-card {
          background: #F5F8FB;
          border-radius: 8px;
          padding: 12px 20px;
        }

        .entity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .entity-info h3 {
          font-size: 20px;
          font-weight: 700;
          color: #000814;
          margin: 0;
          line-height: 1.2;
        }

        .entity-info p {
          font-size: 14px;
          color: #424F60;
          margin: 4px 0 8px 0;
        }

        .entity-actions {
          display: flex;
          gap: 20px;
        }

        .entity-link {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: #424F60;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        .entity-link:hover {
          color: #EC1C24;
        }

        .entity-controls {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-right: 10px;
        }

        .control-button {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: #424F60;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        .control-button:hover {
          color: #EC1C24;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
        }

        .empty-state p {
          font-size: 16px;
          color: #8E9AAC;
          margin: 0;
        }

        .action-buttons {
          background: white;
          border-radius: 16px;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          transition: background-color 0.2s;
        }

        .btn-primary:hover {
          background: #d91920;
        }

        .btn-secondary {
          background: transparent;
          color: #000814;
          border: 1px solid #EC1C24;
          border-radius: 12px;
          padding: 14px 20px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: #EC1C24;
          color: white;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 30px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-title {
          font-size: 30px;
          font-weight: 700;
          color: #000814;
          margin: 0 0 30px 0;
          line-height: 1;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .select-input {
          border: 1px solid #D0D0D0;
          border-radius: 4px;
          padding: 16px 24px;
          font-size: 14px;
          color: #747474;
          font-family: 'Onest', sans-serif;
          background: white;
          outline: none;
          transition: border-color 0.2s;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23747474' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 12px center;
          background-repeat: no-repeat;
          background-size: 16px;
          appearance: none;
        }

        .select-input:focus {
          border-color: #EC1C24;
        }

        .modal-buttons {
          display: flex;
          gap: 30px;
          padding-top: 20px;
        }

        .loading-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-text {
          font-size: 18px;
          color: #000814;
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 20px;
          }

          .profile-layout {
            flex-direction: column;
            gap: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .entity-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .entity-controls {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding-right: 0;
          }

          .action-buttons {
            flex-direction: column;
            gap: 15px;
          }

          .modal-buttons {
            flex-direction: column;
            gap: 15px;
          }

          .breadcrumb-wrapper {
            flex-wrap: wrap;
          }

          .profile-title {
            font-size: 28px;
          }

          .settings-card {
            padding: 20px;
          }

          .modal-content {
            padding: 20px;
            margin: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileSettings; 