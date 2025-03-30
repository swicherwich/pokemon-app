// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import './css/Header.css';

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Subscribe to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to Home after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="header-container">
      <div className="header-left">
        <Link to="/">Home</Link>
      </div>
      <div className="header-center">
        {/* You can add additional Center header content here */}
      </div>
      <div className="header-right">
        {user ? (
          <>
            <span>
              <Link to="/user">{user.email.replaceAll("@gmail.com", "")}</Link>
            </span>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
