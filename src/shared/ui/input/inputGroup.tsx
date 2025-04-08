import { FC, PropsWithChildren } from 'react';

export const InputGroup: FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  return <div className={`relative w-full ${className}`}>{children}</div>;
};

export const InputLeftElement: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={
        'absolute left-1 top-0 bottom-0 m-auto h-fit w-fit px-7 z-10 bg-white'
      }
    >
      {children}
    </div>
  );
};

export const InputRightElement: FC<
  PropsWithChildren & { className?: string }
> = ({ children, className }) => {
  return (
    <div
      className={
        'absolute right-1 top-0 bottom-0 m-auto h-fit w-fit px-7 z-10 bg-white' +
        className
      }
    >
      {children}
    </div>
  );
};
