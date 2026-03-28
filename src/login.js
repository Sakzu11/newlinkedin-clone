import { useState, useEffect } from "react";
import "./login.css";
import { login } from './userSlice';
import { useDispatch } from 'react-redux';
import loginImg from './login.png';
import { loginUser, registerUser, googleLogin } from './api';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regData, setRegData] = useState({ username: '', email: '', first_name: '', last_name: '', password: '' });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/token/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })
      .then(() => setServerOnline(true))
      .catch(() => setServerOnline(false));
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      const res = await googleLogin(credentialResponse.credential);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      dispatch(login({ username: res.data.username, email: res.data.email }));
    } catch (err) {
      if (!err.response) {
        setError("Cannot connect to server. Make sure Django is running on port 8000.");
      } else {
        const msg = err.response?.data?.error || `Server error (${err.response.status})`;
        setError(`Google sign-in failed: ${msg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(username, password);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      dispatch(login({ username }));
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (!regData.username || !regData.password) return;
    setLoading(true);
    setError("");
    try {
      await registerUser(regData);
      const res = await loginUser(regData.username, regData.password);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      dispatch(login({ username: regData.username }));
    } catch (err) {
      const data = err.response?.data;
      const msg = data ? Object.values(data).flat().join(' ') : "Registration failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="logo">
          <div className="text"><h1>Linked</h1></div>
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="login__logo" />
        </div>

        {!serverOnline && (
          <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 4, padding: '8px 12px', marginBottom: 12, fontSize: 13, color: '#856404' }}>
            ⚠️ Backend server is offline. Start Django: <code>cd backend && venv/Scripts/python manage.py runserver</code>
          </div>
        )}

        {!isRegister ? (
          <>
            <p>Take The Next Step In Your Career</p>
            <p className="login__subtitle">Stay updated on your professional world</p>

            <form onSubmit={signIn}>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {error && <p style={{ color: 'red', fontSize: '13px', marginBottom: '8px' }}>{error}</p>}
              <button type="submit" className={`login__button ${username && password ? "active" : ""}`} disabled={!username || !password || loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="login__forgot">Forgot password?</p>
            <div className="login__divider">
              <span>or</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google sign-in failed.")}
                useOneTap={false}
                text="signin_with"
                shape="rectangular"
                width="300"
              />
            </div>

            <p className="login__register" style={{ marginTop: '16px' }}>
              New to LinkedIn?{" "}
              <span onClick={() => { setIsRegister(true); setError(""); }}>Join now</span>
            </p>
          </>
        ) : (
          <>
            <p>Create your LinkedIn account</p>
            <p className="login__subtitle">Start building your professional network</p>

            <form onSubmit={signUp}>
              <input type="text" placeholder="Username *" value={regData.username} onChange={(e) => setRegData({ ...regData, username: e.target.value })} required />
              <input type="email" placeholder="Email *" value={regData.email} onChange={(e) => setRegData({ ...regData, email: e.target.value })} />
              <input type="text" placeholder="First name" value={regData.first_name} onChange={(e) => setRegData({ ...regData, first_name: e.target.value })} />
              <input type="text" placeholder="Last name" value={regData.last_name} onChange={(e) => setRegData({ ...regData, last_name: e.target.value })} />
              <input type="password" placeholder="Password (min 6 chars) *" value={regData.password} onChange={(e) => setRegData({ ...regData, password: e.target.value })} required />
              {error && <p style={{ color: 'red', fontSize: '13px', marginBottom: '8px' }}>{error}</p>}
              <button type="submit" className={`login__button ${regData.username && regData.password ? "active" : ""}`} disabled={!regData.username || !regData.password || loading}>
                {loading ? "Creating account..." : "Agree & Join"}
              </button>
            </form>

            <p className="login__register" style={{ marginTop: '16px' }}>
              Already on LinkedIn?{" "}
              <span onClick={() => { setIsRegister(false); setError(""); }}>Sign in</span>
            </p>
          </>
        )}
      </div>

      <div className="pic">
        <img src={loginImg} alt="login" style={{ width: '100%', height: '600px' }} />
      </div>
    </div>
  );
}

export default Login;
