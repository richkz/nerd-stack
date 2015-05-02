'use strict';

const debug = require('debug')('NERD-seed:server');
const port = normalizePort(process.env.PORT || '3000');
let app = require('./../../app');
let http = require('http');

app.set('port', port);

let server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const returnable = parseInt(val, 10);

  if (isNaN(returnable)) {
    // named pipe
    return val;
  }

  if (returnable >= 0) {
    // port number
    return returnable;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      error.message = error.message + '. ' + bind + ' requires elevated privileges';
      throw error;
    case 'EADDRINUSE':
      error.message = error.message + '. ' + bind + ' is already in use';
      throw error;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

process.on('SIGTERM', function () {
  server.close();
});
