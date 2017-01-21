// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

// import Foo from 'containers/Foo';
import MessageBoard from 'containers/MessageBoard';

export function createRoutes() {
  return {
    path: '/',
    component: MessageBoard,
  };
}
