import React, { useState } from 'react';
import '../styles/InputMessage.css';

const returnPlaceHolder = (noMessage) => noMessage ? 'Digite para iniciar uma conversa com a loja' : 'Digite sua mensagem';

function InputMessage({ sendMessage, noMessage = false }) {
  const [value, setValue] = useState();

  const send = () => {
    sendMessage(value);
    setValue('');
  }

  return (
    <div className="InputMessage margin-admin">
      <input type="text" data-testid="chat-message" value={value} placeholder={returnPlaceHolder(noMessage)} className="ipt" onChange={(e) => setValue(e.target.value)} />
      <input type="button" data-testid="send-message-btn" value=">" className="btn-message" disabled={!value} onClick={() => send(value)} />
    </div>
  );
}

export default InputMessage;
