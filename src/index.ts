export type LOG_LEVEL = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 'none' | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

const LOG_LEVELS = {
  none: -1,
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

const STYLES = {
  error: 'color: white; background: #db2828; border-radius: 8px',
  warn: 'color: white; background: #fbbd08; border-radius: 8px',
  info: 'color: white; background: #c4c64f; border-radius: 8px',
  verbose: 'color: white; background: #6435c9; border-radius: 8px',
  debug: 'color: white; background: #2185d0; border-radius: 8px',
  silly: 'color: white; background: #21ba45; border-radius: 8px',
  tag: 'color: black; background: #5bfff4; border-radius: 8px',
};

interface ILogItem {
  level: number;
  tag: string;
  message: string;
  parts: any[];
}

export default class LogT {
  /** Log level, above which logs will be printed to console */
  private logLevel: number = LOG_LEVELS.none;
  /** Log history, which haven't yet been printed to console */
  private history: ILogItem[] = [];

  constructor(logLevel: LOG_LEVEL) {
    this.setLogLevel(logLevel);
  }

  private log = (level: number, tag: string, message: any, ...parts: any[]) => {
    if (level <= this.logLevel) {
      switch (level) {
        case LOG_LEVELS.error:
          console.error(`%c error %c %c ${tag} `, STYLES.error, '', STYLES.tag, message, ...parts);
          break;

        case LOG_LEVELS.warn:
          console.warn(`%c warn %c %c ${tag} `, STYLES.warn, '', STYLES.tag, message, ...parts);
          break;

        case LOG_LEVELS.info:
          console.info(`%c info %c %c ${tag} `, STYLES.info, '', STYLES.tag, message, ...parts);
          break;

        case LOG_LEVELS.verbose:
          console.log(`%c verbose %c %c ${tag} `, STYLES.verbose, '', STYLES.tag, message, ...parts);
          break;

        case LOG_LEVELS.debug:
          console.log(`%c debug %c %c ${tag} `, STYLES.debug, '', STYLES.tag, message, ...parts);
          break;

        case LOG_LEVELS.silly:
          console.log(`%c silly %c %c ${tag} `, STYLES.silly, '', STYLES.tag, message, ...parts);
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
      } else if (typeof logLevel === 'number') {
        if (logLevel >= LOG_LEVELS.none && logLevel <= LOG_LEVELS.silly) {
          this.logLevel = logLevel;
        }
      }
    }
  };

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

    const currentHistory = this.history;
    this.history = [];

    currentHistory.forEach(logItem => {
      this.log(logItem.level, logItem.tag, logItem.message, ...logItem.parts);
    });

    this.logLevel = oldLogLevel;
  };
}
