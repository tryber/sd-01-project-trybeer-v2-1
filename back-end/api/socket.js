const app = require('./server');
const Chat = require('../back/controller/chat');
const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on('connection', (socket) => {
  socket.on('add to room', async (idClient) => {
    const nameRoom = `Room ${idClient}`;
    socket.join(`${nameRoom}`, async () => {
      const history = await Chat.getOneChatByIdClient(idClient);
      io.to(`Room ${idClient}`).emit('update message', { messages: history });
    });
    const allChats = await Chat.getAllChat();
    io.emit('Update chats', { chats: allChats });
  });

  socket.on('add message', async ({ userClient, admin, message }) => {
    const { idClient } = userClient;
    const history = await Chat.addMessageToChat({ userClient, admin, message });
    io.to(`Room ${idClient}`).emit('update message', { messages: history });
    const allChats = await Chat.getAllChat();
    io.emit('Update chats', { chats: allChats });
  });

  socket.on('get all messages', async () => {
    const allChats = await Chat.getAllChat();
    io.emit('Update chats', { chats: allChats });
  });
});

module.exports = server;
