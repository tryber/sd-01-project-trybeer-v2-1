import React from 'react';

const Profile = (props) => {
  const { name, email } = props.index;
  return (
    <div className="DataProfile MyProfileAdmin">
      <h3 data-testid="profile-name" className="DataProfile input-profile">Nome: {name}</h3>
      <h3 data-testid="profile-email" className="DataProfile input-profile">Email: {email}</h3>
    </div>
  );
}

export default Profile;
