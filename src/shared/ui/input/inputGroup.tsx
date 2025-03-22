import { FC, PropsWithChildren } from 'react';

export const InputGroup: FC<PropsWithChildren> = ({ children }) => {
  return <div className={'relative w-full'}>{children}</div>;
};

export const InputLeftElement: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={
        'absolute left-0 top-0 bottom-0 m-auto h-fit w-fit px-7 z-10 bg-white'
      }
    >
      {children}
    </div>
  );
};

export const InputRightElement: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={
        'absolute right-0 top-0 bottom-0 m-auto h-fit w-fit px-7 z-10 bg-white'
      }
    >
      {children}
    </div>
  );
};
