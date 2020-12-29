"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const STYLES = {
    error: 'color: white; background: #db2828; border-radius: 8px',
    warn: 'color: white; background: #fbbd08; border-radius: 8px',
    info: 'color: white; background: #c4c64f; border-radius: 8px',
    verbose: 'color: white; background: #6435c9; border-radius: 8px',
    debug: 'color: white; background: #2185d0; border-radius: 8px',
    silly: 'color: white; background: #21ba45; border-radius: 8px',
    tag: 'color: black; background: #5bfff4; border-radius: 8px'
};
var LOG_ITEM_TYPE;
(function (LOG_ITEM_TYPE) {
    LOG_ITEM_TYPE["text"] = "text";
    LOG_ITEM_TYPE["image"] = "image";
})(LOG_ITEM_TYPE || (LOG_ITEM_TYPE = {}));
/**
 * Logger Class Implementation
 * @author Sidhant Panda
 *
 * Email: `sidhant@panda.fyi`
 */
class LogT {
    /**
     * Create a LogT instance
     * @param logLevel Logger will print logs to consoles with level less than equal to this
     */
    constructor(logLevel) {
        /** Log level, above which logs will be printed to console */
        this.logLevel = LOG_LEVELS.none;
        /** Logs which are hidden - not been printed to console */
        this.hidden = [];
        this.loggerMap = {
            0: { text: 'error', logger: console.error },
            1: { text: 'warn', logger: console.warn },
            2: { text: 'info', logger: console.info },
            3: { text: 'verbose', logger: console.log },
            4: { text: 'debug', logger: console.debug },
            5: { text: 'silly', logger: console.log }
        };
        /**
         * Internal log method which prints valid logs
         * to console and add a higher level log to {LogT.hidden}
         * @param level Level of the log message
         * @param tag Tag for log
         * @param message Log message
         * @param parts Any other arguments to be passed on to `console`
         */
        this.log = (level, tag, message, ...parts) => {
            if (level <= this.logLevel) {
                if (this.loggerMap[level]) {
                    const loggerToUse = this.loggerMap[level].logger;
                    loggerToUse(`%c ${this.loggerMap[level].text} %c %c ${tag} `, STYLES[this.loggerMap[level].text], '', STYLES.tag, message, ...parts);
                }
            }
            else {
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
        this.getLogLevel = () => this.logLevel;
        this.getFinalLevel = (level) => {
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
        };
        /**
         * Set instance log level.
         * @param logLevel Log level set on instance.
         * Logs which have levels less than or equal to this value will be printed to console
         */
        this.setLogLevel = (level) => {
            // Check if logLevel value was supplied
            this.logLevel = this.getFinalLevel(level);
        };
        /**
         * Helper to print error logs
         * @param tag Log tag
         * @param message Log message
         * @param parts Any other arguments to be passed on to `console`
         */
        this.error = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.error, tag, message, ...parts);
        };
        /**
         * Helper to print warning logs
         * @param tag Log tag
         * @param message Log message
         * @param parts Any other arguments to be passed on to `console`
         */
        this.warn = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.warn, tag, message, ...parts);
        };
        /**
         * Helper to print info logs
         * @param tag Log tag
         * @param message Log message
         * @param parts Any other arguments to be passed on to `console`
         */
        this.info = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.info, tag, message, ...parts);
        };
        /**
         * Helper to print verbose logs
         * @param tag Log tag
         * @param message Log message
         * @param parts Any other arguments to be passed on to `console`
         */
        this.verbose = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.verbose, tag, message, ...parts);
        };
        /**
         * Helper to print debug logs
         * @param tag Log tag
         * @param message Log message
         * @param parts Any other arguments to be passed on to `console`
         */
        this.debug = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.debug, tag, message, ...parts);
        };
        /**
         * Helper to print silly logs
         * @param tag Log tag
         * @param message Log message
         * @param parts Any other arguments to be passed on to `console`
         */
        this.silly = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.silly, tag, message, ...parts);
        };
        /**
         * Method to print logs hidden due higher log level than set on the instance
         * @param logLevel Logs with less than or equal to this will be printed to console
         */
        this.showHidden = (logLevel) => {
            const oldLogLevel = this.logLevel;
            this.setLogLevel(logLevel);
            const currentHidden = this.hidden;
            this.hidden = [];
            currentHidden.forEach(logItem => {
                if (logItem.type === LOG_ITEM_TYPE.text) {
                    this.log(logItem.level, logItem.tag, logItem.message, ...logItem.parts);
                }
                else if (logItem.type === LOG_ITEM_TYPE.image) {
                    this.logImage(logItem.level, logItem.url, logItem.callback);
                }
            });
            this.setLogLevel(oldLogLevel);
        };
        /**
         * Method to override `window.console` methods
         */
        this.readConsole = () => {
            const TAG = 'console';
            console.error = (message, ...parts) => {
                this.error(TAG, message, ...parts);
            };
            console.warn = (message, ...parts) => {
                this.warn(TAG, message, ...parts);
            };
            console.info = (message, ...parts) => {
                this.info(TAG, message, ...parts);
            };
            console.log = (message, ...parts) => {
                this.debug(TAG, message, ...parts);
            };
        };
        this.logImage = (level, url, callback) => {
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
                    }
                    else {
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
        };
        /**
         * Prints an image from a given URL to the console or
         * @param level Log level for the image
         * @param url URL of the image
         * @param callback Get access to `Image` object during printing to console. For testing only
         */
        this.image = (level, url, callback) => {
            this.logImage(this.getFinalLevel(level), url, callback);
        };
        this.setLogLevel(logLevel);
    }
}
exports.default = LogT;
