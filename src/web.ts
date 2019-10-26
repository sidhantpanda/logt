import LogT, { LOG_LEVEL } from '.';

if (window) {
  (window as any)['createLogger'] = (logLevel: LOG_LEVEL): LogT => {
    return new LogT(logLevel);
  };
}

// TODO remove this
const x = new LogT(0);
x.img(0, 'https://media.giphy.com/media/rVbAzUUSUC6dO/source.gif');