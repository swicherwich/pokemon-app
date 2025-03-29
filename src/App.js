import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonProfile from "./components/PokemonProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<PokemonList/>}/>
        <Route path={"/pokemon/:name"} element={<PokemonProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
