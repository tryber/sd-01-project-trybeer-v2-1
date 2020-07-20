import React, { useState, useContext, useEffect } from 'react';
import Headers from '../component/Header';
import { TrybeerContext } from '../context';
import { fetchApi } from '../service/serviceFetch';
import ReportComponent from '../component/ReportComponent';
import { saveUser, getUser } from '../service';
import '../styles/MyProfile.css';

async function handleSubmit(obj, setMessageRequest, setUser) {
  const { name, } = obj;
  const body = {
    name,
  };
  const data = await fetchApi({
    endpoint: 'http://localhost:3001/profile',
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
      authorization: getUser().token,
    }
  });
  setMessageRequest((data.message || 'Atualizado com sucesso'));
  if (!data.message) {
    saveUser(data);
    setUser(getUser());
  }
}

function MyProfile() {
  const { user, setUser } = useContext(TrybeerContext);
  const [messageRequest, setMessageRequest] = useState();
  const [name, setName] = useState('');
  useEffect(() => {
    if (user) setName(user.name)
  }, [user])
  return (
    <div className="MyProfile">
      <Headers path="/profile" />
      {!user || <div className="DataProfile">
        {!messageRequest || <ReportComponent message={{ messageRequest, setMessageRequest }} />}
        <label className="lbl name" htmlFor="name">Nome:</label>
        <input data-testid="profile-name-input" className="input-profile name" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label className="lbl email" htmlFor="name">Email:</label>
        <div data-testid="profile-email-input" className="input-profile email" id="email">
          {user.email}
        </div>
        <button data-testid="profile-save-btn" type="button" className="btn-save-name" onClick={() => handleSubmit({ name }, setMessageRequest, setUser)}>Salvar</button>
      </div>}
    </div>
  );
}

export default MyProfile;
