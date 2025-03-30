// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import './css/UserProfile.css';

export default function UserProfile() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "pokemons"));
        const fetchedItems = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() });
        });
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }
    fetchData();
  }, []);

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
