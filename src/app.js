const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const dgram = require('dgram');
const throttle = require('lodash/throttle');
const delay = require('delay');
const commandDelays = require('./commandDelays');

const DRONE_PORT = 8889;
const DRONE_STATUS_PORT = 8890;
const HOST = '192.168.10.1';

const droneCommand = dgram.createSocket('udp4').bind(DRONE_PORT, HOST);
const droneStatus = dgram.createSocket('udp4').bind(DRONE_STATUS_PORT);

const commands = ['command', 'takeoff', 'land'];
let index = 0;

io.on('connection', socket => {
  console.log('Welcome!');
});

async function start() {
  const command = commands[index];
  const commandDelay = commandDelays[command];
  console.log(`Running command ${command}`);
  droneCommand.send(command, 0, command.length, DRONE_PORT, HOST, err => {
    if (err) console.log(`Error ${err}`);
  });
  await delay(commandDelay);
  index += 1;

  if (index < commands.length) return start();
  console.log('Finished!');
}

start();

droneStatus.on('message', status => {
  console.log(status);
});

server.listen(8103, () => {
  console.log('Server is running');
});
