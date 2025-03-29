import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonProfile from "./components/PokemonProfile";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<PokemonList/>}/>
        <Route path={"/pokemon/:name"} element={<PokemonProfile/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
