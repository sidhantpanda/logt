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

### Include in HTML
```javascript
<script src="logt.min.js"></script>
<script>
var LOG_TAG = 'sample tag';
var logger = createLogger('error');

logger.error(LOG_TAG, new Error('example error'));
</script>
```
