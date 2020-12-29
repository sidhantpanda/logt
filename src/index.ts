/** Valid logLevel values */
export type LOG_LEVEL = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 'none' | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

/** Log level string to number map */
const LOG_LEVELS = {
  none: -1,
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

/** All CSS requried to print labels */
const STYLES: { [key: string]: string } = {
  error: 'color: white; background: #db2828; border-radius: 8px',
  warn: 'color: white; background: #fbbd08; border-radius: 8px',
  info: 'color: white; background: #c4c64f; border-radius: 8px',
  verbose: 'color: white; background: #6435c9; border-radius: 8px',
  debug: 'color: white; background: #2185d0; border-radius: 8px',
  silly: 'color: white; background: #21ba45; border-radius: 8px',
  tag: 'color: black; background: #5bfff4; border-radius: 8px'
};

enum LOG_ITEM_TYPE {
  text = 'text',
  image = 'image'
}

/**
 * Log item interface
 * This is the data structure for hidden logs
 */
interface ILogItemText {
  /** Type of message */
  type: LOG_ITEM_TYPE.text;
  /** Log level of message */
  level: number;
  /** Log tag for the message */
  tag: string;
  /** Log message */
  message: string;
  /** Additional arguments passed on to `console` methods */
  parts: any[];
  /** URL of image if type is image */
  url?: string;
}

interface ILogItemImage {
  type: LOG_ITEM_TYPE.image;
  level: number;
  url: string;
  callback?: { (image: HTMLImageElement): void };
}

type ILogItem = ILogItemText | ILogItemImage;

/**
 * Console method interface
 */
interface IConsoleMethod {
  /**
   * Print messages to console
   * @param message Log message
   * @param optionalParams Additional arguments to be printed
   */
  // eslint-disable-next-line no-unused-vars
  (message?: any, ...optionalParams: any[]): void
}

/**
 * Logger Class Implementation
 * @author Sidhant Panda
 *
 * Email: `sidhant@panda.fyi`
 */
export default class LogT {
  /** Log level, above which logs will be printed to console */
  private logLevel: number = LOG_LEVELS.none;

  /** Logs which are hidden - not been printed to console */
  private hidden: ILogItem[] = [];

  private loggerMap: { [key: number]: { text: string, logger: IConsoleMethod } } = {
    0: { text: 'error', logger: console.error },
    1: { text: 'warn', logger: console.warn },
    2: { text: 'info', logger: console.info },
    3: { text: 'verbose', logger: console.log },
    4: { text: 'debug', logger: console.debug },
    5: { text: 'silly', logger: console.log }
  };

  /**
   * Create a LogT instance
   * @param logLevel Logger will print logs to consoles with level less than equal to this
   */
  constructor(logLevel: LOG_LEVEL) {
    this.setLogLevel(logLevel);
  }

  /**
   * Internal log method which prints valid logs
   * to console and add a higher level log to {LogT.hidden}
   * @param level Level of the log message
   * @param tag Tag for log
   * @param message Log message
   * @param parts Any other arguments to be passed on to `console`
   */
  private log = (level: number, tag: string, message: any, ...parts: any[]) => {
    if (level <= this.logLevel) {
      if (this.loggerMap[level]) {
        const loggerToUse = this.loggerMap[level].logger;
        loggerToUse(
          `%c ${this.loggerMap[level].text} %c %c ${tag} `,
          STYLES[this.loggerMap[level].text],
          '',
          STYLES.tag,
          message,
          ...parts
        );
      }
    } else {
      this.hidden.push({
        type: LOG_ITEM_TYPE.text,
        level,
        tag,
        message,
        parts
      });
    }
  };

  /**
   * Get instance log level
   */
  public getLogLevel = (): number => this.logLevel;

  private getFinalLevel = (level: LOG_LEVEL): number => {
    if (level != null) {
      if (typeof level === 'string') {
        if (LOG_LEVELS[level] != null) {
          return LOG_LEVELS[level];
        }
      }
      if (typeof level === 'number') {
        if (level >= LOG_LEVELS.none && level <= LOG_LEVELS.silly) {
          return level;
        }
      }
    }
    return LOG_LEVELS.none;
  }

  /**
   * Set instance log level.
   * @param logLevel Log level set on instance.
   * Logs which have levels less than or equal to this value will be printed to console
   */
  public setLogLevel = (level: LOG_LEVEL) => {
    // Check if logLevel value was supplied
    this.logLevel = this.getFinalLevel(level);
  };

  /**
   * Helper to print error logs
   * @param tag Log tag
   * @param message Log message
   * @param parts Any other arguments to be passed on to `console`
   */
  public error = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.error, tag, message, ...parts);
  };

  /**
   * Helper to print warning logs
   * @param tag Log tag
   * @param message Log message
   * @param parts Any other arguments to be passed on to `console`
   */
  public warn = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.warn, tag, message, ...parts);
  };

  /**
   * Helper to print info logs
   * @param tag Log tag
   * @param message Log message
   * @param parts Any other arguments to be passed on to `console`
   */
  public info = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.info, tag, message, ...parts);
  };

  /**
   * Helper to print verbose logs
   * @param tag Log tag
   * @param message Log message
   * @param parts Any other arguments to be passed on to `console`
   */
  public verbose = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.verbose, tag, message, ...parts);
  };

  /**
   * Helper to print debug logs
   * @param tag Log tag
   * @param message Log message
   * @param parts Any other arguments to be passed on to `console`
   */
  public debug = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.debug, tag, message, ...parts);
  };

  /**
   * Helper to print silly logs
   * @param tag Log tag
   * @param message Log message
   * @param parts Any other arguments to be passed on to `console`
   */
  public silly = (tag: string, message: any, ...parts: any[]) => {
    this.log(LOG_LEVELS.silly, tag, message, ...parts);
  };

  /**
   * Method to print logs hidden due higher log level than set on the instance
   * @param logLevel Logs with less than or equal to this will be printed to console
   */
  public showHidden = (logLevel: LOG_LEVEL) => {
    const oldLogLevel = this.logLevel;
    this.setLogLevel(logLevel);

    const currentHidden = this.hidden;
    this.hidden = [];

    currentHidden.forEach(logItem => {
      if (logItem.type === LOG_ITEM_TYPE.text) {
        this.log(logItem.level, logItem.tag, logItem.message, ...logItem.parts);
      } else if (logItem.type === LOG_ITEM_TYPE.image) {
        this.logImage(logItem.level, logItem.url, logItem.callback);
      }
    });

    this.setLogLevel((oldLogLevel as LOG_LEVEL));
  };

  /**
   * Method to override `window.console` methods
   */
  public readConsole = () => {
    const TAG = 'console';
    console.error = (message?: any, ...parts: any[]) => {
      this.error(TAG, message, ...parts);
    };

    console.warn = (message?: any, ...parts: any[]) => {
      this.warn(TAG, message, ...parts);
    };

    console.info = (message?: any, ...parts: any[]) => {
      this.info(TAG, message, ...parts);
    };

    console.log = (message?: any, ...parts: any[]) => {
      this.debug(TAG, message, ...parts);
    };
  };

  private logImage = (level: number, url: string,
    callback?: { (image: HTMLImageElement): void }) => {
    const image = new Image();
    let loaded = false;

    image.onload = () => {
      if (!loaded) {
        loaded = true;
        const style = [
          'font-size: 1px;',
          `line-height: ${image.height % 2}px;`,
          `padding: ${image.height * 0.5}px ${image.width * 0.5}px;`,
          `background-size: ${image.width}px ${image.height}px;`,
          `background: url('${url}') no-repeat;`
        ].join(' ');

        if (level <= this.logLevel) {
          let loggerToUse = this.loggerMap[LOG_LEVELS.verbose].logger;
          if (this.loggerMap[level]) {
            loggerToUse = this.loggerMap[level].logger;
          }
          loggerToUse('%c ', style);
        } else {
          this.hidden.push({
            type: LOG_ITEM_TYPE.image,
            level,
            url,
            callback
          });
        }
      }
    };

    // Actually loads the image
    image.src = url;
    if (callback) {
      callback(image);
    }
  }

  /**
   * Prints an image from a given URL to the console or
   * @param level Log level for the image
   * @param url URL of the image
   * @param callback Get access to `Image` object during printing to console. For testing only
   */
  public image = (level: LOG_LEVEL, url: string,
    callback?: { (image: HTMLImageElement): void }) => {
    this.logImage(this.getFinalLevel(level), url, callback);
  }
}
