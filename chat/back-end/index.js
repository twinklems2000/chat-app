const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectToDb = require('./db/config');
const userRoutes = require('./routes/userRoute');
const messageRoutes = require('./routes/messageRoute');
const socket = require('socket.io');

connectToDb();

const app = express();

app.use(express.json());

app.use(cors());

app.use('', userRoutes);

app.use('', messageRoutes);

const server = app.listen(process.env.PORT);

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3001',
    credenntials: true,
  },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-receive', data.message);
    }
  });
});
