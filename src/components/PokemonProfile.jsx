import {Link, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {updateDoc, arrayUnion, getDoc, doc} from 'firebase/firestore';
import { db, auth } from './firebase';
import './css/PokemonProfile.css';
import {onAuthStateChanged} from "firebase/auth";

export default function PokemonProfile() {
  const {name} = useParams();
  const [pokemon, setPokemon] = useState({});
  const [user, setUser] = useState({});
  const audioRef = useRef(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.data;
      setPokemon(data);
    };
    fetchPokemonData();
  }, [name]);

  useEffect(() => {
    async function fetchData() {
      if (!user || !user.uid) return;
      try {
        const querySnapshot = await getDoc(doc(db, "users", user.uid));
        querySnapshot.data().pokemons.forEach(pokemonDoc => {
          if (pokemonDoc.name === pokemon.name) {
            setIsAdded(true);
          }
        })
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }
    fetchData();
  }, [user, pokemon.name])

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  const addPokemon = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        pokemons: arrayUnion({
          name: pokemon.name,
          id: pokemon.id,
        })
      });
      setIsAdded(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="pokemon-profile-container">
      <h2 className="pokemon-name">{pokemon.name}</h2>

      <div className="image-and-button">
        {pokemon.id && (
          <img
            className="pokemon-image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
          />
        )}
        {
          isAdded ? <p>Added to user</p> :
            <button className="pokemon-audio-button" onClick={addPokemon}>Add to user</button>
        }
        <button className="pokemon-audio-button" onClick={playAudio}>Play Cry</button>
      </div>

      <audio
        ref={audioRef}
        src={
          pokemon.id
            ? `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`
            : ""
        }
      />

      <nav>
        <Link to="/" className="back-link">← back to all pokemons</Link>
      </nav>
    </div>
  );

}