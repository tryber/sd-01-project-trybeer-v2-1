import React, { useState, useEffect } from 'react';
import NavBar from '../component/NavBar';
import io from 'socket.io-client';
import InputMessage from '../component/InputMessage';
import Message from '../component/Message';

const socket = io('http://localhost:4555');
socket.on('connect', () => console.log('LOGOU'));

function ChatAdmin({ match: { params: { id } } }) {
  const [chat, setChats] = useState();
  useEffect(() => {
    socket.emit('add to room', id);
  }, [])

  const sendMessage = (value) => {
    const { idClient, email } = chat;
    socket.emit('add message', { userClient: { idClient, email }, admin: true, message: { content: value } })
  }

  socket.on('update message', ({ messages }) => setChats({ messages }));
  return (
    <div className="ChatAdmin">
      <NavBar />
      {!chat ||
        <div>
          <h2>{`-----> ${chat.email}`}</h2>
          {chat.messages.map(() => <Message />)}
        </div>
      }
      <InputMessage sendMessage={sendMessage} />
    </div>
  )
}

export default ChatAdmin;
