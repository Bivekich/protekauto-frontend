import { FC, PropsWithChildren } from 'react';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main className={'w-full h-full max-w-pc mx-auto'}>{children}</main>;
};
