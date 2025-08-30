process.on('warning', (w) => {
  if ((w as any).code === 'DEP0169' || /url\.parse\(\)/i.test(w.message)) return; // ignore
  console.warn(w);
});

const origEmit = process.emitWarning;
process.emitWarning = function (...args: any[]) {
  const [warning] = args;
  const msg = typeof warning === 'string' ? warning : (warning?.message || '');
  if (/url\.parse\(\)/i.test(msg) || (warning as any)?.code === 'DEP0169') return;
  return origEmit.apply(this, args);
};

export function register() {}