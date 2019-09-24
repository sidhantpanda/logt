export declare type LOG_LEVEL = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 'none' | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';
export default class LogT {
    /** Log level, above which logs will be printed to console */
    private logLevel;
    /** Logs which are hidden - not been printed to console */
    private hidden;
    constructor(logLevel: LOG_LEVEL);
    private log;
    getLogLevel: () => number;
    setLogLevel: (logLevel: LOG_LEVEL) => void;
    error: (tag: string, message: any, ...parts: any[]) => void;
    warn: (tag: string, message: any, ...parts: any[]) => void;
    info: (tag: string, message: any, ...parts: any[]) => void;
    verbose: (tag: string, message: any, ...parts: any[]) => void;
    debug: (tag: string, message: any, ...parts: any[]) => void;
    silly: (tag: string, message: any, ...parts: any[]) => void;
    showHidden: (logLevel: LOG_LEVEL) => void;
}