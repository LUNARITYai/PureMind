import * as React from 'react';

import { Text as RNText } from 'react-native';

import * as Slot from '@rn-primitives/slot';

import { cn } from '@/src/lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

interface TextProps extends React.ComponentPropsWithoutRef<typeof RNText> {
  asChild?: boolean;
}

const Text = React.forwardRef<React.ComponentRef<typeof RNText>, TextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-base text-foreground web:select-text', textClass, className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = 'Text';

export { Text, TextClassContext };
