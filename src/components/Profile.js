import React from 'react';
import './Profile.css';

const Profile = ({ username, profilePic }) => {
  return (
    <div className="profile">
      <img className="profile-pic" src={profilePic} alt="Profile" />
      <h2 className="username">{username}</h2>
    </div>
  );
};

export default Profile;
