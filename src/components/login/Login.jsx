import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import instance from '../../api/axios';

const clientId = '793959150532-n8h7ji8lere1c2ok9q262nul33tmpftf.apps.googleusercontent.com';

const LoginGoogle = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = async (user) => {
    try {
      const res = await instance.post('/user/google-login', { token: user.credential });
      if (res.status === 200) {
        const data = res.data;
        await signin(data);
        navigate('/');
      } else {
        console.error('Google Sign-In Error:', res.data);
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default LoginGoogle;
