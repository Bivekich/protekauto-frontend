import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { cn } from '@/shared/lib/css';
import { Icon } from '@/shared';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'font-golos bg-primary-red font-medium text-white text-lg rounded-[12px] hover:bg-red-700',
        secondary: 'main-blue text-lg text-gray-label border-gray-label border',
        burger: 'bg-white',
        third:
          'font-golos bg-white font-medium text-lg rounded-[12px] border-primary-red border',
        ghost:
          'text-white hover:text-gray-300 p-0 h-full bg-secondary-blue w-fit px-7 rounded-xl hover:bg-blue-950 aria-checked:bg-white aria-checked:text-black',
        arrow:
          'text-primary-red text-2xl font-semibold font-golos flex items-center gap-4 hover:gap-6 transition-all',
        outlined:
          'border border-primary-red rounded-[12px] bg-white font-medium text-[20px] hover:opacity-70',
        text: 'bg-transparent text-primary-red p-0 hover:underline font-medium',
      },
      size: {
        default: 'h-16 py-[14px] px-5',
        sm: 'h-8 rounded-md px-3 text-xs',
        md: 'px-[26px] py-[12px] h-fit text-lg leading-[22px]',
        lg: 'px-9 h-[70px]',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<
  (HTMLDivElement | null) & (HTMLButtonElement | null),
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      onCopy,
      href,
      ...props
    },
    ref
  ) => {
    // Если передан href, рендерим Link
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
          {variant === 'arrow' && <Icon name={'arrow_red'} />}
        </Link>
      );
    }

    // Иначе рендерим кнопку или div
    const Comp = asChild ? 'div' : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onCopy={!asChild && onCopy ? onCopy : undefined}
        {...props}
      >
        {children}
        {variant === 'arrow' && <Icon name={'arrow_red'} />}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
