const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res, next) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', socket => {
    console.log('A user has connected!');
    socket.on('disconnect', () => {
        console.log('A user has disconnected!');
    });

    socket.on('chat message', (msg) => {
        console.log(`Message received: ${msg}`);
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
    console.log('Listening on *:3000');
});
