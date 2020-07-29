import React from 'react';
import { getUser } from '../service';
import NavBar from '../component/NavBar';
import Profile from '../component/ProfileAdmin';
import '../styles/MyProfileAdmin.css';
import { Redirect } from 'react-router-dom';

function ProfileAdmin() {
  if (!getUser()) return <Redirect to="/" />
  return (
    <div className="Admin admin-profile">
      <NavBar />
      <Profile index={getUser()} />
    </div>
  )
}

export default ProfileAdmin;
