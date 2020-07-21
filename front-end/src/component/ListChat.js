import React, { useEffect, useContext } from 'react';
import Client from '../Client';
import { TrybeerContext } from '../context';
import io from 'socket.io-client';

const socket = io('http://localhost:4555');
socket.on('connect', () => console.log('LOGOU'));

function ListChat() {
  const { chat, setChats } = useContext(TrybeerContext);
  useEffect(() => {
    socket.emit('get all messages');
  }, [])
  socket.on('Update chats', ({ chats }) => setChats({ chats }));
  return (
    <div className="ListChat">
      {
        !chat || chat.map((data) => <Client data={data} />)
      }
      {
        chat || <h2>Nenhuma Conversa Iniciada!</h2>
      }
    </div>
  )
}

export default ListChat;
