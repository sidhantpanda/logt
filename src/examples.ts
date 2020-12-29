import LogT from '.';

const TAG = 'main.xs';

const runExamples = () => {
  const logger = new LogT(5);
  logger.error(TAG, new Error('example error'));
  logger.warn(TAG, 'example warning');
  logger.info(TAG, 'example info');
  logger.verbose(TAG, 'example verbose');
  logger.debug(TAG, 'example debug');
  logger.silly(TAG, 'example silly');
};

export default runExamples;
