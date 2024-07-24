import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './views/Home';
import PokemonDetail from './views/PokemonDetail';
import MyPokemon from './views/MyPokemon';
import background from "./assets/BG_POKEMON.jpg"
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box className="App" style={{background: `url(${background})`}} h={"100vh"}>
      <Routes>
        <Route path='/'
        element={<Home/>}/>
        <Route path='/pokemon/:id' element={<PokemonDetail/>}/>
        <Route path='/myPokemon'
        element={<MyPokemon/>}/>
      </Routes>
    </Box>
  );
}

export default App;
