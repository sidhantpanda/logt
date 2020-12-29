import LogT from '../src';
// import { describe } from 'jest';

const TAG = 'jest-test-runner';

// const STYLES = {
//   error: 'color: white; background: #db2828; border-radius: 8px',
//   warn: 'color: white; background: #fbbd08; border-radius: 8px',
//   info: 'color: white; background: #c4c64f; border-radius: 8px',
//   verbose: 'color: white; background: #6435c9; border-radius: 8px',
//   debug: 'color: white; background: #2185d0; border-radius: 8px',
//   silly: 'color: white; background: #21ba45; border-radius: 8px',
//   tag: 'color: black; background: #5bfff4; border-radius: 8px',
// };

// // const OriginalImage = global.Image;
// global.Image = class {
//   constructor() {
//     setTimeout(() => {
//       this.onload(); // simulate success
//     }, 100);
//   }
// };

describe('LogT implementation', () => {
  const spy = {
    error: jest.spyOn(console, 'error').mockImplementation(() => { }),
    warn: jest.spyOn(console, 'warn').mockImplementation(() => { }),
    info: jest.spyOn(console, 'info').mockImplementation(() => { }),
    log: jest.spyOn(console, 'log').mockImplementation(() => { }),
    debug: jest.spyOn(console, 'debug').mockImplementation(() => { })
  };

  const imageLoadCallback = (image: HTMLImageElement) => {
    image.onload!(new Event('random event'));
  };

  afterEach(() => {
    spy.error.mockClear();
    spy.warn.mockClear();
    spy.info.mockClear();
    spy.log.mockClear();
    spy.debug.mockClear();
  });

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

    const logger = new LogT(0);
    logger.error(TAG, message);
    logger.image(0, 'randomURL', imageLoadCallback);
    expect(spy.error).toHaveBeenCalledTimes(2);
  });

  test('error method doesn\'t call console.error method when log level is -1', () => {
    const message = 'error message';

    const logger = new LogT(-1);
    logger.error(TAG, message);
    logger.image(0, 'randomURL');
    expect(spy.error).not.toHaveBeenCalled();
  });

  // WARN METHOD TESTS
  test('warn method calls console.warn method', () => {
    const message = 'warn message';

    const logger = new LogT(1);
    logger.warn(TAG, message);
    logger.image(1, 'randomURL', imageLoadCallback);
    expect(spy.warn).toBeCalledTimes(2);
  });

  test('warn method doesn\'t call console.warn method when log level is less than 1', () => {
    const message = 'warn message';

    const loggerNone = new LogT(-1);
    const loggerError = new LogT(0);
    loggerNone.warn(TAG, message);
    loggerNone.image(1, 'randomURL');
    loggerError.warn(TAG, message);
    loggerError.image(1, 'randomURL');
    expect(spy.warn).not.toHaveBeenCalled();
  });

  test('info method calls console.info method', () => {
    const message = 'info message';

    const logger = new LogT(2);
    logger.info(TAG, message);
    logger.image(2, 'randomURL', imageLoadCallback);
    expect(spy.info).toBeCalledTimes(2);
  });

  test('info method doesn\'t call console.info method when log level is less than 2', () => {
    const message = 'info message';

    const loggerNone = new LogT(-1);
    const loggerError = new LogT(0);
    const loggerWarn = new LogT(1);
    loggerNone.info(TAG, message);
    loggerError.info(TAG, message);
    loggerWarn.info(TAG, message);
    expect(spy.info).not.toHaveBeenCalled();
  });

  test('verbose method calls console.log method', () => {
    const message = 'verbose message';
    const logger = new LogT(3);
    logger.verbose(TAG, message);
    logger.image('verbose', 'randomURLforVerbose', imageLoadCallback);
    expect(spy.log).toBeCalledTimes(2);
  });

  test('verbose method doesn\'t call console.log method when log level is less than 3', () => {
    const message = 'verbose message';

    const loggerNone = new LogT(-1);
    const loggerError = new LogT(0);
    const loggerWarn = new LogT(1);
    const loggerInfo = new LogT(2);
    loggerNone.verbose(TAG, message);
    loggerError.verbose(TAG, message);
    loggerWarn.verbose(TAG, message);
    loggerInfo.verbose(TAG, message);
    expect(spy.log).not.toHaveBeenCalled();
  });

  test('debug method calls console.debug method', () => {
    const message = 'debug message';

    const logger = new LogT(4);
    logger.debug(TAG, message);
    logger.image(4, 'randomURL', imageLoadCallback);
    expect(spy.debug).toBeCalledTimes(2);
  });

  test('debug method doesn\'t call console.log method when log level is less than 4', () => {
    const message = 'info message';
    const loggerNone = new LogT(-1);
    const loggerError = new LogT(0);
    const loggerWarn = new LogT(1);
    const loggerInfo = new LogT(2);
    const loggerVerbose = new LogT(3);
    loggerNone.image(4, 'url', imageLoadCallback);
    loggerError.debug(TAG, message);
    loggerWarn.debug(TAG, message);
    loggerInfo.debug(TAG, message);
    loggerVerbose.debug(TAG, message);
    expect(spy.log).not.toHaveBeenCalled(); // spy.versbose listens to console.log
  });

  test('silly method calls console.log method', () => {
    const message = 'info message';

    const logger = new LogT(5);
    logger.silly(TAG, message);
    expect(spy.log).toHaveBeenCalled();
  });

  test('silly method doesn\'t call console.log method when log level is less than 5', () => {
    const message = 'info message';

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
  });

  test('`showHidden` calls console methods for hidden logs', () => {
    const message = 'message';
    const logger = new LogT(-1);
    logger.error(TAG, message);
    logger.image(0, 'url', imageLoadCallback);
    logger.warn(TAG, message);
    logger.info(TAG, message);
    logger.verbose(TAG, message);
    logger.debug(TAG, message);
    logger.silly(TAG, message);

    expect(spy.error).not.toHaveBeenCalled();
    expect(spy.warn).not.toHaveBeenCalled();
    expect(spy.info).not.toHaveBeenCalled();
    expect(spy.log).not.toHaveBeenCalled();
    expect(spy.debug).not.toHaveBeenCalled();

    logger.showHidden(0);
    expect(spy.error).toBeCalledTimes(2);
    expect(spy.warn).not.toHaveBeenCalled();
    expect(spy.info).not.toHaveBeenCalled();
    expect(spy.log).not.toHaveBeenCalled();
    expect(spy.debug).not.toHaveBeenCalled();

    spy.error.mockClear();

    logger.showHidden(1);
    expect(spy.error).not.toHaveBeenCalled();
    expect(spy.warn).toHaveBeenCalled();
    expect(spy.info).not.toHaveBeenCalled();
    expect(spy.log).not.toHaveBeenCalled();
    expect(spy.debug).not.toHaveBeenCalled();

    spy.warn.mockClear();

    logger.showHidden(2);
    expect(spy.error).not.toHaveBeenCalled();
    expect(spy.warn).not.toHaveBeenCalled();
    expect(spy.info).toHaveBeenCalled();
    expect(spy.log).not.toHaveBeenCalled();
    expect(spy.debug).not.toHaveBeenCalled();

    spy.info.mockClear();

    logger.showHidden(3);
    expect(spy.error).not.toHaveBeenCalled();
    expect(spy.warn).not.toHaveBeenCalled();
    expect(spy.info).not.toHaveBeenCalled();
    expect(spy.log).toHaveBeenCalled();
    expect(spy.debug).not.toHaveBeenCalled();

    spy.log.mockClear();

    logger.showHidden(4);
    expect(spy.error).not.toHaveBeenCalled();
    expect(spy.warn).not.toHaveBeenCalled();
    expect(spy.info).not.toHaveBeenCalled();
    expect(spy.log).not.toHaveBeenCalled();
    expect(spy.debug).toHaveBeenCalled();

    spy.debug.mockClear();

    spy.log.mockClear();

    logger.showHidden(5);
    expect(spy.error).not.toHaveBeenCalled();
    expect(spy.warn).not.toHaveBeenCalled();
    expect(spy.info).not.toHaveBeenCalled();
    expect(spy.log).toHaveBeenCalled(); // .silly() calls console.log() internally
    expect(spy.debug).not.toHaveBeenCalled();
  });

  test('`readConsole` method overrides default console methods', () => {
    const logger = new LogT(5);

    logger.readConsole();

    console.error('test error');
    expect(spy.error).toHaveBeenCalled();

    console.warn('test warn');
    expect(spy.warn).toHaveBeenCalled();

    console.info('test info');
    expect(spy.info).toHaveBeenCalled();

    console.log('test debug');
    expect(spy.debug).toHaveBeenCalled();
  });
});
