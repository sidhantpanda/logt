type LOG_LEVEL = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

interface ILogItem {
  level: number;
  message: string;
  parts: any[]
}

export default class LogT {
  /** Log level, above which logs will be printed to console */
  private readonly logLevel: number = -1;
  /** Label for the log message, if any */
  private readonly brand: string | null = null;
  /** Log history, which haven't yet been printed to console */
  private history: ILogItem[] = [];

  constructor(logLevel: LOG_LEVEL, brand?: string) {
    // Check if logLevel value was supplied
    if (logLevel != null) {
      if (typeof logLevel === 'string') {
        if (LOG_LEVELS[logLevel] != null) {
          this.logLevel = LOG_LEVELS[logLevel];
        }
      } else { // noinspection SuspiciousTypeOfGuard
        if (typeof logLevel === 'number') {
          if (logLevel >= -1 && logLevel <= 5) {
            this.logLevel = logLevel;
          }
        }
      }
    }

    if (brand) {
      this.brand = brand;
    }
  }

  private log(level: number, message: string, ...parts: any[]) {
    if (level <= this.logLevel) {
      switch (level) {
        case LOG_LEVELS.error:
          console.error(message, ...parts);
          break;

        case LOG_LEVELS.warn:
          console.warn(message, ...parts);
          break;

        case LOG_LEVELS.info:
          console.info(message, ...parts);
          break;

        case LOG_LEVELS.verbose:
          console.log(message, ...parts);
          break;

        case LOG_LEVELS.debug:
          console.log(message, ...parts);
          break;

        case LOG_LEVELS.silly:
          console.log(message, ...parts);
          break;

        default:
          console.log(message, ...parts);
      }
    } else {
      this.history.push({
        level,
        message,
        parts
      });
    }
  }

  public getLogLevel = (): number => this.logLevel;

  public getBrand = (): string | null => this.brand;

  public error = (message: string, ...parts: any[]) => {
    this.log(LOG_LEVELS.error, message, ...parts);
  };

  public warn = (message: string, ...parts: any[]) => {
    this.log(LOG_LEVELS.warn, message, ...parts);
  };

  public info = (message: string, ...parts: any[]) => {
    this.log(LOG_LEVELS.info, message, ...parts);
  };

  public verbose = (message: string, ...parts: any[]) => {
    this.log(LOG_LEVELS.verbose, message, ...parts);
  };

  public debug = (message: string, ...parts: any[]) => {
    this.log(LOG_LEVELS.debug, message, ...parts);
  };

  public silly = (message: string, ...parts: any[]) => {
    this.log(LOG_LEVELS.silly, message, ...parts);
  };
}
