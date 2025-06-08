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
          {error && touched && <div className={styles.errorMessage}>{error}</div>}
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
            Ввести другой номер
          </button>
          <button 
            type="submit" 
            className={styles.formButton}
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName) {
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
            onChange={e => setFirstName(e.target.value)}
            placeholder="Иван"
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Фамилию</label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Иванов"
            className={styles.formInput}
            required
          />
        </div>
        <button 
          type="submit" 
          className={styles.formButton}
          disabled={!firstName || !lastName}
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

  // Варианты анимации для формы - выезжает сверху вниз
  const formVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.3 } }
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
                &times;
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