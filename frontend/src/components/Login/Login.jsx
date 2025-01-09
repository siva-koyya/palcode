import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import PlaylistManager from "../PlaylistManager/PlaylistManager";
import Layout from "../../Layout/Layout";
import GoogleAuth from "./GoogleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);

  const sendOtp = async () => {
    try {
      await axios.post("https://palcode001.onrender.com/api/login", { email });
      alert("OTP sent to your email.");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP. Please check your email and try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        "https://palcode001.onrender.com/api/verify-otp",
        { email, otp }
      );
      if (response.data.success) {
        setIsLoggedIn(true);
        alert("Logged in successfully!");
      } else {
        alert("Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      alert("OTP verification failed. Please try again.");
    }
  };

  const googleLogin = () => {
    window.location.href = "https://palcode001.onrender.com/api/auth/google";
  };

  // useEffect(() => {
  //   async function fetchGoogleProfile() {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/profile", { withCredentials: true });
  //       if (response.status === 200) {
  //         setGoogleUser(response.data);
  //         setIsLoggedIn(true);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch Google profile:", err);
  //     }
  //   }

  //   fetchGoogleProfile();
  // }, []);

  return isLoggedIn ? (
    <Layout user={googleUser || email} />
  ) : (
    <div className="login-wrapper">
      <div className="left-container">
        <h1>Welcome to Blaash.io</h1>
        <p className="welcome-text">
          Simplify your experience by logging in
          <br />
          and managing your playlists effortlessly.
        </p>
      </div>
      <div className="right-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Log in to continue to the app</p>

          <GoogleAuth googleLogin={setIsLoggedIn} />

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
            <button onClick={sendOtp} className="btn-primary">
              Send OTP
            </button>
          </div>

          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-input"
            />
            <button onClick={verifyOtp} className="btn-secondary">
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
