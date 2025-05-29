import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // },
      withCredentials: true  // if you're using cookies (recommended)
    }).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }).catch((error) => {
      console.error("Logout error:", error);
      navigate('/'); // navigate anyway
    });
  }, []);

  return (
    <div>Logging out...</div>
  );
};

export default UserLogout;