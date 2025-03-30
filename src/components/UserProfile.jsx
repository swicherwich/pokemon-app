// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { Link } from 'react-router-dom';
import './css/UserProfile.css';
import {onAuthStateChanged} from "firebase/auth";

export default function UserProfile() {
  const [pokemons, setPokemons] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!user || !user.uid) return;
      console.log(user.uid);
      try {
        const querySnapshot = await getDoc(doc(db, "users", user.uid));
        console.log(querySnapshot.data());
        setPokemons(querySnapshot.data().pokemons);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }
    fetchData();
  }, [user]);

  return (
    <div className="user-profile-container">
      <h2>Pokemon Collection</h2>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className="user-profile-item">
          <Link className="user-profile-link" to={`/pokemon/${pokemon.name}`}>
            {pokemon.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
