import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/AuthForm.module.css';

// Компонент для ввода номера телефона
const PhoneNumberStep = ({ 
  phoneNumber, 
  setPhoneNumber, 
  onNext 
}: { 
  phoneNumber: string; 
  setPhoneNumber: (value: string) => void; 
  onNext: () => void;
}) => {
  // Состояние для отслеживания ошибки валидации
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  // Функция для форматирования телефонного номера
  const formatPhoneNumber = (value: string) => {
    if (!value) return '';
    
    // Удаляем все нецифровые символы
    const phoneDigits = value.replace(/\D/g, '');
    
    // Если первая цифра 7, используем её, иначе добавляем 7 как код страны
    const digits = phoneDigits.startsWith('7') ? phoneDigits : `7${phoneDigits}`;
    
    // Форматируем номер в виде +7 (XXX) XXX-XX-XX
    if (digits.length <= 1) {
      return '+7';
    } else if (digits.length <= 4) {
      return `+7 (${digits.slice(1, 4)}`;
    } else if (digits.length <= 7) {
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}`;
    } else if (digits.length <= 9) {
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}`;
    } else {
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
    }
  };

  // Валидация номера телефона
  const validatePhone = (phone: string): boolean => {
    const phoneDigits = phone.replace(/\D/g, '');
    
    // Проверяем, что номер содержит 11 цифр и начинается с 7
    if (phoneDigits.length !== 11 || !phoneDigits.startsWith('7')) {
      setError('Номер неверный. Укажите действующий российский номер');
      return false;
    }
    
    // Проверка кода оператора (начинается с 9 после кода страны)
    if (phoneDigits[1] !== '9') {
      setError('Номер неверный. Укажите действующий российский номер');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhone);
    setTouched(true);
    
    // Валидируем номер при каждом изменении, если поле уже было тронуто
    if (touched) {
      validatePhone(formattedPhone);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Финальная валидация при отправке
    if (validatePhone(phoneNumber)) {
      onNext();
    }
  };

  const handleBlur = () => {
    setTouched(true);
    validatePhone(phoneNumber);
  };

  return (
    <div className={styles.formStep}>
      <h2 className={styles.formTitle}>Вход или регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Введите номер телефона</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            placeholder="+7 (999) 999-99-99"
            className={`${styles.formInput} ${error && touched ? styles.inputError : ''}`}
            required
          />
          {error && touched && (
            <div className={styles.errorMessage}>
              <svg 
                className={styles.errorIcon}
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 8V12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <circle 
                  cx="12" 
                  cy="16" 
                  r="0.5" 
                  fill="currentColor" 
                  stroke="currentColor" 
                  strokeWidth="1"
                />
              </svg>
              {error}
            </div>
          )}
        </div>
        <button 
          type="submit" 
          className={styles.formButton}
          disabled={!!error || phoneNumber.length < 10}
        >
          Получить код
        </button>
      </form>
    </div>
  );
};

