import LogT from '../src';


test('sets correct numeric value of log level if string is supplied', () => {
  const noneLogger = new LogT('none');
  const errorLogger = new LogT('error');
  const warnLogger = new LogT('warn');
  const infoLogger = new LogT('info');
  const verboseLogger = new LogT('verbose');
  const debugLogger = new LogT('debug');
  const sillyLogger = new LogT('silly');

  expect(noneLogger.getLogLevel()).toEqual(-1);
  expect(errorLogger.getLogLevel()).toEqual(0);
  expect(warnLogger.getLogLevel()).toEqual(1);
  expect(infoLogger.getLogLevel()).toEqual(2);
  expect(verboseLogger.getLogLevel()).toEqual(3);
  expect(debugLogger.getLogLevel()).toEqual(4);
  expect(sillyLogger.getLogLevel()).toEqual(5);
});

test('sets correct numeric value of log level if number is supplied', () => {
  const noneLogger = new LogT(-1);
  const errorLogger = new LogT(0);
  const warnLogger = new LogT(1);
  const infoLogger = new LogT(2);
  const verboseLogger = new LogT(3);
  const debugLogger = new LogT(4);
  const sillyLogger = new LogT(5);

  expect(noneLogger.getLogLevel()).toEqual(-1);
  expect(errorLogger.getLogLevel()).toEqual(0);
  expect(warnLogger.getLogLevel()).toEqual(1);
  expect(infoLogger.getLogLevel()).toEqual(2);
  expect(verboseLogger.getLogLevel()).toEqual(3);
  expect(debugLogger.getLogLevel()).toEqual(4);
  expect(sillyLogger.getLogLevel()).toEqual(5);
});

test('sets default log level of -1 if incorrect value supplied', () => {
  // @ts-ignore
  let logger = new LogT(-2);
  expect(logger.getLogLevel()).toEqual(-1);
  // @ts-ignore
  logger = new LogT(10);
  expect(logger.getLogLevel()).toEqual(-1);
  // @ts-ignore
  logger = new LogT('fefefe');
  expect(logger.getLogLevel()).toEqual(-1);
  // @ts-ignore
  logger = new LogT();
  expect(logger.getLogLevel()).toEqual(-1);
});

test('sets brand as null if not supplied', () => {
  const logger = new LogT(0);
  expect(logger.getBrand()).toBeNull();
});

test('sets brand correctly if supplied', () => {
  const brand = 'panda';
  const logger = new LogT(0, brand);
  expect(logger.getBrand()).toBe(brand);
});
