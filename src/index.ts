type LOG_LEVEL = 0 | 1 | 2 | 3 | 4 | 5 | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

class LogT {
  /** Log level, above which logs will be printed to console */
  private logLevel: number;
  /** Label for the log message, if any */
  private brand: string | null = null;

  constructor(logLevel: LOG_LEVEL, brand?: string) {
    if (typeof logLevel === 'string') {
      this.logLevel = LOG_LEVELS[logLevel];
    } else {
      this.logLevel = logLevel;
    }
    if (brand) {
      this.brand = brand;
    }
  }

  public getLogLevel = (): number => (this.logLevel);

  public getBrand = (): string | null => (this.brand);

  public error(message: string, ...parts: any[]) {
    console.error(message, ...parts);
  }

  public warn(message: string, ...parts: any[]) {
    console.warn(message, ...parts);
  }

  public info(message: string, ...parts: any[]) {
    console.info(message, ...parts);
  }

  public verbose(message: string, ...parts: any[]) {
    console.log(message, ...parts);
  }

  public debug(message: string, ...parts: any[]) {
    console.debug(message, ...parts);
  }

  public silly(message: string, ...parts: any[]) {
    console.log(message, ...parts);
  }
}
