'use client';
import { Button, Icon } from '@/shared';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet/sheet';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { LoginContent } from '@/widgets/header/components/authPopover/login';
import { RegisterContent } from '@/widgets/header/components/authPopover/register';

interface IProps {
  onOpenChange: (open: boolean) => void;
  isAriaChecked: boolean;
  setIsAriaChecked: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
}

export const AuthPopover: FC<IProps> = ({
  onOpenChange,
  isAriaChecked,
  setIsAriaChecked,
  isLoggedIn,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const handleOpenChange = (open: boolean) => {
    setIsLogin(true);
    onOpenChange(open);
  };
  return (
    <Sheet onOpenChange={handleOpenChange} modal={false}>
      <SheetTrigger className={'flex gap-4 items-center'}>
        <Button
          variant={'ghost'}
          aria-checked={isAriaChecked}
          onClick={() => setIsAriaChecked((prevState) => !prevState)}
          asChild
          className={'z-10'}
        >
          {isLoggedIn ? (
            <>
              <Icon name={'profile'} />
              Личный кабинет
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
        {isLogin ? (
          <LoginContent onRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterContent />
        )}
      </SheetContent>
    </Sheet>
  );
};
