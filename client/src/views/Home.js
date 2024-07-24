import "../styles/style.css"
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { fetchPokemon } from "../store/actionCreators/pokemonCreator";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10)
  const maxPage = Math.ceil(1302/limit);
  const { pokemonList } = useSelector(
    (store) => store.rootReducer.pokemonReducer
  );
  useEffect(() => {
    dispatch(fetchPokemon());
  }, []);

  const pokemonDataList = useMemo(() => {
    return pokemonList.slice(limit*(page-1), limit*(page-1)+limit)
  }, [pokemonList, page, limit])
  return (
    <Box className="allContainer">
      <Box
        className="secondContainer"
      >
        <Box className="buttonContainer">
          <Button onClick={() => navigate("/myPokemon")}>See My Pokemon</Button>
        </Box>
        <Box
          className="listContainer"
        >
          {pokemonDataList.map((pokemon) => (
            <PokemonCard pokemon={pokemon}></PokemonCard>
          ))}
        </Box>
        <Pagination page={page} setPage={setPage} maxPage={maxPage}/>
      </Box>
    </Box>
  );
};

export default Home;
