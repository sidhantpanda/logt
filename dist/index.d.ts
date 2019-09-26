/** Valid logLevel values */
export declare type LOG_LEVEL = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 'none' | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';
/** Logger Class */
export default class LogT {
    /** Log level, above which logs will be printed to console */
    private logLevel;
    /** Logs which are hidden - not been printed to console */
    private hidden;
    /** Original `console.error` method */
    private originalError;
    /** Original `console.warn` method */
    private originalWarn;
    /** Original `console.info` method */
    private originalInfo;
    /** Original `console.log` method */
    private originalLog;
    /**
     * Create a LogT instance
     * @param logLevel Logger will print logs to consoles with level less than equal to this
     */
    constructor(logLevel: LOG_LEVEL);
    /**
     * Internal log method which prints valid logs
     * to console and add a higher level log to {LogT.hidden}
     * @param level Level of the log message
     * @param tag Tag for log
     * @param message Log message
     * @param parts Any other arguments to be passed on to `console`
     */
    private log;
    /**
     * Get instance log level
     */
    getLogLevel: () => number;
    /**
     * Set instance log level.
     * @param logLevel Log level set on instance.
     * Logs which have levels less than or equal to this value will be printed to console
     */
    setLogLevel: (logLevel: LOG_LEVEL) => void;
    /**
     * Helper to print error logs
     * @param tag Log tag
     * @param message Log message
     * @param parts Any other arguments to be passed on to `console`
     */
    error: (tag: string, message: any, ...parts: any[]) => void;
    /**
     * Helper to print warning logs
     * @param tag Log tag
     * @param message Log message
     * @param parts Any other arguments to be passed on to `console`
     */
    warn: (tag: string, message: any, ...parts: any[]) => void;
    /**
     * Helper to print info logs
     * @param tag Log tag
     * @param message Log message
     * @param parts Any other arguments to be passed on to `console`
     */
    info: (tag: string, message: any, ...parts: any[]) => void;
    /**
     * Helper to print verbose logs
     * @param tag Log tag
     * @param message Log message
     * @param parts Any other arguments to be passed on to `console`
     */
    verbose: (tag: string, message: any, ...parts: any[]) => void;
    /**
     * Helper to print debug logs
     * @param tag Log tag
     * @param message Log message
     * @param parts Any other arguments to be passed on to `console`
     */
    debug: (tag: string, message: any, ...parts: any[]) => void;
    /**
     * Helper to print silly logs
     * @param tag Log tag
     * @param message Log message
     * @param parts Any other arguments to be passed on to `console`
     */
    silly: (tag: string, message: any, ...parts: any[]) => void;
    /**
     * Method to print logs hidden due higher log level than set on the instance
     * @param logLevel Logs with less than or equal to this will be printed to console
     */
    showHidden: (logLevel: LOG_LEVEL) => void;
    /**
     * Method to override `window.console` methods
     */
    readConsole: () => void;
}
