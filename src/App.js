import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonProfile from "./components/PokemonProfile";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <HashRouter>
      <Header/>
      <Routes>
        <Route path={"/"} element={<PokemonList/>}/>
        <Route path={"/pokemon/:name"} element={<PokemonProfile/>}/>
        <Route path={"/user"} element={<UserProfile/>}/>
        <Route path={"/login"} element={<LoginPage/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
