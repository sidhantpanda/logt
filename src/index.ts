import LogT, { LOG_LEVEL } from './lib/logt';

if (window) {
  (window as any)['createLogger'] = (logLevel: LOG_LEVEL): LogT => {
    return new LogT(logLevel);
  };
}

export default LogT;
