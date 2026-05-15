export function getLoggerConfig() {
  if (process.env.NODE_ENV === 'production') return true;
  if (process.env.NODE_ENV === 'test') return false;
  return { level: 'info' };
}
