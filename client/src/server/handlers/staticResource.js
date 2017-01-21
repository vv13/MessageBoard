export default {
  method: 'GET',
  path: '/{params*}',
  config: {
    handler: {
      directory: {
        path: 'src/server/public',
      },
    },
  },
};
