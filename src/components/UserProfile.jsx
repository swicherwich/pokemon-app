// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from './firebase';
import { Link } from 'react-router-dom';
import './css/UserProfile.css';
import {onAuthStateChanged} from "firebase/auth";

export default function UserProfile() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "pokemons"));
        const fetchedItems = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().user === user.uid) {
            fetchedItems.push({ id: doc.id, ...doc.data() });
          }
        });
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }
    fetchData();
  }, [user]);

  return (
    <div className="user-profile-container">
      <h2>Pokemon Collection</h2>
      {items.map((item) => (
        <div key={item.id} className="user-profile-item">
          <Link className="user-profile-link" to={`/pokemon/${item.name}`}>
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
