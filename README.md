<a href="https://www.npmjs.com/package/logt">
  <img src="https://badge.fury.io/js/logt.svg" alt="npm version" />
</a>
<a href="https://david-dm.org/sidhantpanda/logt">
  <img src="https://david-dm.org/sidhantpanda/logt.svg" alt="Dependency Status" />
</a>
<a href="https://david-dm.org/sidhantpanda/logt#info=devDependencies">
  <img src="https://david-dm.org/sidhantpanda/logt/dev-status.svg" alt="devDependency Status" />
</a>
<a href="https://travis-ci.org/sidhantpanda/logt">
  <img src="https://travis-ci.org/sidhantpanda/logt.svg?branch=master" alt="Build Status" />
</a>
<a href="https://codecov.io/gh/sidhantpanda/logt">
  <img src="https://codecov.io/gh/sidhantpanda/logt/branch/master/graph/badge.svg" />
</a>
<a href="https://snyk.io//test/github/sidhantpanda/logt?targetFile=package.json">
  <img src="https://snyk.io//test/github/sidhantpanda/logt/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io//test/github/sidhantpanda/logt?targetFile=package.json" style="max-width:100%;">
</a>

# LogT

🖥️ A colorful logger for the browser

<p align="center">
  <img src="https://i.imgur.com/efMwTMd.png" />
</p>

## Features

