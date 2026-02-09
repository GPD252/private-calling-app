const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend')));

io.on('connection', (socket) => {
    socket.on('admin-join', (pw) => {
        if(pw === process.env.ADMIN_PASSWORD) socket.join('admin-room');
    });

    socket.on('voice-command', (data) => {
        socket.broadcast.emit('apply-filter', data.filterType);
    });
});

http.listen(3000, () => console.log('Server running on port 3000'));
