import { partition } from '../helper';

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
  tag: string;
  message: string;
  parts: any[]
}

export default class LogT {
  /** Log level, above which logs will be printed to console */
  private logLevel: number = -1;
  /** Label for the log message, if any */
  private readonly brand: string | null = null;
  /** Log history, which haven't yet been printed to console */
  private history: ILogItem[] = [];

  constructor(logLevel: LOG_LEVEL, brand?: string) {
    this.setLogLevel(logLevel);

    if (brand) {
      this.brand = brand;
    }
  }

  private log(level: number, tag: string, message: any, ...parts: any[]) {
    if (level <= this.logLevel) {
      switch (level) {
        case LOG_LEVELS.error:
          console.error(tag, message, ...parts);
          break;

        case LOG_LEVELS.warn:
          console.warn(tag, message, ...parts);
          break;

        case LOG_LEVELS.info:
          console.info(tag, message, ...parts);
          break;

        case LOG_LEVELS.verbose:
          console.log(tag, message, ...parts);
          break;

        case LOG_LEVELS.debug:
          console.log(tag, message, ...parts);
          break;

        case LOG_LEVELS.silly:
          console.log(tag, message, ...parts);
          break;

        default:
          console.log(tag, message, ...parts);
      }
    } else {
      this.history.push({
        level,
        tag,
        message,
        parts
      });
    }
  }

  public getLogLevel = (): number => this.logLevel;

  public setLogLevel = (logLevel: LOG_LEVEL) => {
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
  };

  public getBrand = (): string | null => this.brand;

  public error = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.error, tag, message, ...parts);
  };

  public warn = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.warn, tag, message, ...parts);
  };

  public info = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.info, tag, message, ...parts);
  };

  public verbose = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.verbose, tag, message, ...parts);
  };

  public debug = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.debug, tag, message, ...parts);
  };

  public silly = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.silly, tag, message, ...parts);
  };

  public releaseHistory = (logLevel: number) => {
    const oldLogLevel = this.logLevel;
    this.logLevel = logLevel;

    const [pass, fail] = partition<ILogItem>(this.history, logItem => logItem.level <= this.logLevel);

    this.history = fail;
    pass.forEach((logItem: ILogItem) => {
      this.log(logItem.level, logItem.tag, logItem.message, logItem.parts);
    });

    this.logLevel = oldLogLevel;
  };
}
