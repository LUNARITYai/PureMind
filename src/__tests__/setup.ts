// Polyfill crypto.randomUUID for jsdom
if (typeof crypto === 'undefined' || typeof crypto.randomUUID !== 'function') {
  let counter = 0;
  (globalThis as any).crypto = {
    ...(globalThis as any).crypto,
    randomUUID: () => {
      counter++;
      return `00000000-0000-0000-0000-${String(counter).padStart(12, '0')}`;
    },
  };
}
