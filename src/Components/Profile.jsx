import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ setPage }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(prev => ({ ...prev, avatar: URL.createObjectURL(file) }));
    }
  };

  const handleSave = () => {
    alert('Profile saved!');
  };

  return (
    <>
      <button className="back-btn" onClick={() => setPage('dashboard')}>← Back</button>
      
      <div className="profile-card">
        {profile.avatar ? (
          <img src={profile.avatar} alt="Avatar" className="profile-avatar-img" />
        ) : (
          <div className="profile-avatar">👤</div>
        )}
        <input type="file" onChange={handleImageChange} className="avatar-input" />

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={profile.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleInputChange}
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={profile.bio}
          onChange={handleInputChange}
        />

        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </>
  );
};

export default Profile;
