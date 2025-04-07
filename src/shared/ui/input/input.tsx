import * as React from 'react';

import { cn } from '@/shared/lib/css';
import { cva, VariantProps } from 'class-variance-authority';

const inputSizes = {
  default: 'h-16 px-7 py-5',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-md px-8',
  xl: 'h-12 rounded-md pl-3 pr-14 !text-sm font-medium',
  icon: 'h-9 w-9',
};

const inputVariants = cva(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 !text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-golos',
  {
    variants: {
      variant: {
        default:
          'variant-caption bg-white placeholder:text-placeholder rounded-md',
        inline_edit:
          'variant-caption bg-white text-black rounded-md bg-[#71A6F626] border-none disabled:opacity-100 disabled:cursor-text',
      },
      size: inputSizes,
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends React.ComponentProps<'input'>,
    Omit<VariantProps<typeof inputVariants>, 'size'> {
  inputSize?: keyof typeof inputSizes;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size: inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
