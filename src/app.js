const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const droneServer = require('dgram').createSocket('udp4');
const throttle = require('lodash/throttle');
const delay = require('delay');

const commandDelays = require('./commandDelays');