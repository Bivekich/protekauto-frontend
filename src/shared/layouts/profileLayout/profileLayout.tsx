import { FC, ReactNode } from 'react';

interface IProps {
  title: string;
  children: ReactNode;
}

export const ProfileLayout: FC<IProps> = ({ title, children }) => {
  return (
    <div className={'w-full flex flex-col gap-8 h-full'}>
      <h2 className={'font-bold text-[30px] leading-9 uppercase'}>{title}</h2>
      <div className={'w-full max-h-[876px]'}>{children}</div>
    </div>
  );
};
