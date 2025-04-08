import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface IProps {
  outerContainerProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  innerContainerProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  children?: ReactNode;
}

export const WidgetContainer: FC<IProps> = ({
  outerContainerProps,
  innerContainerProps,
  children,
}) => {
  return (
    <div
      {...outerContainerProps}
      className={clsx('w-full px-10', outerContainerProps?.className)}
    >
      <div
        {...innerContainerProps}
        className={clsx(
          'w-full h-full max-w-pc mx-auto font-druk',
          innerContainerProps?.className
        )}
      >
        {children}
      </div>
    </div>
  );
};
