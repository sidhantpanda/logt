// eslint-disable-next-line no-unused-vars
import LogT, { LOG_LEVEL } from './index';

if (window) {
  (window as any).createLogger = (logLevel: LOG_LEVEL): LogT => new LogT(logLevel);
}
