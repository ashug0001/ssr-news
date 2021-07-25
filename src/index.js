const dotenv = require('dotenv');

const DOT_ENV_CONFIG = dotenv.config();
if (DOT_ENV_CONFIG.error) {
  throw DOT_ENV_CONFIG.error;
}

const http = require('http');
const app = require('./server').default;

const port = process.env.PORT || 7080;

const startApplication = () => {
  const server = http.createServer(app);

  let currentApp = app;
  server.listen(port, error => {
    if (error) {
      console.log('SERVER_LISTEN_ERROR', {
        error,
      });
    }
  });

  if (module.hot) {
    console.log('✅  Server-side Hot Module Replacement enabled');

    module.hot.accept('./server', () => {
      console.log('🔁  Hot Module Replacement reloading `./server`...');
      server.removeListener('request', currentApp);
      const newApp = require('./server').default; // eslint-disable-line global-require
      server.on('request', newApp);
      currentApp = newApp;
    });
  }
};

const startServer = () => {
  if (process.env.NODE_ENV !== 'production') {
    startApplication();
  }
};

startServer();
