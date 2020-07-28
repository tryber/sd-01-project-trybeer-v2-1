import React from 'react';
import { getUser } from '../service';
import useAxios from 'axios-hooks'
import NavBar from '../component/NavBar';
import Profile from '../component/ProfileAdmin';
import '../styles/MyProfileAdmin.css';

function ProfileAdmin() {
  const [{ data, loading, error }] = useAxios({
    url: 'http://localhost:3001/admin/profile',
    headers: {
      'Content-Type': 'application/json',
      authorization: getUser().token
    }
  });

  if (loading) {
    return <section className="container">
      <NavBar />
      <h1 className="loader"></h1>
    </section>;
  }

  if (error) return <p>Error!</p>

  return (
    <div className="Admin admin-profile">
      <NavBar />
      <Profile index={data} />
    </div>
  )
}

export default ProfileAdmin;
