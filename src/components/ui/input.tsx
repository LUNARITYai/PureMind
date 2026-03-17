import * as React from 'react';
import { TextInput } from 'react-native';
import { cn } from '@/src/lib/utils';

const Input = React.forwardRef<
  React.ComponentRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderTextColor, ...props }, ref) => (
  <TextInput
    ref={ref}
    className={cn(
      'h-12 rounded-xl border border-border bg-background px-4 text-base text-foreground',
      props.editable === false && 'opacity-50',
      className
    )}
    placeholderTextColor={placeholderTextColor ?? 'hsl(0 0% 45%)'}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
