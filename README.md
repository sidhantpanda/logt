<!-- Dependency Status -->
<a href="https://david-dm.org/sidhantpanda/logt">
  <img src="https://david-dm.org/sidhantpanda/logt.svg" alt="Dependency Status" />
</a>
<!-- devDependency Status -->
<a href="https://david-dm.org/sidhantpanda/logt#info=devDependencies">
  <img src="https://david-dm.org/sidhantpanda/logt/dev-status.svg" alt="devDependency Status" />
</a>
<a href="https://travis-ci.org/sidhantpanda/logt">
  <img src="https://travis-ci.org/sidhantpanda/logt.svg?branch=master" alt="Build Status" />
</a>
<a href="https://snyk.io//test/github/sidhantpanda/logt?targetFile=package.json">
  <img src="https://snyk.io//test/github/sidhantpanda/logt/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io//test/github/sidhantpanda/logt?targetFile=package.json" style="max-width:100%;">
</a>

# LogT

🖥️ A colourful logger for the browser

<p align="center">
  <img src="https://i.imgur.com/efMwTMd.png" />
</p>

## Usage

You can use this logger for your frontend projects. You can choose as an ES6 module or directly include the script in HTML.

#### As an ES6 module
```typescript
import LogT from 'logt';

const LOG_TAG = 'sample tag';
const logger = new LogT('error');

logger.error(LOG_TAG, new Error('example error'));
```

#### Include in HTML
```javascript
<script src="logt.min.js"></script>
<script>
var LOG_TAG = 'sample tag';
var logger = createLogger('error');

logger.error(LOG_TAG, new Error('example error'));
</script>
```

## Documentation

#### Logger initialization
```typescript
import LogT from 'logt';

let noneLogger, errorLogger, warnLogger, infoLogger, verboseLogger, debugLogger, sillyLogger;
// Available log levels -  -1 | 0 | 1 | 2 | 3 | 4 | 5 | 'none' | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

// noneLogger will print nothing
noneLogger = new LogT(-1); // or
noneLogger = new LogT('none');
// if included via HTML script
noneLogger = createLogger(-1); // or
noneLogger = createLogger('none');


// errorLogger will only error messages
errorLogger = new LogT(0); // or
errorLogger = new LogT('error');
// if included via HTML script
errorLogger = createLogger(0); // or
errorLogger = createLogger('error');


// warnLogger will print errors and warning messages
warnLogger = new LogT(1); // or
warnLogger = new LogT('warn');
// if included via HTML script
warnLogger = createLogger(1); // or
warnLogger = createLogger('warn');


// infoLogger will print errors, warning, and info messages
infoLogger = new LogT(2); // or
infoLogger = new LogT('info');
// if included via HTML script
infoLogger = createLogger(2); // or
infoLogger = createLogger('info');


// verboseLogger will print errors, warning, info and verbose messages
verboseLogger = new LogT(3); // or
verboseLogger = new LogT('verbose');
// if included via HTML script
verboseLogger = createLogger(3); // or
verboseLogger = createLogger('verbose');


// debugLogger will print errors, warning, info, verbose and debug messages
debugLogger = new LogT(4); // or
debugLogger = new LogT('debug');
// if included via HTML script
debugLogger = createLogger(4); // or
debugLogger = createLogger('debug');


// sillyLogger will print all messages
sillyLogger = new LogT(5); // or
sillyLogger = new LogT('silly');
// if included via HTML script
sillyLogger = createLogger(5); // or
sillyLogger = createLogger('silly');
```
If any other value is supplied to the constructor, a default value of `none` is used.

### APIs

#### 1. error(logTag: string, message: any, ...rest: any[])

##### Parameters
* logTag - A log tag to identify the message and point to source of the message.
* message - The error log message
* ...rest - Any additional arguments to be passed onto `console.error`

#### 2. warn(logTag: string, message: any, ...rest: any[])

##### Parameters
* logTag - A log tag to identify the message and point to source of the message.
* message - The warning log message
* ...rest - Any additional arguments to be passed onto `console.warn`

#### 3. info(logTag: string, message: any, ...rest: any[])

##### Parameters
* logTag - A log tag to identify the message and point to source of the message.
* message - The info log message
* ...rest - Any additional arguments to be passed onto `console.info`

#### 4. verbose(logTag: string, message: any, ...rest: any[])

##### Parameters
* logTag - A log tag to identify the message and point to source of the message.
* message - The verbose log message
* ...rest - Any additional arguments to be passed onto `console.log`

#### 5. debug(logTag: string, message: any, ...rest: any[])

##### Parameters
* logTag - A log tag to identify the message and point to source of the message.
* message - The debug log message
* ...rest - Any additional arguments to be passed onto `console.log`

#### 6. silly(logTag: string, message: any, ...rest: any[])

##### Parameters
* logTag - A log tag to identify the message and point to source of the message.
* message - The silly log message
* ...rest - Any additional arguments to be passed onto `console.log`

#### 7. getLogLevel(): number

Returns the logger instance's log level in numeric form;

#### 8. setLogLevel(logLevel: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 'none' | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly')

Update a logger instance's logLevel dynamically later.
##### Parameters
* logLevel - New logLevel for the instance 

#### 8. releaseHistory(logLevel: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 'none' | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly')

Release historical logger from the instance which were not printed to the console. Only logs equal or above `logLevel` will be released.
##### Parameters
* logLevel - Log level for which logs are to be printed
 
