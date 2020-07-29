import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { TrybeerContext } from '../context';
import InputMessage from '../component/InputMessage';
import Message from '../component/Message';
import Header from '../component/Header';
import { Redirect } from 'react-router-dom';
import '../styles/ChatClient.css';

const socket = io('http://localhost:4555');
socket.on('connect', () => console.log('LOGOU'));

const sortedList = (array) => array.messages.sort((a, b) => new Date(b.hour) - new Date(a.hour));

function ChatClient() {
  const [chat, setChats] = useState();
  const { user } = useContext(TrybeerContext);
  useEffect(() => {
    if (user) {
      const { id_user: idClient } = user;
      socket.emit('add to room', idClient);
    }
  }, [])
  if (!user) return <Redirect to="/" />;
  const { id_user: idClient, email } = user;
  const sendMessage = (value) => socket.emit('add message', { userClient: { idClient, email }, admin: false, message: { content: value } })
  socket.on('update message', ({ messages }) => setChats(messages));
  console.log(chat)
  return (
    <div className="Chat ChatClient">
      <Header path="/chat" />
      <div className="container">
        {!chat || chat.length === 0 ||
          <div className="sub-container">
            <h2 className="container-text">{`Conversando com a loja:`}</h2>
            <div className="list-messages">{sortedList(chat).map((message) => <Message email={email} type={'client'} att={message} />)}</div>
          </div>}
        <InputMessage noMessage={!chat || chat.length === 0} sendMessage={sendMessage} />
      </div></div>
  )
}

export default ChatClient;
