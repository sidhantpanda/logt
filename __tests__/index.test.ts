import LogT from '../src';
const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

describe('constructor sets values correctly', () => {
  describe('sets log level correctly', () => {
    test('sets correct numeric value of log level if string is supplied', () => {
      const errorLogger = new LogT('error');
      const warnLogger = new LogT('warn');
      const infoLogger = new LogT('info');
      const verboseLogger = new LogT('verbose');
      const debugLogger = new LogT('debug');
      const sillyLogger = new LogT('silly');

      expect(errorLogger.getLogLevel()).toEqual(0);
      expect(warnLogger.getLogLevel()).toEqual(1);
      expect(infoLogger.getLogLevel()).toEqual(2);
      expect(verboseLogger.getLogLevel()).toEqual(3);
      expect(debugLogger.getLogLevel()).toEqual(4);
      expect(sillyLogger.getLogLevel()).toEqual(5);
    });
  });
});