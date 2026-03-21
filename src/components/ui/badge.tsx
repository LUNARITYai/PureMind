import * as React from 'react';

import { View } from 'react-native';

import { TextClassContext } from '@/src/components/ui/text';
import { cn } from '@/src/lib/utils';

const badgeVariants = {
  default: 'bg-primary',
  secondary: 'bg-secondary',
  destructive: 'bg-destructive',
  outline: 'border border-border',
} as const;

const badgeTextVariants = {
  default: 'text-primary-foreground text-xs font-semibold',
  secondary: 'text-secondary-foreground text-xs font-semibold',
  destructive: 'text-destructive-foreground text-xs font-semibold',
  outline: 'text-foreground text-xs font-semibold',
} as const;

type BadgeVariant = keyof typeof badgeVariants;

interface BadgeProps extends React.ComponentPropsWithoutRef<typeof View> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <TextClassContext.Provider value={badgeTextVariants[variant]}>
      <View
        className={cn(
          'flex-row items-center rounded-full px-2.5 py-0.5',
          badgeVariants[variant],
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant };
