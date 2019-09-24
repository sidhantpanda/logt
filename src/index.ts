import LogT from './lib/logt';

if (window) {
  (window as any)['logt'] = LogT;
}

export default LogT;
