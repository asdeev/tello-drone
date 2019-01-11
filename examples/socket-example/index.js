const express = require('express');
const app = express();
const http = require('http').Server(app).listen(3000, '0.0.0.0', () => {
    console.log(`Listening on port ${3000}`);
});
const io = require('socket.io')(http);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res, next) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', socket => {
    socket.broadcast.emit('joined', 'Another user has joined the chat!');

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
