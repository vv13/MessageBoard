export default {
  method: ['GET'],
  path: '/',

  config: {
    state: {
      parse: false, // parse and store in request.state
      failAction: 'ignore', // may also be 'ignore' or 'log'
    },
    handler(request, reply) {
      const host = process.env.HOSTNAME || 'localhost';
      const webserver = process.env.NODE_ENV === 'production' ? '' : `//${host}:8080`;

      return reply(
        `<!doctype html>
        <html lang="en-us">
          <head>
            <meta charset="utf-8">
            <title>listening</title>
            <link href="${webserver}/assets/app.css" rel="stylesheet"/>
          </head>
          <body>
            <div id="app"></div>
            <script src="${webserver}/assets/app.js"></script>
          </body>
        </html>`
      );
    },
  },
};
