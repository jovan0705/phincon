import "../styles/style.css"
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Input,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { fetchMyPokemon } from "../store/actionCreators/pokemonCreator";
import MyPokemonCard from "../components/MyPokemonCard";
import { baseUrl } from "../apis/baseUrl";
import Pagination from "../components/Pagination";

const MyPokemon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [nickname, setNickname] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [maxPage, setMaxPage] = useState(1);
  const { myPokemon } = useSelector(
    (store) => store.rootReducer.pokemonReducer
  );
  useEffect(() => {
    dispatch(fetchMyPokemon()).then((resp) => setMaxPage(Math.ceil(resp.length / limit)));
  }, []);

  const myPokemonList = useMemo(() => {
    return myPokemon.slice(limit * (page - 1), limit * (page - 1) + limit);
  }, [myPokemon, page, limit]);

  const handleOpen = (pokemon) => {
    setSelectedPokemon(pokemon);
    setNickname(pokemon?.nickname?.split("-")[0]);
    onOpen();
  };

  const handleRename = async () => {
    try {
      await baseUrl.put(`/myPokemon/${selectedPokemon.id}`, {
        nickname: nickname,
      });
      dispatch(fetchMyPokemon());
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="allContainer">
      <Box
        className="secondContainer"
      >
        <Box className="buttonContainer">
          <Button onClick={() => navigate("/")}>Back</Button>
        </Box>
        <Box
          className="listContainer"
        >
          {myPokemonList.map((pokemon) => (
            <MyPokemonCard
              pokemon={pokemon}
              handleOpen={handleOpen}
            ></MyPokemonCard>
          ))}
        </Box>
        <Pagination page={page} setPage={setPage} maxPage={maxPage}/>
      </Box>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rename Pokemon</ModalHeader>
          <ModalBody>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            ></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleRename()}>
              Confirm
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyPokemon;
