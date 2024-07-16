import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginGoogle = () => {
  return (
    <GoogleOAuthProvider clientId="823367234660-5namdu2fqltsjtoto32bougqj6g3f4nk.apps.googleusercontent.com">
    <GoogleLogin
        onSuccess={credentialResponse => {
            console.log(credentialResponse);
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        />
    </GoogleOAuthProvider>
  )
}

export default LoginGoogle
