const TAG = '[redux-undone]';

type LogLevel = 'error' | 'warn' | 'log';

const log = (payload: any, level: LogLevel = 'log') =>
  console[level](`${TAG}: `, payload);

export default { log };
