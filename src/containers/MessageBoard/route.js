if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import { injectAsyncReducer } from 'store';


export default function createRoutes(store) {
  return {
    path: 'messageboard',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        injectAsyncReducer(store, 'messageboard', require('./reducer').default);

        cb(null, require('./MessageBoard').default);
      });
    },
  };
}
