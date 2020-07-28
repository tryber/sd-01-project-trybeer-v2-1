const app = require('./server');
const server = require('./socket');

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Conectado na porta ${port}`));

server.listen(4555, () => console.log('socket.io'));
