import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/AuthForm.module.css';

type AuthFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [codeError, setCodeError] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Блокируем прокрутку основной страницы при открытой форме
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Форматирование номера телефона
  const formatPhone = (value: string): string => {
    // Удаляем все нецифровые символы
    let phoneDigits = value.replace(/\D/g, '');
    
    // Если первая цифра 7 или 8, заменяем на +7
    if (phoneDigits.startsWith('7') || phoneDigits.startsWith('8')) {
      phoneDigits = phoneDigits.substring(1);
      phoneDigits = '7' + phoneDigits;
    }
    
    // Ограничиваем до 10 цифр (не считая +7)
    if (phoneDigits.length > 10) {
      phoneDigits = phoneDigits.substring(0, 10);
    }
    
    // Форматируем номер
    if (phoneDigits.length > 0) {
      phoneDigits = '+7' + phoneDigits;
    }
    
    // Добавляем скобки и дефисы
    if (phoneDigits.length > 2) {
      phoneDigits = phoneDigits.replace(/(\+7)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, function(match, p1, p2, p3, p4, p5) {
        let result = p1;
        if (p2) result += ' (' + p2;
        if (p3) result += ') ' + p3;
        if (p4) result += '-' + p4;
        if (p5) result += '-' + p5;
        return result;
      });
    }
    
    return phoneDigits;
  };

  // Валидация номера телефона
  const validatePhone = (phone: string): boolean => {
    // Удаляем все нецифровые символы для проверки
    const phoneDigits = phone.replace(/\D/g, '');
    
    // Проверяем длину (должно быть 11 цифр включая код страны)
    if (phoneDigits.length !== 11) {
      setPhoneError('Введите полный номер телефона');
      return false;
    }
    
    setPhoneError('');
    return true;
  };

  // Обработчик изменения номера телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
    
    // Сбрасываем ошибку при вводе
    if (phoneError) setPhoneError('');
  };

  // Обработчик изменения кода подтверждения
  const handleCodeChange = (index: number, value: string) => {
    // Разрешаем вводить только цифры
    if (!/^\d*$/.test(value) && value !== '') return;
    
    // Обновляем значение в массиве кода
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Автоматически переходим к следующему полю
    if (value !== '' && index < 3) {
      codeInputRefs.current[index + 1]?.focus();
    }
    
    // Сбрасываем ошибку при вводе
    if (codeError) setCodeError('');
  };

  // Обработчик нажатия backspace в поле кода
  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  // Валидация кода
  const validateCode = (): boolean => {
    if (code.some(digit => digit === '')) {
      setCodeError('Введите полный код из 4 цифр');
      return false;
    }
    
    setCodeError('');
    return true;
  };

  // Валидация имени
  const validateName = (): boolean => {
    if (fullName.trim().length < 3) {
      setNameError('Введите полное имя');
      return false;
    }
    
    // Проверяем наличие имени и фамилии (минимум 2 слова)
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length < 2 || nameParts.some(part => part.length < 2)) {
      setNameError('Введите имя и фамилию');
      return false;
    }
    
    setNameError('');
    return true;
  };

  // Обработчик изменения имени
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    
    // Сбрасываем ошибку при вводе
    if (nameError) setNameError('');
  };

  // Обработчик отправки первого шага формы
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatePhone(phone)) {
      setStep(2);
    }
  };

  // Обработчик отправки второго шага формы
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateCode()) {
      setStep(3);
    }
  };

  // Обработчик отправки третьего шага формы
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateName()) {
      // Здесь будет логика регистрации/авторизации
      console.log('Форма отправлена', { phone, code: code.join(''), fullName });
      onClose();
      // Сбрасываем состояние формы
      resetForm();
    }
  };

  // Сброс состояния формы
  const resetForm = () => {
    setStep(1);
    setPhone('');
    setPhoneError('');
    setCode(['', '', '', '']);
    setCodeError('');
    setFullName('');
    setNameError('');
  };

  // Обработчик кнопки "назад"
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Закрытие формы
  const handleCloseForm = () => {
    onClose();
    // Сбросим состояние формы через небольшую задержку,
    // чтобы не было видно сброса во время анимации закрытия
    setTimeout(resetForm, 300);
  };

  // Определяем, какую форму показывать в зависимости от шага
  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <motion.form 
            key="phone-form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={styles.formStep}
            onSubmit={handlePhoneSubmit}
          >
            <h2 className={styles.formTitle} id="form-title">Вход в личный кабинет</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.formLabel}>Номер телефона</label>
              <input
                id="phone"
                type="tel"
                className={`${styles.formInput} ${phoneError ? styles.inputError : ''}`}
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+7 (___) ___-__-__"
                autoComplete="tel"
                required
                aria-invalid={phoneError ? "true" : "false"}
                aria-describedby={phoneError ? "phone-error" : undefined}
              />
              {phoneError && (
                <div id="phone-error" className={styles.errorMessage}>{phoneError}</div>
              )}
            </div>
            
            <button 
              type="submit" 
              className={styles.formButton}
              disabled={!phone}
              aria-label="Продолжить"
            >
              Продолжить
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                style={{ marginLeft: '8px' }}
              >
                <path 
                  d="M8 3L13 8L8 13M13 8H3" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.form>
        );
      
      case 2:
        return (
          <motion.form 
            key="code-form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={styles.formStep}
            onSubmit={handleCodeSubmit}
          >
            <h2 className={styles.formTitle}>Введите код из СМС</h2>
            
            <div className={styles.formGroup}>
              <div className={styles.codeInputContainer}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    className={`${styles.codeInput} ${codeError ? styles.inputError : ''}`}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(index, e)}
                    maxLength={1}
                    ref={el => { codeInputRefs.current[index] = el; }}
                    autoFocus={index === 0}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    aria-label={`Цифра ${index + 1} кода подтверждения`}
                  />
                ))}
              </div>
              {codeError && (
                <div className={styles.errorMessage}>{codeError}</div>
              )}
            </div>
            
            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.backButton}
                onClick={handleBack}
                aria-label="Вернуться назад"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{ marginRight: '5px' }}
                >
                  <path 
                    d="M10 12L6 8L10 4" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Назад
              </button>
              
              <button 
                type="submit" 
                className={`${styles.formButton} ${styles.submitButton}`}
                disabled={code.some(digit => digit === '')}
                aria-label="Подтвердить код"
              >
                Подтвердить
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{ marginLeft: '8px' }}
                >
                  <path 
                    d="M3 8.5L6.5 12L13 5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.form>
        );
      
      case 3:
        return (
          <motion.form 
            key="name-form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={styles.formStep}
            onSubmit={handleNameSubmit}
          >
            <h2 className={styles.formTitle}>Как к вам обращаться?</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.formLabel}>Имя и Фамилия</label>
              <input
                id="fullName"
                type="text"
                className={`${styles.formInput} ${nameError ? styles.inputError : ''}`}
                value={fullName}
                onChange={handleNameChange}
                placeholder="Иван Иванов"
                autoComplete="name"
                required
                autoFocus
                aria-invalid={nameError ? "true" : "false"}
                aria-describedby={nameError ? "name-error" : undefined}
              />
              {nameError && (
                <div id="name-error" className={styles.errorMessage}>{nameError}</div>
              )}
            </div>
            
            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.backButton}
                onClick={handleBack}
                aria-label="Вернуться назад"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{ marginRight: '5px' }}
                >
                  <path 
                    d="M10 12L6 8L10 4" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Назад
              </button>
              
              <button 
                type="submit" 
                className={`${styles.formButton} ${styles.submitButton}`}
                disabled={!fullName.trim()}
                aria-label="Завершить регистрацию"
              >
                Завершить
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{ marginLeft: '8px' }}
                >
                  <path 
                    d="M3 8L7 12L13 5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.form>
        );
      
      default:
        return null;
    }
  };

  // Рендерим индикатор прогресса
  const renderProgressIndicator = () => {
    return (
      <div className={styles.progressIndicator} role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
        <div 
          className={`${styles.progressDot} ${step === 1 ? styles.progressDotActive : ''}`} 
          aria-label="Шаг 1: Ввод номера телефона"
        />
        <div 
          className={`${styles.progressDot} ${step === 2 ? styles.progressDotActive : ''}`}
          aria-label="Шаг 2: Ввод кода подтверждения"
        />
        <div 
          className={`${styles.progressDot} ${step === 3 ? styles.progressDotActive : ''}`}
          aria-label="Шаг 3: Ввод имени и фамилии"
        />
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseForm}
            role="presentation"
          />
          
          <motion.div 
            className={styles.formContainer}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-title"
          >
            <button 
              className={styles.closeButton} 
              onClick={handleCloseForm}
              aria-label="Закрыть форму"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d="M18 6L6 18M6 6L18 18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            
            {renderProgressIndicator()}
            
            <AnimatePresence mode="wait">
              {renderForm()}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthForm;