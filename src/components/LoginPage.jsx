// src/App.js
import React, {useState, useEffect} from 'react';
import { db, auth } from './firebase';
import {doc, setDoc} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {useNavigate} from "react-router-dom";

function LoginPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Subscribe to authentication state changes
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  // Handle user registration
  const handleRegister = async () => {
    setError('');
    try {
      const creds = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", creds.user.uid), {
        id: creds.user.uid,
        email: creds.user.email,
        pokemons: []
      });
      navigate('/user');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle user login
  const handleLogin = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/user');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle user sign out
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Firebase Authentication with React</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.email}!</h2>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {isRegistering ? (
            <div>
              <button onClick={handleRegister} style={{ marginRight: '1rem' }}>
                Register
              </button>
              <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsRegistering(false)}>
                Already have an account? Login
              </span>
            </div>
          ) : (
            <div>
              <button onClick={handleLogin} style={{ marginRight: '1rem' }}>
                Login
              </button>
              <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsRegistering(true)}>
                Don't have an account? Register
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
