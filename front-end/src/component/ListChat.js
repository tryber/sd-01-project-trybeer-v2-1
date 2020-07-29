import React, { useEffect, useContext } from 'react';
import Client from './Client';
import { TrybeerContext } from '../context';
import io from 'socket.io-client';
import '../styles/ListChat.css';

const socket = io('http://localhost:4555');
socket.on('connect', () => console.log('LOGOU'));

function ListChat() {
  const { chat, setChats } = useContext(TrybeerContext);
  useEffect(() => {
    socket.emit('get all messages');
  }, [])
  socket.on('Update chats', ({ chats }) => {
    setChats(chats);
  });
  return (
    <div className="ListChat">
      {!chat || chat.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate)).map((data) => <Client key={data.id} data={data} />)}
      {!chat || chat.length !== 0 || <h2 data-testid="text-for-no-conversation" className="no-chat">Nenhuma Conversa Iniciada!</h2>}
    </div>
  )
}

export default ListChat;
