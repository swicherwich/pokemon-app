import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import './css/PokemonList.css';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      const data = await response.data;
      setPokemons(data.results);
    };
    fetchPokemons();
  }, []);

  return (
    <div className="pokemon-list-container">
      <h1>Pokemons</h1>
      <ul className="pokemon-list">
        {pokemons.map((pokemon) => (
          <li className="pokemon-item" key={pokemon.name}>
            <h2>{pokemon.name}</h2>
            <nav>
              <Link to={`/pokemon/${pokemon.name}`}>details</Link>
            </nav>
          </li>
        ))}
      </ul>
    </div>
  );
}