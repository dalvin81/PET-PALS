import React, { useState, useEffect } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Profile() {
  const [file, setFile] = useState(null);
  const [petname, setPetName] = useState('');
  const [about, setAbout] = useState('');
  const [profileData, setProfileData] = useState({});
  const [profileImage, setProfileImage] = useState('');

  // Toast functions
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('https://x2b8lxm2lj.execute-api.us-east-2.amazonaws.com/get-profile', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
      });

      const profileData = await response.json();
      setPetName(profileData.petName);
      setAbout(profileData.about);
      setProfileImage(profileData.photoUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const submit = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('petname', petname);
      formData.append('about', about);

      const response = await fetch('https://x2b8lxm2lj.execute-api.us-east-2.amazonaws.com/update-profile', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: formData,
      });

      notifySuccess('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      notifyError('Failed to update profile');
      console.error(error);
    }
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="profile">
      <div className="profileFrame">
        <div className="profilePic">
          <img id="output" src={profileImage} alt="" />
          <input onChange={fileSelected} type="file" accept="image/*" />
        </div>
        <div className="profileData">
          <div>
            <input
              value={petname}
              onChange={(e) => setPetName(e.target.value)}
              type="petname"
              name="petname"
              id="petname"
              placeholder="Pet name"
            />
          </div>
          <div>
            <input
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              type="about"
              name="about"
              id="about"
              placeholder="About"
            />
          </div>
          <div>
            <input type="submit" id="login-btn" onClick={submit} value="Save" />
          </div>
        </div>
      </div>
    </div>
  );
}
