import React, { useState } from "react";
import "./login.css";
import {login}from './userSlice';
import{useDispatch} from 'react-redux';
import loginImg from './login.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isActive = email.length > 0 && password.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isActive) {
      alert("Logging in...");
    }
  };
    const dispatch = useDispatch();

  
  const signIn = (e) => {
    e.preventDefault();

    // Dummy login (you can connect backend later)
    dispatch(
      login({
        email: email,
      })
    );
  };



  return (
    <div className="login">
      <div className="login__container">
        <div className="logo">
          <div className="text">
            <h1>Linked</h1>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="LinkedIn"
          className="login__logo"
        />
        </div>
        
        <p>Take The Next Step In Your Career</p>
        <p className="login__subtitle">Stay updated on your professional world</p>

        <form onSubmit={signIn}>
          <input
            type="email"
            placeholder="Email or Phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className={`login__button ${isActive ? "active" : ""}`}
            disabled={!isActive}
            onClick={signIn}
          >
            Sign in
          </button>
        </form>

        <p className="login__forgot">Forgot password?</p>

        <div className="login__divider">
          <span>---------------------------------or--------------------------------</span>
        </div>

        <button className="login__google">
          Sign in with Google
        </button>
        <br></br><br></br>
        <p>We’ll take you to your web browser where you can use 
            saved credentials to sign in to LinkedIn with one click.</p>

        <p className="login__register">
          New to LinkedIn? <span>Join now</span>
        </p>
      </div>
    <div className="pic">
        <img src={loginImg} alt="login" 
        style={{ width: '100%', height: '600px' }} />
     </div>
    </div>
    
  );
}

export default Login;