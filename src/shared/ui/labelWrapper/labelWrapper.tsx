import { ComponentProps, FC, ReactNode } from 'react';

interface IProps {
  label: string;
  children: ReactNode;
  containerClassName?: ComponentProps<'div'>['className'];
}

export const LabelWrapper: FC<IProps> = ({
  label,
  children,
  containerClassName,
}) => {
  return (
    <div className={`flex flex-col gap-4 ${containerClassName}`}>
      <p className={'text-paragraph text-[22px]'}>{label}</p>
      {children}
    </div>
  );
};
