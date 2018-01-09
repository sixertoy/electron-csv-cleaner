/* eslint
  no-console: 0 */
const net = require('net');
const { exec } = require('child_process');

let startedElectron = false;
const client = new net.Socket();
const port = process.env.PORT
  ? (process.env.PORT - 100)
  : 3000;
process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const tryConnection = () => client.connect({ port }, () => {
  client.end();
  if (!startedElectron) {
    console.log('starting electron');
    startedElectron = true;
    exec('npm run electron');
  }
});

// client.on('error', () => setTimeout(tryConnection, 1000));
client.on('error', () => {});

tryConnection();
