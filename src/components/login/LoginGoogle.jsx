import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginGoogle = () => {
  return (
    <GoogleOAuthProvider clientId="793959150532-n8h7ji8lere1c2ok9q262nul33tmpftf.apps.googleusercontent.com">
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
