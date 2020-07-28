import React, { useState, useEffect } from 'react';
import NavBar from '../component/NavBar';
import io from 'socket.io-client';
import InputMessage from '../component/InputMessage';
import Message from '../component/Message';
import '../styles/ChatClient.css';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:4555');
socket.on('connect', () => console.log('LOGOU'));

function ChatAdmin({ match: { params: { id } } }) {
  const [chat, setChats] = useState();
  useEffect(() => {
    socket.emit('add to room', id);
  }, [])
  const sendMessage = (value) => {
    const { email } = chat;
    socket.emit('add message', { userClient: { idClient: id, email }, admin: true, message: { content: value } })
  }
  socket.on('update message', ({ messages }) => {
    setChats(messages);
  });
  const sortedList = (array) => array.messages.sort((a, b) => new Date(b.hour) - new Date(a.hour));
  return (
    <div className="Chat ChatAdmin">
      <NavBar />
      <div className="container">
        <Link className="back-button margin-admin" to="/admin/chat">Back</Link>
        {!chat || chat.length === 0 ||
          <div className="sub-container sub-container-admin margin-admin">
            <h2 className="container-text">{`Chat com usuário: ${chat.email}`}</h2>
            <div className="list-messages">
              {sortedList(chat).map((message) => <Message type={'admin'} email={chat.email} att={message} />)}
            </div>
          </div>
        }
        <InputMessage sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default ChatAdmin;
