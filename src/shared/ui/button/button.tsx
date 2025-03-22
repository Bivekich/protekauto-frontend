import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

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
        ghost: 'text-white hover:text-gray-300 p-0 h-full',
        arrow:
          'text-primary-red text-2xl font-semibold font-golos flex items-center gap-4 hover:gap-6 transition-all',
      },
      size: {
        default: 'h-16 py-[14px] px-5',
        sm: 'h-8 rounded-md px-3 text-xs',
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
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
