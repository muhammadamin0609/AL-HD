const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// Menyajikan file HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Menangani koneksi socket
io.on('connection', (socket) => {
  console.log('User connected');

  // Menangani penerimaan file
  socket.on('send-file', (data) => {
    // Broadcast file ke semua pengguna lain
    socket.broadcast.emit('receive-file', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Menjalankan server
http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
