'use client';
import { Button, Icon } from '@/shared';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet/sheet';
import { FC, useEffect, useState } from 'react';
import { LoginContent } from './login';
import { RegisterContent } from './register';
import { isAuthenticated, getUser, logout } from '@/shared/lib/auth';
import { useRouter } from 'next/navigation';

interface IProps {
  onOpenChange: (open: boolean) => void;
  isAriaChecked: boolean;
  setIsAriaChecked: (open: boolean | ((prevState: boolean) => boolean)) => void;
  isLoggedIn?: boolean;
}

export const AuthPopover: FC<IProps> = ({
  onOpenChange,
  isAriaChecked,
  setIsAriaChecked,
  isLoggedIn: propIsLoggedIn,
}) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(propIsLoggedIn || false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const authenticated =
        propIsLoggedIn !== undefined ? propIsLoggedIn : isAuthenticated();
      setIsLoggedIn(authenticated);

      if (authenticated) {
        const user = getUser();
        if (user && user.firstName) {
          setUserName(user.firstName);
        }
      }
    };

    checkAuth();

    // Проверяем авторизацию при монтировании и при изменении URL
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [propIsLoggedIn]);

  const handleOpenChange = (open: boolean) => {
    setIsLogin(true);
    onOpenChange(open);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserName('');
    router.push('/');
    window.location.reload(); // Обновляем страницу, чтобы применить выход
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push('/profile');
    }
  };

  return (
    <Sheet onOpenChange={handleOpenChange} modal={false}>
      <SheetTrigger className={'flex gap-4 items-center'}>
        <Button
          variant={'ghost'}
          aria-checked={isAriaChecked}
          onClick={() => {
            setIsAriaChecked((prevState) => !prevState);
            if (isLoggedIn) {
              handleProfileClick();
            }
          }}
          asChild
          className={'z-10'}
        >
          {isLoggedIn ? (
            <>
              <Icon name={'profile'} />
              {userName ? `${userName}` : 'Личный кабинет'}
            </>
          ) : (
            <>
              <Icon name={'profile_red'} />
              Вход
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="z-20">
        {isLoggedIn ? (
          <div className="p-6 flex flex-col space-y-4">
            <h3 className="text-xl font-bold">Личный кабинет</h3>
            <Button onClick={() => router.push('/profile')}>Профиль</Button>
            <Button onClick={handleLogout} variant="outlined">
              Выйти
            </Button>
          </div>
        ) : isLogin ? (
          <LoginContent onRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterContent />
        )}
      </SheetContent>
    </Sheet>
  );
};