- **Small library size** - Only ~1.3KB gzipped!
- **Colorful labels** to help distinguish logs by importance.
- **[Override default console methods](#readconsole)** to use custom logger instead, anywhere on the web page
- **[Log levels](#logger-initialization)** to hide less important log messages.
- **[Show hidden messages programmatically](#showhiddenloglevel--1--0--1--2--3--4--5--none--error--warn--info--verbose--debug--silly)** to print logs hidden due log level.
- **Built with TypeScript** for detailed type info and that sweet sweet autocomplete.
  <p align="center">
    <img src="https://media.giphy.com/media/ckNv6K3sRo8dWOUtH7/giphy.gif" />
  </p>

## Installation

```
$ npm i logt -S
```

## Usage

You can use this logger for your frontend projects. You can choose as an ES6 module or directly include the script in HTML.

#### As an ES6 module

Create a file in your project called `logger.js` or `logger.ts`

```typescript
import LogT from "logt";

const LOG_TAG = "sample tag";
let logger;
if (process.env.NODE_ENV === "production") {
  logger = new LogT("error"); // or logger = new LogT("none");
} else {
  logger = new LogT("silly");
}

// See documentation for `readConsole()` for usage
// uncomment following line if you want to override default console methods
// logger.readConsole();

logger.error(LOG_TAG, new Error("example error"));

export default logger;

```

#### Include in HTML

```javascript
<script src="https://cdn.jsdelivr.net/gh/sidhantpanda/logt/dist/logt.min.js"></script>
<script>
  var LOG_TAG = 'sample tag';
  var logger = createLogger('error');

  // See documentation for `readConsole()` for usage
  // uncomment following line if you want to override default console methods
  // logger.readConsole();

  logger.error(LOG_TAG, new Error('example error'));
</script>
```

## Documentation

#### Logger initialization

```typescript
import LogT from "logt";

let noneLogger,
  errorLogger,
  warnLogger,
  infoLogger,
  verboseLogger,
  debugLogger,
  sillyLogger;
// Available log levels -  -1 | 0 | 1 | 2 | 3 | 4 | 5 | 'none' | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

// noneLogger will print nothing
noneLogger = new LogT(-1); // or
noneLogger = new LogT("none");
// if included via HTML script
noneLogger = createLogger(-1); // or
noneLogger = createLogger("none");

// errorLogger will only error messages
errorLogger = new LogT(0); // or
errorLogger = new LogT("error");
// if included via HTML script
errorLogger = createLogger(0); // or
errorLogger = createLogger("error");

// warnLogger will print errors and warning messages
warnLogger = new LogT(1); // or
warnLogger = new LogT("warn");
// if included via HTML script
warnLogger = createLogger(1); // or
warnLogger = createLogger("warn");

// infoLogger will print errors, warning, and info messages
infoLogger = new LogT(2); // or
infoLogger = new LogT("info");
// if included via HTML script
infoLogger = createLogger(2); // or
infoLogger = createLogger("info");

// verboseLogger will print errors, warning, info and verbose messages
verboseLogger = new LogT(3); // or
verboseLogger = new LogT("verbose");
// if included via HTML script
verboseLogger = createLogger(3); // or
verboseLogger = createLogger("verbose");

// debugLogger will print errors, warning, info, verbose and debug messages
debugLogger = new LogT(4); // or
debugLogger = new LogT("debug");
// if included via HTML script
debugLogger = createLogger(4); // or
debugLogger = createLogger("debug");

// sillyLogger will print all messages
sillyLogger = new LogT(5); // or
sillyLogger = new LogT("silly");
// if included via HTML script
sillyLogger = createLogger(5); // or
sillyLogger = createLogger("silly");
```

If any other value is supplied to the constructor, a default value of `none` is used.

### APIs

#### `error(logTag: string, message: any, ...rest: any[])`

##### Parameters

- `logTag` - A log tag to identify the message and point to source of the message.
- `message` - The error log message
- `...rest` - Any additional arguments to be passed onto `console.error`

#### `warn(logTag: string, message: any, ...rest: any[])`

##### Parameters

- `logTag` - A log tag to identify the message and point to source of the message.
- `message` - The warning log message
- `...rest` - Any additional arguments to be passed onto `console.warn`

#### `info(logTag: string, message: any, ...rest: any[])`

##### Parameters

- `logTag` - A log tag to identify the message and point to source of the message.
- `message` - The info log message
- `...rest` - Any additional arguments to be passed onto `console.info`

#### `verbose(logTag: string, message: any, ...rest: any[])`

##### Parameters

- `logTag` - A log tag to identify the message and point to source of the message.
- `message` - The verbose log message
- `...rest` - Any additional arguments to be passed onto `console.log`

#### `debug(logTag: string, message: any, ...rest: any[])`

##### Parameters

- `logTag` - A log tag to identify the message and point to source of the message.
- `message` - The debug log message
- `...rest` - Any additional arguments to be passed onto `console.log`

#### `silly(logTag: string, message: any, ...rest: any[])`

##### Parameters

- `logTag` - A log tag to identify the message and point to source of the message.
- `message` - The silly log message
- `...rest` - Any additional arguments to be passed onto `console.log`

#### `getLogLevel(): number`

Returns the logger instance's log level in numeric form;

#### `setLogLevel(logLevel: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 'none' | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly')`

Update a logger instance's logLevel dynamically later.

##### Parameters

- `logLevel` - New logLevel for the instance

#### `showHidden(logLevel: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 'none' | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly')`

Show log messages hidden by the logger. Only logs equal or above `logLevel` will be shown.

##### Parameters

- `logLevel` - Log level for which logs are to be shown

##### Example

```typescript
const logger = new LogT(0);
logger.warn("TAG", "warning message"); // Will not print anything to console
logger.info("TAG", "info message"); // Will not print anything to console
logger.debug("TAG", "debug message"); // Will not print anything to console
logger.silly("TAG", "silly message"); // Will not print anything to console

logger.showHidden(1); // Will print the warning message
logger.showHidden(2); // Will print the info message
logger.showHidden(5); // Will print the debug as well as silly message
```

#### `readConsole()`

Replace default `console.error`, `console.warn`, `console.info`, `console.log` implementation with `logt` logger.

##### Example

```typescript
const logger = new LogT(0);
logger.readConsole();

console.error(new Error("test error")); // will be same as logger.error('console', new Error('test error'));
console.warn("warn message"); // will be same as logger.warn('console', 'warn message');
console.log("info message"); // will be same as logger.info('console', 'info message');
console.log("log message"); // will be same as logger.debug('console', 'log message');
```

## Changelog

### v1.2.0

- [Added `readConsole()` method](#readconsole)

## Roadmap

Checkout the [project page](https://github.com/sidhantpanda/logt/projects/1) for details about future development.