// Компонент для ввода SMS-кода
const SmsCodeStep = ({ 
  onPrev, 
  onNext 
}: { 
  onPrev: () => void; 
  onNext: () => void;
}) => {
  const [code, setCode] = useState<string[]>(Array(5).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Подготавливаем рефы для каждого инпута
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Автоматически переходим к следующему полю
      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Если нажат Backspace и поле пустое, переходим к предыдущему полю
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.every(digit => digit) && code.length === 5) {
      onNext();
    }
  };

  return (
    <div className={styles.formStep}>
      <h2 className={styles.formTitle}>Вход или регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Введите код из СМС</label>
          <div className={styles.codeInputContainer}>
            {Array(5).fill(null).map((_, index) => (
              <input
                key={index}
                ref={el => {
                  inputRefs.current[index] = el;
                  return undefined;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code[index]}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className={styles.codeInput}
                required
              />
            ))}
          </div>
        </div>
        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.backButton}
            onClick={onPrev}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M19 12H5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 19L5 12L12 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            Ввести другой номер
          </button>
          <button 
            type="submit" 
            className={`${styles.formButton} ${styles.submitButton}`}
            disabled={!code.every(digit => digit) || code.length !== 5}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

// Компонент для ввода имени и фамилии
const ProfileInfoStep = ({ 
  onSubmit 
}: { 
  onSubmit: () => void;
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false
  });

  // Проверка имени на валидность
  const validateFirstName = (name: string) => {
    if (!name.trim()) {
      setFirstNameError('Поле имени не может быть пустым');
      return false;
    }
    
    // Проверка на корректность имени (только буквы, минимум 2 символа)
    if (!/^[А-Яа-яЁёA-Za-z]{2,}$/.test(name.trim())) {
      setFirstNameError('Вы указали неверное имя');
      return false;
    }
    
    setFirstNameError(null);
    return true;
  };

  // Проверка фамилии на валидность
  const validateLastName = (name: string) => {
    if (!name.trim()) {
      setLastNameError('Поле фамилии не может быть пустым');
      return false;
    }
    
    // Проверка на корректность фамилии (только буквы, минимум 2 символа)
    if (!/^[А-Яа-яЁёA-Za-z]{2,}$/.test(name.trim())) {
      setLastNameError('Вы указали неверную фамилию');
      return false;
    }
    
    setLastNameError(null);
    return true;
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    if (touched.firstName) {
      validateFirstName(value);
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    if (touched.lastName) {
      validateLastName(value);
    }
  };

  const handleFirstNameBlur = () => {
    setTouched(prev => ({ ...prev, firstName: true }));
    validateFirstName(firstName);
  };

  const handleLastNameBlur = () => {
    setTouched(prev => ({ ...prev, lastName: true }));
    validateLastName(lastName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    
    // Устанавливаем состояние "тронутости" для обоих полей
    setTouched({ firstName: true, lastName: true });
    
    if (isFirstNameValid && isLastNameValid) {
      onSubmit();
    }
  };

  return (
    <div className={styles.formStep}>
      <h2 className={styles.formTitle}>Вход или регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Введите имя</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            onBlur={handleFirstNameBlur}
            placeholder="Иван"
            className={`${styles.formInput} ${firstNameError && touched.firstName ? styles.inputError : ''}`}
            required
          />
          {firstNameError && touched.firstName && (
              <div className={styles.errorMessage}>
                <svg 
                  className={styles.errorIcon}
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path 
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M12 8V12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <circle 
                    cx="12" 
                    cy="16" 
                    r="0.5" 
                    fill="currentColor" 
                    stroke="currentColor" 
                    strokeWidth="1"
                  />
                </svg>
                {firstNameError}
              </div>
            )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Фамилию</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            onBlur={handleLastNameBlur}
            placeholder="Иванов"
            className={`${styles.formInput} ${lastNameError && touched.lastName ? styles.inputError : ''}`}
            required
          />
          {lastNameError && touched.lastName && (
              <div className={styles.errorMessage}>
                <svg 
                  className={styles.errorIcon}
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path 
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M12 8V12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <circle 
                    cx="12" 
                    cy="16" 
                    r="0.5" 
                    fill="currentColor" 
                    stroke="currentColor" 
                    strokeWidth="1"
                  />
                </svg>
                {lastNameError}
              </div>
            )}
        </div>
        <button 
          type="submit" 
          className={styles.formButton}
          disabled={!!(firstNameError || lastNameError) || !firstName || !lastName}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

// Главный компонент формы
const AuthForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('+7');

  // Блокировка прокрутки при открытии формы
  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущую позицию прокрутки
      const scrollY = window.scrollY;
      // Блокируем прокрутку
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Восстанавливаем прокрутку
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    // Очистка при размонтировании
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Функция для открытия/закрытия формы
  const toggleForm = () => {
    setIsOpen(!isOpen);
    // Сбрасываем шаг при закрытии формы
    if (isOpen) {
      setTimeout(() => {
        setCurrentStep(0);
        setPhoneNumber('+7'); // Сбрасываем телефон к начальному значению
      }, 300); // Задержка для завершения анимации закрытия
    }
  };

  // Варианты анимации для формы
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  // Варианты анимации для шагов
  const stepVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 100 : -100,
        opacity: 0,
        transition: { duration: 0.3 }
      };
    }
  };

  // Направление анимации
  const [direction, setDirection] = useState(0);

  // Обработчики переходов между шагами
  const handleNext = () => {
    setDirection(1);
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    // Здесь можно добавить логику сохранения данных пользователя
    toggleForm();
  };

  return (
    <>
      <button 
        className={styles.loginButton} 
        onClick={toggleForm}
        aria-label="Войти или зарегистрироваться"
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 3C8.376 3 3 8.376 3 15C3 21.624 8.376 27 15 27C21.624 27 27 21.624 27 15C27 8.376 21.624 3 15 3ZM15 7.8C17.316 7.8 19.2 9.684 19.2 12C19.2 14.316 17.316 16.2 15 16.2C12.684 16.2 10.8 14.316 10.8 12C10.8 9.684 12.684 7.8 15 7.8ZM15 24.6C12.564 24.6 9.684 23.616 7.632 21.144C9.73419 19.4955 12.3285 18.5995 15 18.5995C17.6715 18.5995 20.2658 19.4955 22.368 21.144C20.316 23.616 17.436 24.6 15 24.6Z" fill="currentColor" />
        </svg>
        <div>Войти</div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className={styles.overlay} onClick={toggleForm} />
            <motion.div 
              className={styles.formContainer}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button 
                className={styles.closeButton} 
                onClick={toggleForm}
                aria-label="Закрыть форму"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.visuallyHidden}>Закрыть</span>
              </button>
              
              <AnimatePresence custom={direction} mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <PhoneNumberStep 
                      phoneNumber={phoneNumber} 
                      setPhoneNumber={setPhoneNumber} 
                      onNext={handleNext} 
                    />
                  </motion.div>
                )}
                
                {currentStep === 1 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <SmsCodeStep 
                      onPrev={handlePrev} 
                      onNext={handleNext} 
                    />
                  </motion.div>
                )}
                
                {currentStep === 2 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <ProfileInfoStep 
                      onSubmit={handleComplete} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthForm;