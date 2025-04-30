'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  LegalEntityForm,
  type LegalEntityFormHandles,
} from './LegalEntityForm';

interface LegalEntity {
  id: string;
  shortName: string;
  fullName: string | null;
  form: string | null;
  inn: string;
  kpp: string | null;
  ogrn: string | null;
  responsibleName: string | null;
  responsiblePhone: string | null;
}

interface LegalEntitiesListProps {
  clientId: string;
}

export function LegalEntitiesList({ clientId }: LegalEntitiesListProps) {
  const [legalEntities, setLegalEntities] = useState<LegalEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [primaryEntityId, setPrimaryEntityId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEntity, setEditingEntity] = useState<LegalEntity | null>(null);
  const legalEntityFormRef = useRef<LegalEntityFormHandles>(null);

  // Обертываем fetchLegalEntities в useCallback
  const fetchLegalEntities = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const authToken = localStorage.getItem('auth_token');
      if (!authToken) {
        setError('Необходима авторизация для получения данных');
        return;
      }

      // Определяем базовый URL API
      const baseApiUrl =
        process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000';

      // Запрашиваем юридические лица клиента
      const response = await fetch(
        `${baseApiUrl}/api/clients/${clientId}/legal-entity`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Получены юр.лица:', data);
        setLegalEntities(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.map((entity: any) => ({
            id: entity.id,
            inn: entity.inn || '',
            form: entity.form || '',
            ogrn: entity.ogrn || '',
            kpp: entity.kpp || '',
            shortName: entity.name || entity.shortName || 'Без названия',
            fullName: entity.fullName || '',
            responsibleName: entity.responsibleName || '',
            responsiblePhone: entity.responsiblePhone || '',
          }))
        );

        // Проверяем, есть ли основное юр. лицо
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const primaryEntity = data.find((entity: any) => entity.isPrimary);
        if (primaryEntity) {
          setPrimaryEntityId(primaryEntity.id);
        } else if (data.length > 0) {
          // Если нет основного, но есть юр. лица, устанавливаем первое как основное
          setPrimaryEntityId(data[0].id);
        }
      } else {
        console.error(
          'Ошибка при получении юр. лиц:',
          response.status,
          response.statusText
        );
        setError('Не удалось загрузить данные юридических лиц');

        // В демо-режиме подставляем тестовые данные
        if (process.env.NODE_ENV === 'development') {
          console.log('Демо-режим: Загрузка тестовых юр. лиц');

          // Тестовые данные
          const demoEntities = [
            {
              id: '1',
              inn: '7710140679',
              shortName: 'ООО "Автосервис"',
              form: 'ООО',
              ogrn: '1027739329303',
              kpp: '773001001',
              fullName: 'Общество с ограниченной ответственностью "Автосервис"',
              responsibleName: 'Иванов Иван Иванович',
              responsiblePhone: '+7 (999) 123-45-67',
            },
            {
              id: '2',
              inn: '5027035592',
              shortName: 'ИП Петров А.А.',
              form: 'ИП',
              ogrn: '304502735400052',
              kpp: '',
              fullName:
                'Индивидуальный предприниматель Петров Андрей Алексеевич',
              responsibleName: 'Петров Андрей Алексеевич',
              responsiblePhone: '+7 (999) 765-43-21',
            },
          ];

          setLegalEntities(demoEntities);
          setPrimaryEntityId('1');
          setError('');
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке юр. лиц:', error);
      setError('Произошла ошибка при загрузке данных юридических лиц');

      // В демо-режиме подставляем тестовые данные
      if (process.env.NODE_ENV === 'development') {
        console.log('Демо-режим: Загрузка тестовых юр. лиц после ошибки');

        const demoEntities = [
          {
            id: '1',
            inn: '7710140679',
            shortName: 'ООО "Автосервис"',
            form: 'ООО',
            ogrn: '1027739329303',
            kpp: '773001001',
            fullName: 'Общество с ограниченной ответственностью "Автосервис"',
            responsibleName: 'Иванов Иван Иванович',
            responsiblePhone: '+7 (999) 123-45-67',
          },
          {
            id: '2',
            inn: '5027035592',
            shortName: 'ИП Петров А.А.',
            form: 'ИП',
            ogrn: '304502735400052',
            kpp: '',
            fullName: 'Индивидуальный предприниматель Петров Андрей Алексеевич',
            responsibleName: 'Петров Андрей Алексеевич',
            responsiblePhone: '+7 (999) 765-43-21',
          },
        ];

        setLegalEntities(demoEntities);
        setPrimaryEntityId('1');
        setError('');
      }
    } finally {
      setIsLoading(false);
    }
  }, [clientId]);

  // Функция для удаления юридического лица
  const deleteLegalEntity = async (id: string) => {
    if (!clientId || !id) return;

    setIsDeleting(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Пользователь не авторизован');
      }

      console.log(`Удаление юридического лица: ${id}`);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'
        }/api/clients/${clientId}/legal-entity/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Статус ответа API при удалении:', response.status);

      if (response.ok) {
        // Удаляем элемент из списка локально
        setLegalEntities((prevEntities) =>
          prevEntities.filter((entity) => entity.id !== id)
        );
        setEntityToDelete(null);
        setConfirmDelete(false);
        console.log('Юридическое лицо успешно удалено');
      } else {
        try {
          const errorData = await response.json();
          console.error('Ошибка API при удалении:', errorData);
          throw new Error(
            errorData.error || 'Ошибка при удалении юридического лица'
          );
        } catch {
          throw new Error(
            `Ошибка ${response.status}: Невозможно удалить юридическое лицо`
          );
        }
      }
    } catch (error) {
      console.error('Ошибка при удалении юридического лица:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при удалении юридического лица'
      );

      // Демо-режим - имитируем успешное удаление
      if (process.env.NODE_ENV === 'development') {
        console.log('Демо-режим: Имитация успешного удаления юр. лица');
        setLegalEntities((prevEntities) =>
          prevEntities.filter((entity) => entity.id !== id)
        );
        setEntityToDelete(null);
        setConfirmDelete(false);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Обработчик запроса на удаление
  const handleDeleteRequest = (id: string) => {
    setEntityToDelete(id);
    setConfirmDelete(true);
  };

  // Отмена удаления
  const handleCancelDelete = () => {
    setEntityToDelete(null);
    setConfirmDelete(false);
  };

  // Подтверждение удаления
  const handleConfirmDelete = () => {
    if (entityToDelete) {
      deleteLegalEntity(entityToDelete);
    }
  };

  // Обработчик просмотра детальной информации
  const handleViewDetails = (entity: LegalEntity) => {
    // В упрощенной версии просто открываем новую вкладку с деталями
    window.open(`/clients/${clientId}/legal-entity/${entity.id}`, '_blank');
  };

  // Обработчик редактирования юридического лица
  const handleEdit = (entity: LegalEntity) => {
    setEditingEntity(entity);
    setIsEditing(true);
  };

  // Обработчик отмены редактирования
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingEntity(null);
  };

  // Обработчик успешного обновления юридического лица
  const handleUpdateSuccess = () => {
    setIsEditing(false);
    setEditingEntity(null);
    fetchLegalEntities(); // Перезагружаем список после успешного обновления
  };

  // Функция для установки основного юр. лица
  const setPrimaryEntity = async (id: string) => {
    if (!clientId || !id) return;

    try {
      setPrimaryEntityId(id);

      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Пользователь не авторизован');
      }

      // В реальном приложении здесь будет API запрос для установки основного юр. лица
      console.log(`Установка основного юр. лица: ${id}`);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'
        }/api/clients/${clientId}/legal-entity/${id}/primary`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log('Основное юр. лицо успешно установлено');
      } else {
        console.error(
          'Ошибка при установке основного юр. лица:',
          response.status
        );
      }
    } catch (error) {
      console.error('Ошибка при установке основного юр. лица:', error);

      // В демо-режиме имитируем успешную установку
      if (process.env.NODE_ENV === 'development') {
        console.log(
          'Демо-режим: Имитация успешной установки основного юр. лица'
        );
      }
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchLegalEntities();
  }, [clientId, fetchLegalEntities]);

  if (isEditing && editingEntity) {
    return (
      <div className="bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6">
          Редактирование юридического лица
        </h2>
        <LegalEntityForm
          ref={legalEntityFormRef}
          clientId={clientId}
          onSuccess={handleUpdateSuccess}
          onCancel={handleCancelEdit}
          initialData={{
            id: editingEntity.id,
            inn: editingEntity.inn,
            form: editingEntity.form || '',
            ogrn: editingEntity.ogrn || '',
            kpp: editingEntity.kpp || '',
            legalAddress: '',
            shortName: editingEntity.shortName,
            fullName: editingEntity.fullName || '',
            actualAddress: '',
            taxSystem: '',
            vat: '',
            vatPercent: '20',
            accountant: '',
            responsibleName: editingEntity.responsibleName || '',
            responsiblePosition: '',
            responsiblePhone: editingEntity.responsiblePhone || '',
            signatory: '',
          }}
          isEditing={true}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6">Юридические лица</h2>
        <div className="flex justify-center py-8">
          <p className="text-gray-500">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6">Юридические лица</h2>
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded mb-4">
          {error}
        </div>
      </div>
    );
  }

  if (legalEntities.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6">Юридические лица</h2>
        <div className="flex justify-center py-8">
          <p className="text-gray-500">
            У вас пока нет добавленных юридических лиц
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6">Юридические лица</h2>

      {confirmDelete && entityToDelete && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded flex items-center justify-between">
          <p className="text-yellow-800">
            Вы действительно хотите удалить юридическое лицо?
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              {isDeleting ? 'Удаление...' : 'Удалить'}
            </button>
            <button
              onClick={handleCancelDelete}
              disabled={isDeleting}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {legalEntities.map((entity) => (
          <div key={entity.id} className="bg-[#F5F9FC] rounded-[10px] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="font-semibold text-lg">{entity.shortName}</div>
                <div className="text-[#697586]">ИНН {entity.inn}</div>
                <button
                  onClick={() => handleViewDetails(entity)}
                  className="text-[#2264D1] flex items-center gap-1 hover:underline"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 4.5V3.5C14 2.67157 13.3284 2 12.5 2H3.5C2.67157 2 2 2.67157 2 3.5V12.5C2 13.3284 2.67157 14 3.5 14H12.5C13.3284 14 14 13.3284 14 12.5V11.5"
                      stroke="#2264D1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 8H10"
                      stroke="#2264D1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 10H8"
                      stroke="#2264D1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 6H10"
                      stroke="#2264D1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Реквизиты компании
                </button>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`primary-${entity.id}`}
                    name="primaryEntity"
                    checked={entity.id === primaryEntityId}
                    onChange={() => setPrimaryEntity(entity.id)}
                    className="mr-2 accent-[#EC1C24]"
                  />
                  <label
                    htmlFor={`primary-${entity.id}`}
                    className="text-[#1F2428]"
                  >
                    Основное юр. лицо
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleEdit(entity)}
                  className="text-[#2264D1] flex items-center gap-1 hover:underline"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33333 3.33333L12.6667 6.66667M2 14H5.33333L13.2 6.13333C13.6145 5.71882 13.6145 5.04784 13.2 4.63333L11.3667 2.8C10.9522 2.38548 10.2812 2.38548 9.86667 2.8L2 10.6667V14Z"
                      stroke="#2264D1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Редактировать
                </button>
                <button
                  onClick={() => handleDeleteRequest(entity.id)}
                  className="text-[#EC1C24] flex items-center gap-1 hover:underline"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4H3.33333H14"
                      stroke="#EC1C24"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.33331 4.00002V2.66669C5.33331 2.31306 5.47379 1.97393 5.72384 1.72388C5.97389 1.47383 6.31302 1.33335 6.66665 1.33335H9.33331C9.68693 1.33335 10.0261 1.47383 10.2761 1.72388C10.5262 1.97393 10.6666 2.31306 10.6666 2.66669V4.00002M12.6666 4.00002V13.3334C12.6666 13.687 12.5262 14.0261 12.2761 14.2762C12.0261 14.5262 11.6869 14.6667 11.3333 14.6667H4.66665C4.31302 14.6667 3.97389 14.5262 3.72384 14.2762C3.47379 14.0261 3.33331 13.687 3.33331 13.3334V4.00002H12.6666Z"
                      stroke="#EC1C24"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
