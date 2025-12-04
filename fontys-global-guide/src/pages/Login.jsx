import { useState } from 'react';
import SplashScreen from './SplashScreen';
import fontysLogoImg from '../assets/fontys-logo-wit.png';
import { loginWithEmail } from '../firebase/auth';
import SignUp from './SignUp';

export default function FontysApp() {
  const [showStart, setShowStart] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = async () => {
    try {
      setError('');
      const res = await loginWithEmail(username, password);
      console.log('Logged in as:', res.user);
      alert('Login successful!');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') setError('User does not exist');
      else if (err.code === 'auth/wrong-password') setError('Incorrect password');
      else if (err.code === 'auth/invalid-email') setError('Invalid email address');
      else setError('Login failed');
    }
  };

  if (showStart) {
    return <SplashScreen onFinish={() => setShowStart(false)} />;
  }

  if (currentPage === 'signup') {
    return <SignUp onBackToLogin={() => setCurrentPage('login')} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#663366',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <img src={fontysLogoImg} alt="Fontys Logo" style={{ width: '280px', height: 'auto', marginBottom: '15px' }} />
        <p style={{ color: 'white', fontSize: '18px', margin: 0, fontWeight: '300' }}>Global Guide</p>
      </div>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {error && (
          <div style={{
            color: '#ffdddd',
            backgroundColor: '#550000',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: 'white', fontSize: '14px', marginBottom: '8px' }}>Email:</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: 'none', borderRadius: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', color: 'white', fontSize: '14px', marginBottom: '8px' }}>Password:</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 50px 12px 16px', fontSize: '16px', border: 'none', borderRadius: '8px', boxSizing: 'border-box' }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            />
          </div>
        </div>
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '500',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            marginBottom: '40px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
        >
          Log In
        </button>
        <div style={{ textAlign: 'center' }}>
          <span style={{ color: 'white', fontSize: '14px' }}>
            Don't have an account?{' '}
            <button
              onClick={() => setCurrentPage('signup')}
              style={{ background: 'none', border: 'none', color: 'white', fontStyle: 'italic', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}
            >
              Sign up
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
