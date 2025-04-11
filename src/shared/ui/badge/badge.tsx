import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/css';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border py-[10px] px-[22px] rounded-[12px] text-[14px] font-medium font-golos focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[#1668E3] text-white',
        success: 'border-transparent bg-[#5DBB4B] text-white',
        cancelled: 'border-transparent bg-[#D0D0D0] text-[#747474]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
