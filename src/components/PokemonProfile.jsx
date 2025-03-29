import {Link, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import './css/PokemonProfile.css';

export default function PokemonProfile() {
  const {name} = useParams();
  const [pokemon, setPokemon] = useState({});
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.data;
      setPokemon(data);
    };
    fetchPokemonData();
  }, [name]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  return (
    <div className="pokemon-profile-container">
      <h1>Pokemon {name}'s Profile</h1>
      <h2 className="pokemon-name">{pokemon.name}</h2>

      <div className="image-and-button">
        {pokemon.id && (
          <img
            className="pokemon-image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
          />
        )}

        <button className="pokemon-audio-button" onClick={playAudio}>
          Play Cry
        </button>
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