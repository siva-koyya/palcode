import React from "react";
import { jwtDecode } from "jwt-decode";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleAuth = ({ googleLogin }) => {
  const handleSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    const token = credentialResponse.credential;
    const user = jwtDecode(token);
    const { name, picture, email } = user;

    const userData = {
      name,
      picture,
      email,
    };
    localStorage.setItem("user", JSON.stringify(userData)); 
    googleLogin(true);
  };

  const handleError = () => {
    console.log("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Login with Google</h2>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
