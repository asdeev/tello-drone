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

const drone = dgram.createSocket('udp4').bind(DRONE_PORT);
const droneStatus = dgram.createSocket('udp4').bind(DRONE_STATUS_PORT);