import express from 'express';
import compression from 'compression';
import helmet from 'helmet';

const fs = require('fs');
const morgan = require('morgan');

const server = express();

class LoggerStream {
  write(message) {
    console.log(message.substring(0, message.lastIndexOf('\n')));
  }
}

server
  .disable('x-powered-by')
  .use(
    morgan('tiny', {
      skip: (req, res) => res.statusCode === 200,
      stream: new LoggerStream(),
    }),
  )
  .use(compression())
  .use(
    helmet({
      frameguard: { action: 'deny' },
      contentSecurityPolicy: false,
    }),
  );

server.get('/', (req, res) => {
  res.send('<h1>Hello From Node</h1>');
});

export default server;
