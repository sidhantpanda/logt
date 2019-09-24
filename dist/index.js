"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LOG_LEVELS = {
    none: -1,
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5,
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
class LogT {
    constructor(logLevel) {
        /** Log level, above which logs will be printed to console */
        this.logLevel = LOG_LEVELS.none;
        /** Log history, which haven't yet been printed to console */
        this.history = [];
        this.log = (level, tag, message, ...parts) => {
            if (level <= this.logLevel) {
                switch (level) {
                    case LOG_LEVELS.error:
                        // eslint-disable-next-line no-console
                        console.error(`%c error %c %c ${tag} `, STYLES.error, '', STYLES.tag, message, ...parts);
                        break;
                    case LOG_LEVELS.warn:
                        // eslint-disable-next-line no-console
                        console.warn(`%c warn %c %c ${tag} `, STYLES.warn, '', STYLES.tag, message, ...parts);
                        break;
                    case LOG_LEVELS.info:
                        // eslint-disable-next-line no-console
                        console.info(`%c info %c %c ${tag} `, STYLES.info, '', STYLES.tag, message, ...parts);
                        break;
                    case LOG_LEVELS.verbose:
                        // eslint-disable-next-line no-console
                        console.log(`%c verbose %c %c ${tag} `, STYLES.verbose, '', STYLES.tag, message, ...parts);
                        break;
                    case LOG_LEVELS.debug:
                        // eslint-disable-next-line no-console
                        console.log(`%c debug %c %c ${tag} `, STYLES.debug, '', STYLES.tag, message, ...parts);
                        break;
                    case LOG_LEVELS.silly:
                        // eslint-disable-next-line no-console
                        console.log(`%c silly %c %c ${tag} `, STYLES.silly, '', STYLES.tag, message, ...parts);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(tag, message, ...parts);
                }
            }
            else {
                this.history.push({
                    level,
                    tag,
                    message,
                    parts,
                });
            }
        };
        this.getLogLevel = () => this.logLevel;
        this.setLogLevel = (logLevel) => {
            // Check if logLevel value was supplied
            if (logLevel != null) {
                if (typeof logLevel === 'string') {
                    if (LOG_LEVELS[logLevel] != null) {
                        this.logLevel = LOG_LEVELS[logLevel];
                    }
                }
                else if (typeof logLevel === 'number') {
                    if (logLevel >= LOG_LEVELS.none && logLevel <= LOG_LEVELS.silly) {
                        this.logLevel = logLevel;
                    }
                }
            }
        };
        this.error = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.error, tag, message, ...parts);
        };
        this.warn = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.warn, tag, message, ...parts);
        };
        this.info = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.info, tag, message, ...parts);
        };
        this.verbose = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.verbose, tag, message, ...parts);
        };
        this.debug = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.debug, tag, message, ...parts);
        };
        this.silly = (tag, message, ...parts) => {
            this.log(LOG_LEVELS.silly, tag, message, ...parts);
        };
        this.releaseHistory = (logLevel) => {
            const oldLogLevel = this.logLevel;
            this.logLevel = logLevel;
            const currentHistory = this.history;
            this.history = [];
            currentHistory.forEach(logItem => {
                this.log(logItem.level, logItem.tag, logItem.message, ...logItem.parts);
            });
            this.logLevel = oldLogLevel;
        };
        this.setLogLevel(logLevel);
    }
}
exports.default = LogT;
