import * as React from 'react';
import { Pressable } from 'react-native';
import { cn } from '@/src/lib/utils';
import { TextClassContext } from '@/src/components/ui/text';
import * as Slot from '@rn-primitives/slot';

const buttonVariants = {
  variant: {
    default: 'bg-primary active:opacity-90',
    destructive: 'bg-destructive active:opacity-90',
    outline: 'border border-border bg-background active:bg-muted',
    secondary: 'bg-secondary active:opacity-80',
    ghost: 'active:bg-muted',
    link: '',
  },
  size: {
    default: 'h-12 px-5 py-3',
    sm: 'h-9 px-3',
    lg: 'h-14 px-8',
    icon: 'h-12 w-12',
  },
} as const;

const buttonTextVariants = {
  variant: {
    default: 'text-primary-foreground font-semibold',
    destructive: 'text-destructive-foreground font-semibold',
    outline: 'text-foreground font-semibold',
    secondary: 'text-secondary-foreground font-semibold',
    ghost: 'text-foreground font-semibold',
    link: 'text-primary underline font-semibold',
  },
  size: {
    default: 'text-base',
    sm: 'text-sm',
    lg: 'text-lg',
    icon: 'text-base',
  },
} as const;

type ButtonVariant = keyof typeof buttonVariants.variant;
type ButtonSize = keyof typeof buttonVariants.size;

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<React.ComponentRef<typeof Pressable>, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <TextClassContext.Provider
        value={cn(buttonTextVariants.variant[variant], buttonTextVariants.size[size])}
      >
        <Component
          className={cn(
            'flex-row items-center justify-center rounded-xl',
            buttonVariants.variant[variant],
            buttonVariants.size[size],
            props.disabled && 'opacity-50',
            className
          )}
          ref={ref}
          role="button"
          {...props}
        />
      </TextClassContext.Provider>
    );
  }
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
