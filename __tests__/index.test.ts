import LogT from '../src';

const TAG = 'jest-test-runner';

const STYLES = {
  error: 'color: white; background: #db2828; border-radius: 8px',
  warn: 'color: white; background: #fbbd08; border-radius: 8px',
  info: 'color: white; background: #c4c64f; border-radius: 8px',
  verbose: 'color: white; background: #6435c9; border-radius: 8px',
  debug: 'color: white; background: #2185d0; border-radius: 8px',
  silly: 'color: white; background: #21ba45; border-radius: 8px',
  tag: 'color: black; background: #5bfff4; border-radius: 8px',
};

describe('LogT implementation', () => {

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

  // ERROR METHOD TESTS
  test('error method calls console.error method', () => {
    const message = 'error message';
    let spy = {
      error: jest.spyOn(console, 'error').mockImplementation(() => { })
    };

    const logger = new LogT(0);
    logger.error(TAG, message);
    expect(spy.error).toHaveBeenCalled();
    spy.error.mockClear();
  });

  test('error method doesn\'t call console.error method when log level is -1', () => {
    const message = 'error message';
    let spy = {
      error: jest.spyOn(console, 'error').mockImplementation(() => { })
    };

    const logger = new LogT(-1);
    logger.error(TAG, message);
    expect(spy.error).not.toHaveBeenCalled();
    spy.error.mockClear();
  });

  // WARN METHOD TESTS
  test('warn method calls console.warn method', () => {
    const message = 'warn message';
    let spy = {
      warn: jest.spyOn(console, 'warn').mockImplementation(() => { })
    };

    let logger = new LogT(1);
    logger.warn(TAG, message);
    expect(spy.warn).toHaveBeenCalled();
    spy.warn.mockClear();
  });

  test('warn method doesn\'t call console.warn method when log level is  less  than 1', () => {
    const message = 'warn message';
    let spy = {
      warn: jest.spyOn(console, 'warn').mockImplementation(() => { })
    };

    const loggerNone = new LogT(-1);
    const loggerError = new LogT(0);
    loggerNone.warn(TAG, message);
    loggerError.warn(TAG, message);
    expect(spy.warn).not.toHaveBeenCalled();
    spy.warn.mockClear();
  });

  test('info method calls console.info method', () => {
    const message = 'info message';
    let spy = {
      info: jest.spyOn(console, 'info').mockImplementation(() => { })
    };

    let logger = new LogT(2);
    logger.info(TAG, message);
    expect(spy.info).toHaveBeenCalled();
    spy.info.mockClear();
  });

  test('info method doesn\'t call console.info method when log level is  less  than 2', () => {
    const message = 'info message';
    let spy = {
      info: jest.spyOn(console, 'info').mockImplementation(() => { })
    };

    const loggerNone = new LogT(-1);
    const loggerError = new LogT(0);
    const loggerWarn = new LogT(1);
    loggerNone.info(TAG, message);
    loggerError.info(TAG, message);
    loggerWarn.info(TAG, message);
    expect(spy.info).not.toHaveBeenCalled();
    spy.info.mockClear();
  });

  test('verbose method calls console.log method', () => {
    const message = 'verbose message';
    let spy = {
      log: jest.spyOn(console, 'log').mockImplementation(() => { })
    };

    let logger = new LogT(3);
    logger.verbose(TAG, message);
    expect(spy.log).toHaveBeenCalled();
    spy.log.mockClear();
  });

  test('verbose method doesn\'t call console.log method when log level is  less  than 3', () => {
    const message = 'info message';
    let spy = {
      log: jest.spyOn(console, 'log').mockImplementation(() => { })
    };

    const loggerNone = new LogT(-1);
    const loggerError = new LogT(0);
    const loggerWarn = new LogT(1);
    const loggerInfo = new LogT(2);
    loggerNone.verbose(TAG, message);
    loggerError.verbose(TAG, message);
    loggerWarn.verbose(TAG, message);
    loggerInfo.verbose(TAG, message);
    expect(spy.log).not.toHaveBeenCalled();
    spy.log.mockClear();
  });

  test('debug method calls console.log method', () => {
    const message = 'verbose message';
    let spy = {
      log: jest.spyOn(console, 'log').mockImplementation(() => { })
    };

    let logger = new LogT(4);
    logger.debug(TAG, message);
    expect(spy.log).toHaveBeenCalled();
    spy.log.mockClear();
  });

  test('debug method doesn\'t call console.log method when log level is  less  than 4', () => {
    const message = 'info message';
    let spy = {
      log: jest.spyOn(console, 'log').mockImplementation(() => { })
    };

    const loggerNone = new LogT(-1);
    const loggerError = new LogT(0);
    const loggerWarn = new LogT(1);
    const loggerInfo = new LogT(2);
    const loggerVerbose = new LogT(3);
    loggerNone.debug(TAG, message);
    loggerError.debug(TAG, message);
    loggerWarn.debug(TAG, message);
    loggerInfo.debug(TAG, message);
    loggerVerbose.debug(TAG, message);
    expect(spy.log).not.toHaveBeenCalled();
    spy.log.mockClear();
  });

  test('silly method calls console.log method', () => {
    const message = 'info message';
    let spy = {
      silly: jest.spyOn(console, 'log').mockImplementation(() => { })
    };

    let logger = new LogT(5);
    logger.silly(TAG, message);
    expect(spy.silly).toHaveBeenCalled();
    spy.silly.mockClear();
  });

  test('silly method doesn\'t call console.log method when log level is  less  than 5', () => {
    const message = 'info message';
    let spy = {
      log: jest.spyOn(console, 'log').mockImplementation(() => { })
    };

    const loggerNone = new LogT(-1);
    const loggerError = new LogT(0);
    const loggerWarn = new LogT(1);
    const loggerInfo = new LogT(2);
    const loggerVerbose = new LogT(3);
    const loggerDebug = new LogT(4);
    loggerNone.silly(TAG, message);
    loggerError.silly(TAG, message);
    loggerWarn.silly(TAG, message);
    loggerInfo.silly(TAG, message);
    loggerVerbose.silly(TAG, message);
    loggerDebug.silly(TAG, message);
    expect(spy.log).not.toHaveBeenCalled();
    spy.log.mockClear();
  });
});
