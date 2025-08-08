/**
 * Centralized logging utility
 * In production, only error and warn levels are logged
 * In development, all levels are logged
 */

type AllowedLogLevel = 'info' | 'warn' | 'error';
type LogLevel = AllowedLogLevel | 'log';

// This wrapper function ensures we only use allowed console methods
const safeConsoleLog = (level: LogLevel, ...args: unknown[]): void => {
  // Only log in development or for error/warn levels in production
  if (process.env.NODE_ENV !== 'development' && level !== 'error' && level !== 'warn') {
    return;
  }

  const message = `[${level.toUpperCase()}] ${args.map(arg => 
    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
  ).join(' ')}`;

  // Only use allowed console methods
  switch (level) {
    case 'error':
      console.error(message);
      break;
    case 'warn':
      console.warn(message);
      break;
    case 'info':
      console.info(message);
      break;
    // 'log' level is not allowed in production
    case 'log':
      if (process.env.NODE_ENV === 'development') {
        console.info(`[LOG] ${message}`);
      }
      break;
    // No default case needed as TypeScript ensures all cases are handled
  }
};

export const logger = {
  // Map 'log' to 'info' in production to avoid using console.log
  log: (...args: unknown[]) => safeConsoleLog(process.env.NODE_ENV === 'production' ? 'info' : 'log', ...args),
  info: (...args: unknown[]) => safeConsoleLog('info', ...args),
  warn: (...args: unknown[]) => safeConsoleLog('warn', ...args),
  error: (...args: unknown[]) => safeConsoleLog('error', ...args),
};
