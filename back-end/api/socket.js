const app = require('./server');
const Chat = require('../back/controller/chat');
const server = require('http').createServer(app).listen(4555);
const io = require('socket.io')(server);


io.on('connection', (socket) => {

  socket.on('add to room', (userId) => {
    const nameRoom = `Room ${userId}`;
    socket.join(`${nameRoom}`, async () => {
      const history = await Chat.getOneChatByIdClient(userId)
      io.to(`Room ${userId}`).emit('update message', { messages: history });
    });
    const allChats = await Chat.getAllChat();
    io.send(`Update chats`, { chats: allChats })
  })

  socket.on('leave room', (userId) => {
    socket.leave(`${nameRoom}`, async () => {
      io.to(`Room ${userId}`).emit('Saiu do canal!');
    });
  })

  socket.on('add message', async ({ userClient, admin, message }) => {
    const { userId } = userClient;
    const history = await Chat.addMessageToChat({ userClient, admin, message });
    io.to(`Room ${userId}`).emit('update message', { messages: history });
  });

  socket.on('get all messages', async () => {
    const allChats = await Chat.getAllChat();
    io.send(`Update chats`, { chats: allChats })
  })
});


