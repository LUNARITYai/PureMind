import { cn } from '@/src/lib/utils';

describe('cn()', () => {
  it('passes through a single class', () => {
    expect(cn('text-sm')).toBe('text-sm');
  });

  it('merges multiple classes', () => {
    expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold');
  });

  it('resolves Tailwind conflicts — last value wins', () => {
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('filters falsy values', () => {
    expect(cn('text-sm', false, undefined, null, '', 'font-bold')).toBe('text-sm font-bold');
  });

  it('returns empty string when called with no arguments', () => {
    expect(cn()).toBe('');
  });
});
