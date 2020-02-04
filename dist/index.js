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
/**
 * Logger Class Implementation
 * @author Sidhant Panda
 *
 * Email: sidhant@panda.fyi
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
        /** Original `console.error` method */
        // eslint-disable-next-line no-console
        this.originalError = console.error;
        /** Original `console.warn` method */
        // eslint-disable-next-line no-console
        this.originalWarn = console.warn;
        /** Original `console.info` method */
        // eslint-disable-next-line no-console
        this.originalInfo = console.info;
        /** Original `console.log` method */
        // eslint-disable-next-line no-console
        this.originalLog = console.log;
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
                switch (level) {
                    case LOG_LEVELS.error:
                        this.originalError(`%c error %c %c ${tag} `, STYLES.error, '', STYLES.tag, message, ...parts);
                        break;
                    case LOG_LEVELS.warn:
                        this.originalWarn(`%c warn %c %c ${tag} `, STYLES.warn, '', STYLES.tag, message, ...parts);
                        break;
                    case LOG_LEVELS.info:
                        this.originalInfo(`%c info %c %c ${tag} `, STYLES.info, '', STYLES.tag, message, ...parts);
                        break;
                    case LOG_LEVELS.verbose:
                        this.originalLog(`%c verbose %c %c ${tag} `, STYLES.verbose, '', STYLES.tag, message, ...parts);
                        break;
                    case LOG_LEVELS.debug:
                        this.originalLog(`%c debug %c %c ${tag} `, STYLES.debug, '', STYLES.tag, message, ...parts);
                        break;
                    case LOG_LEVELS.silly:
                        this.originalLog(`%c silly %c %c ${tag} `, STYLES.silly, '', STYLES.tag, message, ...parts);
                        break;
                    // skip default case
                }
            }
            else {
                this.hidden.push({
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
        /**
         * Set instance log level.
         * @param logLevel Log level set on instance.
         * Logs which have levels less than or equal to this value will be printed to console
         */
        this.setLogLevel = (logLevel) => {
            // Check if logLevel value was supplied
            if (logLevel != null) {
                if (typeof logLevel === 'string') {
                    if (LOG_LEVELS[logLevel] != null) {
                        this.logLevel = LOG_LEVELS[logLevel];
                    }
                }
                if (typeof logLevel === 'number') {
                    if (logLevel >= LOG_LEVELS.none && logLevel <= LOG_LEVELS.silly) {
                        this.logLevel = logLevel;
                    }
                }
            }
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
                this.log(logItem.level, logItem.tag, logItem.message, ...logItem.parts);
            });
            this.setLogLevel(oldLogLevel);
        };
        /**
         * Method to override `window.console` methods
         */
        this.readConsole = () => {
            const TAG = 'console';
            // eslint-disable-next-line no-console
            console.error = (message, ...parts) => {
                this.error(TAG, message, ...parts);
            };
            // eslint-disable-next-line no-console
            console.warn = (message, ...parts) => {
                this.warn(TAG, message, ...parts);
            };
            // eslint-disable-next-line no-console
            console.info = (message, ...parts) => {
                this.info(TAG, message, ...parts);
            };
            // eslint-disable-next-line no-console
            console.log = (message, ...parts) => {
                this.debug(TAG, message, ...parts);
            };
        };
        this.setLogLevel(logLevel);
    }
}
exports.default = LogT;
