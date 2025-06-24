import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import Header from '../components/Header';
import ProfileSidebar from '../components/ProfileSidebar';
import { 
  GET_CLIENT_ME, 
  CREATE_CLIENT_LEGAL_ENTITY, 
  UPDATE_CLIENT_LEGAL_ENTITY, 
  DELETE_CLIENT_LEGAL_ENTITY,
  CREATE_CLIENT_BANK_DETAILS,
  UPDATE_CLIENT_BANK_DETAILS,
  DELETE_CLIENT_BANK_DETAILS
} from '../lib/graphql';

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
  bankDetails?: BankDetail[];
}

interface BankDetail {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  bik: string;
  correspondentAccount: string;
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
  vatPercent: number;
}

interface NewBankDetail {
  name: string;
  accountNumber: string;
  bankName: string;
  bik: string;
  correspondentAccount: string;
}

const ProfileRequisites: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showBankModal, setShowBankModal] = useState<boolean>(false);
  const [editingEntity, setEditingEntity] = useState<LegalEntity | null>(null);
  const [editingBankDetail, setEditingBankDetail] = useState<BankDetail | null>(null);
  const [selectedLegalEntityId, setSelectedLegalEntityId] = useState<string>('');
  const [legalEntities, setLegalEntities] = useState<LegalEntity[]>([]);

  const [newEntity, setNewEntity] = useState<NewLegalEntity>({
    shortName: '',
    fullName: '',
    form: 'ООО',
    legalAddress: '',
    actualAddress: '',
    taxSystem: 'УСН',
    responsiblePhone: '',
    responsiblePosition: '',
    responsibleName: '',
    accountant: '',
    signatory: '',
    registrationReasonCode: '',
    ogrn: '',
    inn: '',
    vatPercent: 20
  });

  const [newBankDetail, setNewBankDetail] = useState<NewBankDetail>({
    name: '',
    accountNumber: '',
    bankName: '',
    bik: '',
    correspondentAccount: ''
  });

  // GraphQL запросы и мутации
  const { data: clientData, loading: clientLoading, error: clientError, refetch } = useQuery(GET_CLIENT_ME, {
    skip: !isAuthenticated,
    onCompleted: (data) => {
      console.log('GET_CLIENT_ME onCompleted:', data);
      if (data?.clientMe?.legalEntities) {
        setLegalEntities(data.clientMe.legalEntities);
        console.log('Юридические лица загружены:', data.clientMe.legalEntities);
      }
    },
    onError: (error) => {
      console.error('GET_CLIENT_ME onError:', error);
      console.error('Детали ошибки GET_CLIENT_ME:', JSON.stringify(error, null, 2));
    }
  });

  const [createLegalEntity] = useMutation(CREATE_CLIENT_LEGAL_ENTITY);
  const [updateLegalEntity] = useMutation(UPDATE_CLIENT_LEGAL_ENTITY);
  const [deleteLegalEntity] = useMutation(DELETE_CLIENT_LEGAL_ENTITY);
  const [createBankDetails] = useMutation(CREATE_CLIENT_BANK_DETAILS);
  const [updateBankDetails] = useMutation(UPDATE_CLIENT_BANK_DETAILS);
  const [deleteBankDetails] = useMutation(DELETE_CLIENT_BANK_DETAILS);

  // Проверка авторизации
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    console.log('ProfileRequisites: проверяем userData в localStorage:', userData);
    
    if (!userData) {
      console.log('ProfileRequisites: userData не найден, перенаправляем на главную');
      router.push('/');
      return;
    }
    try {
      const user = JSON.parse(userData);
      console.log('ProfileRequisites: parsed user data:', user);
      
      if (!user.id) {
        console.log('ProfileRequisites: user.id не найден, перенаправляем на главную');
        router.push('/');
        return;
      }
      
      console.log('ProfileRequisites: авторизация успешна, user.id:', user.id);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('ProfileRequisites: ошибка парсинга userData:', error);
      router.push('/');
    }
  }, [router]);

  // Обработчики для юридических лиц
  const handleAddEntity = () => {
    setEditingEntity(null);
    setNewEntity({
      shortName: '',
      fullName: '',
      form: 'ООО',
      legalAddress: '',
      actualAddress: '',
      taxSystem: 'УСН',
      responsiblePhone: '',
      responsiblePosition: '',
      responsibleName: '',
      accountant: '',
      signatory: '',
      registrationReasonCode: '',
      ogrn: '',
      inn: '',
      vatPercent: 20
    });
    setShowAddModal(true);
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

  const handleSaveEntity = async () => {
    try {
      console.log('handleSaveEntity: начало сохранения', { editingEntity, newEntity });
      
      if (editingEntity) {
        // Обновление существующего юр. лица
        console.log('handleSaveEntity: обновление юр. лица', editingEntity.id);
        const { data } = await updateLegalEntity({
          variables: {
            id: editingEntity.id,
            input: newEntity
          }
        });
        
        console.log('handleSaveEntity: результат обновления', data);
        
        if (data?.updateClientLegalEntity) {
          setLegalEntities(prev => 
            prev.map(entity => 
              entity.id === editingEntity.id ? data.updateClientLegalEntity : entity
            )
          );
        }
      } else {
        // Создание нового юр. лица
        console.log('handleSaveEntity: создание нового юр. лица');
        const { data } = await createLegalEntity({
          variables: {
            input: newEntity
          }
        });
        
        console.log('handleSaveEntity: результат создания', data);
        
        if (data?.createClientLegalEntityMe) {
          setLegalEntities(prev => [...prev, data.createClientLegalEntityMe]);
        }
      }
      
      setShowAddModal(false);
      setEditingEntity(null);
    } catch (error) {
      console.error('Ошибка сохранения юридического лица:', error);
      console.error('Детали ошибки:', JSON.stringify(error, null, 2));
      alert('Ошибка при сохранении данных: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    }
  };

  const handleDeleteEntity = async (entityId: string) => {
    if (!confirm('Вы уверены, что хотите удалить это юридическое лицо?')) {
      return;
    }

    try {
      await deleteLegalEntity({
        variables: { id: entityId }
      });
      
      setLegalEntities(prev => prev.filter(entity => entity.id !== entityId));
    } catch (error) {
      console.error('Ошибка удаления юридического лица:', error);
      alert('Ошибка при удалении');
    }
  };

  // Обработчики для банковских реквизитов
  const handleAddBankDetail = (legalEntityId: string) => {
    setSelectedLegalEntityId(legalEntityId);
    setEditingBankDetail(null);
    setNewBankDetail({
      name: '',
      accountNumber: '',
      bankName: '',
      bik: '',
      correspondentAccount: ''
    });
    setShowBankModal(true);
  };

  const handleEditBankDetail = (bankDetail: BankDetail, legalEntityId: string) => {
    setSelectedLegalEntityId(legalEntityId);
    setEditingBankDetail(bankDetail);
    setNewBankDetail({
      name: bankDetail.name,
      accountNumber: bankDetail.accountNumber,
      bankName: bankDetail.bankName,
      bik: bankDetail.bik,
      correspondentAccount: bankDetail.correspondentAccount
    });
    setShowBankModal(true);
  };

  const handleSaveBankDetail = async () => {
    try {
      if (editingBankDetail) {
        // Обновление существующих банковских реквизитов
        const { data } = await updateBankDetails({
          variables: {
            id: editingBankDetail.id,
            input: newBankDetail
          }
        });
        
        if (data?.updateClientBankDetails) {
          // Обновляем локальное состояние
          setLegalEntities(prev => 
            prev.map(entity => 
              entity.id === selectedLegalEntityId 
                ? {
                    ...entity,
                    bankDetails: entity.bankDetails?.map(bd => 
                      bd.id === editingBankDetail.id ? data.updateClientBankDetails : bd
                    ) || []
                  }
                : entity
            )
          );
        }
      } else {
        // Создание новых банковских реквизитов
        const { data } = await createBankDetails({
          variables: {
            legalEntityId: selectedLegalEntityId,
            input: newBankDetail
          }
        });
        
        if (data?.createClientBankDetails) {
          // Добавляем новые реквизиты к соответствующему юр. лицу
          setLegalEntities(prev => 
            prev.map(entity => 
              entity.id === selectedLegalEntityId 
                ? {
                    ...entity,
                    bankDetails: [...(entity.bankDetails || []), data.createClientBankDetails]
                  }
                : entity
            )
          );
        }
      }
      
      setShowBankModal(false);
      setEditingBankDetail(null);
      setSelectedLegalEntityId('');
    } catch (error) {
      console.error('Ошибка сохранения банковских реквизитов:', error);
      alert('Ошибка при сохранении данных');
    }
  };

  const handleDeleteBankDetail = async (bankDetailId: string, legalEntityId: string) => {
    if (!confirm('Вы уверены, что хотите удалить эти банковские реквизиты?')) {
      return;
    }

    try {
      await deleteBankDetails({
        variables: { id: bankDetailId }
      });
      
      // Удаляем банковские реквизиты из локального состояния
      setLegalEntities(prev => 
        prev.map(entity => 
          entity.id === legalEntityId 
            ? {
                ...entity,
                bankDetails: entity.bankDetails?.filter(bd => bd.id !== bankDetailId) || []
              }
            : entity
        )
      );
    } catch (error) {
      console.error('Ошибка удаления банковских реквизитов:', error);
      alert('Ошибка при удалении');
    }
  };

  const handleInputChange = (field: keyof NewLegalEntity, value: string | number) => {
    setNewEntity(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBankInputChange = (field: keyof NewBankDetail, value: string) => {
    setNewBankDetail(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isAuthenticated) {
    return null;
  }

  if (clientLoading) {
    return (
      <div className="loading-wrapper">
        <div className="loading-text">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      
      {/* Хлебные крошки */}
      <section className="breadcrumbs">
        <div className="container">
          <div className="breadcrumb-wrapper">
            <a href="/" className="breadcrumb-link">Главная</a>
            <span className="breadcrumb-separator">→</span>
            <a href="/profile-settings" className="breadcrumb-link">Личный кабинет</a>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-current">Реквизиты</span>
          </div>
          <h1 className="profile-title">Реквизиты</h1>
        </div>
      </section>

      {/* Основной контент */}
      <section className="profile-section">
        <div className="container">
          <div className="profile-layout">
            <ProfileSidebar activeItem="requisites" />
            
            <div className="profile-content">
              {/* Заголовок и кнопка добавления */}
              <div className="requisites-header">
                <div className="header-content">
                  <h2 className="section-title">Юридические лица</h2>
                  <p className="section-description">
                    Управляйте информацией о ваших юридических лицах и банковских реквизитах
                  </p>
                </div>
                <button 
                  onClick={handleAddEntity}
                  className="btn-add"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Добавить юр. лицо
                </button>
              </div>

              {/* Список юридических лиц */}
              <div className="requisites-list">
                {legalEntities.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="8" y="16" width="48" height="32" rx="4" stroke="#D0D0D0" strokeWidth="2"/>
                        <path d="M16 24H48M16 32H40M16 40H32" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <h3 className="empty-title">Нет добавленных юридических лиц</h3>
                    <p className="empty-description">
                      Добавьте информацию о ваших юридических лицах для оформления документов
                    </p>
                    <button 
                      onClick={handleAddEntity}
                      className="btn-primary"
                    >
                      Добавить первое юр. лицо
                    </button>
                  </div>
                ) : (
                  legalEntities.map((entity) => (
                    <div key={entity.id} className="entity-card">
                      <div className="entity-main">
                        <div className="entity-info">
                          <h3 className="entity-name">{entity.shortName}</h3>
                          <p className="entity-full-name">{entity.fullName}</p>
                          <div className="entity-details">
                            <span className="entity-detail">
                              <strong>ИНН:</strong> {entity.inn}
                            </span>
                            <span className="entity-detail">
                              <strong>Форма:</strong> {entity.form}
                            </span>
                            <span className="entity-detail">
                              <strong>Налоговая система:</strong> {entity.taxSystem}
                            </span>
                          </div>
                          <p className="entity-address">
                            <strong>Юридический адрес:</strong> {entity.legalAddress}
                          </p>
                        </div>
                        <div className="entity-actions">
                          <button 
                            onClick={() => handleEditEntity(entity)}
                            className="action-btn edit-btn"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.334 2.00004C11.5091 1.82494 11.7169 1.68605 11.9457 1.59129C12.1745 1.49653 12.4197 1.44775 12.6673 1.44775C12.9149 1.44775 13.1601 1.49653 13.3889 1.59129C13.6177 1.68605 13.8255 1.82494 14.0007 2.00004C14.1758 2.17513 14.3147 2.383 14.4094 2.61178C14.5042 2.84055 14.553 3.08575 14.553 3.33337C14.553 3.58099 14.5042 3.82619 14.4094 4.05497C14.3147 4.28374 14.1758 4.49161 14.0007 4.66671L5.00065 13.6667L1.33398 14.6667L2.33398 11L11.334 2.00004Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Редактировать
                          </button>
                          <button 
                            onClick={() => handleDeleteEntity(entity.id)}
                            className="action-btn delete-btn"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 4H14M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31304 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2.31304 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31304 1.33333 6.66667 1.33333H9.33333C9.687 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31304 10.6667 2.66667V4" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M6.66699 7.33337V11.3334M9.33366 7.33337V11.3334" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Удалить
                          </button>
                        </div>
                      </div>
                      
                      {/* Банковские реквизиты */}
                      <div className="bank-details">
                        <div className="bank-details-header">
                          <h4 className="bank-details-title">Банковские реквизиты</h4>
                          <button 
                            onClick={() => handleAddBankDetail(entity.id)}
                            className="btn-add small"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 3.2V12.8M3.2 8H12.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Добавить реквизиты
                          </button>
                        </div>
                        
                        {entity.bankDetails && entity.bankDetails.length > 0 ? (
                          <div className="bank-details-list">
                            {entity.bankDetails.map((bankDetail) => (
                              <div key={bankDetail.id} className="bank-detail-item">
                                <div className="bank-info">
                                  <p className="bank-name">{bankDetail.name}</p>
                                  <p className="bank-account">Р/с: {bankDetail.accountNumber}</p>
                                  <p className="bank-bik">БИК: {bankDetail.bik}</p>
                                  <p className="bank-correspondent">К/с: {bankDetail.correspondentAccount}</p>
                                  <p className="bank-bank-name">Банк: {bankDetail.bankName}</p>
                                </div>
                                <div className="bank-actions">
                                  <button 
                                    onClick={() => handleEditBankDetail(bankDetail, entity.id)}
                                    className="action-btn edit-btn"
                                  >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M11.334 2.00004C11.5091 1.82494 11.7169 1.68605 11.9457 1.59129C12.1745 1.49653 12.4197 1.44775 12.6673 1.44775C12.9149 1.44775 13.1601 1.49653 13.3889 1.59129C13.6177 1.68605 13.8255 1.82494 14.0007 2.00004C14.1758 2.17513 14.3147 2.383 14.4094 2.61178C14.5042 2.84055 14.553 3.08575 14.553 3.33337C14.553 3.58099 14.5042 3.82619 14.4094 4.05497C14.3147 4.28374 14.1758 4.49161 14.0007 4.66671L5.00065 13.6667L1.33398 14.6667L2.33398 11L11.334 2.00004Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Редактировать
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteBankDetail(bankDetail.id, entity.id)}
                                    className="action-btn delete-btn"
                                  >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M2 4H14M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31304 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2.31304 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31304 1.33333 6.66667 1.33333H9.33333C9.687 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31304 10.6667 2.66667V4" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M6.66699 7.33337V11.3334M9.33366 7.33337V11.3334" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Удалить
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bank-details-empty">
                            <p className="empty-text">Банковские реквизиты не добавлены</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно добавления/редактирования */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingEntity ? 'Редактировать юридическое лицо' : 'Добавить юридическое лицо'}
              </h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="modal-close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Краткое наименование *</label>
                  <input
                    type="text"
                    value={newEntity.shortName}
                    onChange={(e) => handleInputChange('shortName', e.target.value)}
                    className="form-input"
                    placeholder="ООО «Компания»"
                    required
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">Форма *</label>
                  <select
                    value={newEntity.form}
                    onChange={(e) => handleInputChange('form', e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="ООО">ООО</option>
                    <option value="ИП">ИП</option>
                    <option value="АО">АО</option>
                    <option value="ПАО">ПАО</option>
                    <option value="ЗАО">ЗАО</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Полное наименование *</label>
                <input
                  type="text"
                  value={newEntity.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="form-input"
                  placeholder="Общество с ограниченной ответственностью «Компания»"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">ИНН *</label>
                  <input
                    type="text"
                    value={newEntity.inn}
                    onChange={(e) => handleInputChange('inn', e.target.value)}
                    className="form-input"
                    placeholder="1234567890"
                    required
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">ОГРН</label>
                  <input
                    type="text"
                    value={newEntity.ogrn}
                    onChange={(e) => handleInputChange('ogrn', e.target.value)}
                    className="form-input"
                    placeholder="1234567890123"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Юридический адрес *</label>
                <input
                  type="text"
                  value={newEntity.legalAddress}
                  onChange={(e) => handleInputChange('legalAddress', e.target.value)}
                  className="form-input"
                  placeholder="г. Москва, ул. Примерная, д. 1"
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">Фактический адрес</label>
                <input
                  type="text"
                  value={newEntity.actualAddress}
                  onChange={(e) => handleInputChange('actualAddress', e.target.value)}
                  className="form-input"
                  placeholder="г. Москва, ул. Примерная, д. 1"
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Налоговая система *</label>
                  <select
                    value={newEntity.taxSystem}
                    onChange={(e) => handleInputChange('taxSystem', e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="УСН">УСН</option>
                    <option value="ОСНО">ОСНО</option>
                    <option value="ЕНВД">ЕНВД</option>
                    <option value="ПСН">ПСН</option>
                  </select>
                </div>
                
                <div className="form-field">
                  <label className="form-label">НДС (%)</label>
                  <input
                    type="number"
                    value={newEntity.vatPercent}
                    onChange={(e) => handleInputChange('vatPercent', Number(e.target.value))}
                    className="form-input"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">ФИО ответственного</label>
                  <input
                    type="text"
                    value={newEntity.responsibleName}
                    onChange={(e) => handleInputChange('responsibleName', e.target.value)}
                    className="form-input"
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">Должность ответственного</label>
                  <input
                    type="text"
                    value={newEntity.responsiblePosition}
                    onChange={(e) => handleInputChange('responsiblePosition', e.target.value)}
                    className="form-input"
                    placeholder="Генеральный директор"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Телефон ответственного</label>
                  <input
                    type="tel"
                    value={newEntity.responsiblePhone}
                    onChange={(e) => handleInputChange('responsiblePhone', e.target.value)}
                    className="form-input"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">Бухгалтер</label>
                  <input
                    type="text"
                    value={newEntity.accountant}
                    onChange={(e) => handleInputChange('accountant', e.target.value)}
                    className="form-input"
                    placeholder="Петрова Анна Сергеевна"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Подписант</label>
                  <input
                    type="text"
                    value={newEntity.signatory}
                    onChange={(e) => handleInputChange('signatory', e.target.value)}
                    className="form-input"
                    placeholder="Иванов И.И."
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">КПП</label>
                  <input
                    type="text"
                    value={newEntity.registrationReasonCode}
                    onChange={(e) => handleInputChange('registrationReasonCode', e.target.value)}
                    className="form-input"
                    placeholder="123456789"
                  />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                onClick={() => setShowAddModal(false)}
                className="btn-secondary"
              >
                Отмена
              </button>
              <button 
                onClick={handleSaveEntity}
                className="btn-primary"
              >
                {editingEntity ? 'Сохранить изменения' : 'Добавить юр. лицо'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно добавления/редактирования банковских реквизитов */}
      {showBankModal && (
        <div className="modal-overlay" onClick={() => setShowBankModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingBankDetail ? 'Редактировать банковские реквизиты' : 'Добавить банковские реквизиты'}
              </h2>
              <button 
                onClick={() => setShowBankModal(false)}
                className="modal-close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
                         <div className="modal-form">
               <div className="form-row">
                 <div className="form-field">
                   <label className="form-label">Название счета *</label>
                   <input
                     type="text"
                     value={newBankDetail.name}
                     onChange={(e) => handleBankInputChange('name', e.target.value)}
                     className="form-input"
                     placeholder="Расчетный счет"
                     required
                   />
                 </div>
                 
                 <div className="form-field">
                   <label className="form-label">№ Расчетного счета *</label>
                   <input
                     type="text"
                     value={newBankDetail.accountNumber}
                     onChange={(e) => handleBankInputChange('accountNumber', e.target.value)}
                     className="form-input"
                     placeholder="40702810000000000000"
                     required
                   />
                 </div>
               </div>

               <div className="form-row">
                 <div className="form-field">
                   <label className="form-label">БИК *</label>
                   <input
                     type="text"
                     value={newBankDetail.bik}
                     onChange={(e) => handleBankInputChange('bik', e.target.value)}
                     className="form-input"
                     placeholder="044525225"
                     required
                   />
                 </div>
                 
                 <div className="form-field">
                   <label className="form-label">Наименование банка *</label>
                   <input
                     type="text"
                     value={newBankDetail.bankName}
                     onChange={(e) => handleBankInputChange('bankName', e.target.value)}
                     className="form-input"
                     placeholder="ПАО СБЕРБАНК"
                     required
                   />
                 </div>
               </div>

               <div className="form-field">
                 <label className="form-label">Корреспондентский счет *</label>
                 <input
                   type="text"
                   value={newBankDetail.correspondentAccount}
                   onChange={(e) => handleBankInputChange('correspondentAccount', e.target.value)}
                   className="form-input"
                   placeholder="30101810400000000225"
                   required
                 />
               </div>
             </div>

            <div className="modal-actions">
              <button 
                onClick={() => setShowBankModal(false)}
                className="btn-secondary"
              >
                Отмена
              </button>
              <button 
                onClick={handleSaveBankDetail}
                className="btn-primary"
              >
                {editingBankDetail ? 'Сохранить изменения' : 'Добавить реквизиты'}
              </button>
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

        .requisites-header {
          background: white;
          border-radius: 16px;
          padding: 30px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 30px;
        }

        .header-content {
          flex: 1;
        }

        .section-title {
          font-size: 30px;
          font-weight: 700;
          color: #000814;
          margin: 0 0 8px 0;
          line-height: 1.2;
        }

        .section-description {
          font-size: 16px;
          color: #8E9AAC;
          margin: 0;
          line-height: 1.4;
        }

        .btn-add {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #EC1C24;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 14px 20px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
          white-space: nowrap;
        }

        .btn-add:hover {
          background: #d91920;
        }

        .requisites-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .empty-state {
          background: white;
          border-radius: 16px;
          padding: 60px 30px;
          text-align: center;
        }

        .empty-icon {
          margin: 0 auto 24px;
          width: 64px;
          height: 64px;
        }

        .empty-title {
          font-size: 24px;
          font-weight: 600;
          color: #000814;
          margin: 0 0 8px 0;
        }

        .empty-description {
          font-size: 16px;
          color: #8E9AAC;
          margin: 0 0 32px 0;
          line-height: 1.4;
        }

        .btn-primary {
          background: #EC1C24;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 14px 24px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-primary:hover {
          background: #d91920;
        }

        .entity-card {
          background: white;
          border-radius: 16px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .entity-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 30px;
        }

        .entity-info {
          flex: 1;
        }

        .entity-name {
          font-size: 24px;
          font-weight: 700;
          color: #000814;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }

        .entity-full-name {
          font-size: 16px;
          color: #424F60;
          margin: 0 0 16px 0;
          line-height: 1.4;
        }

        .entity-details {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 12px;
        }

        .entity-detail {
          font-size: 14px;
          color: #424F60;
        }

        .entity-detail strong {
          color: #000814;
        }

        .entity-address {
          font-size: 14px;
          color: #424F60;
          margin: 0;
          line-height: 1.4;
        }

        .entity-address strong {
          color: #000814;
        }

        .entity-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-end;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: 1px solid #D0D0D0;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .edit-btn {
          color: #424F60;
        }

        .edit-btn:hover {
          border-color: #EC1C24;
          color: #EC1C24;
        }

        .delete-btn {
          color: #DC2626;
          border-color: #DC2626;
        }

        .delete-btn:hover {
          background: #DC2626;
          color: white;
        }

        .bank-details {
          border-top: 1px solid #E6EDF6;
          padding-top: 24px;
        }

        .bank-details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .bank-details-title {
          font-size: 18px;
          font-weight: 600;
          color: #000814;
          margin: 0;
        }

        .btn-add.small {
          padding: 8px 12px;
          font-size: 14px;
          gap: 6px;
        }

        .bank-details-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bank-details-empty {
          padding: 20px;
          text-align: center;
          background: #F5F8FB;
          border-radius: 8px;
          border: 1px dashed #D0D0D0;
        }

        .empty-text {
          font-size: 14px;
          color: #8E9AAC;
          margin: 0;
        }

        .bank-detail-item {
          background: #F5F8FB;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }

        .bank-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .bank-info p {
          margin: 0;
          font-size: 14px;
          color: #424F60;
        }

        .bank-name {
          font-weight: 600;
          color: #000814 !important;
          font-size: 16px !important;
        }

        .bank-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
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
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 30px 0;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #000814;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #8E9AAC;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }

        .modal-close:hover {
          color: #424F60;
        }

        .modal-form {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
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
          font-weight: 500;
        }

        .form-input,
        .form-select {
          border: 1px solid #D0D0D0;
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 14px;
          color: #424F60;
          font-family: 'Onest', sans-serif;
          outline: none;
          transition: border-color 0.2s;
          background: white;
        }

        .form-input:focus,
        .form-select:focus {
          border-color: #EC1C24;
        }

        .form-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23424F60' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 12px center;
          background-repeat: no-repeat;
          background-size: 16px;
          appearance: none;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding: 0 30px 30px;
          border-top: 1px solid #E6EDF6;
          margin-top: 20px;
          padding-top: 20px;
        }

        .btn-secondary {
          background: transparent;
          color: #424F60;
          border: 1px solid #D0D0D0;
          border-radius: 8px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          border-color: #424F60;
          color: #000814;
        }

        .loading-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #F5F8FB;
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

          .requisites-header {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }

          .entity-main {
            flex-direction: column;
            gap: 20px;
          }

          .entity-actions {
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .modal-content {
            margin: 10px;
          }

          .modal-header,
          .modal-form,
          .modal-actions {
            padding-left: 20px;
            padding-right: 20px;
          }

          .modal-actions {
            flex-direction: column;
          }

          .profile-title {
            font-size: 28px;
          }

          .section-title {
            font-size: 24px;
          }

          .entity-name {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileRequisites;