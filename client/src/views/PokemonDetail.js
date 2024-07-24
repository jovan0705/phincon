import "../styles/style.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPokemonDetail } from "../store/actionCreators/pokemonCreator";
import {
  Box,
  Image,
  Tag,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Input
} from "@chakra-ui/react";
import { typeColor } from "../helpers/typeColor";
import { baseUrl } from "../apis/baseUrl";
import { failAlert } from "../helpers/alerts";

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nickname, setNickname] = useState("")
  const { pokemonDetail } = useSelector(
    (store) => store.rootReducer.pokemonReducer
  );
  useEffect(() => {
    dispatch(fetchPokemonDetail(id));
  }, []);

  const handleCatchPokemon = async () => {
    try {
      const { data: resp } = await baseUrl.post(`/pokemon/${id}`);
      if (resp.status === "success") {
        onOpen();
        setNickname(pokemonDetail?.name)
      }
      else failAlert(`Failed to catch ${pokemonDetail?.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSavePokemon = async () => {
    try {
        await baseUrl.post(`/catch`, {
            nickname,
            pokemonId: id
        })
        onClose();
        navigate("/");
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <Box
      display={"flex"}
      h={"100vh"}
      w={"100vw"}
      alignItems={"center"}
      justifyContent={"center"}
    >

      <Box display={"flex"} w={"600px"} flexDir={"row"} h={"100%"} padding={"24px"} flexDirection={"column"} alignItems={"center"}>
      <Box className="buttonContainer">
          <Button onClick={() => navigate("/")}>Back to Pokemon List</Button>
        </Box>
        <Box
          display={"flex"}
          w={"220px"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text>{pokemonDetail.name}</Text>
          <Image
            w={"200px"}
            h={"200px"}
            src={
              pokemonDetail?.sprites?.other["official-artwork"].front_default
            }
          ></Image>
          <Box display={"flex"}>
            {pokemonDetail?.types?.map((el) => {
              return (
                <Tag
                  color={"white"}
                  mx={"4px"}
                  backgroundColor={typeColor(el.type.name)}
                >
                  {el.type.name}
                </Tag>
              );
            })}
          </Box>
        </Box>
        <Box
          mt={"24px"}
          display={"flex"}
          w={"380px"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {pokemonDetail?.moves?.slice(0, 4)?.map((el) => (
            <Box
              mx={"4px"}
              my={"4px"}
              width={"350px"}
              py={"8px"}
              borderRadius={"4px"}
              bgColor={"white"}
            >
              <Text>{el.move.name.split("-").join(" ")}</Text>
            </Box>
          ))}
          <Button my={"12px"} colorScheme="blue" onClick={handleCatchPokemon}>
            Catch Pokemon
          </Button>
        </Box>
      </Box>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Give your pokemon a Nickname</ModalHeader>
          <ModalBody>
            <Input defaultValue={pokemonDetail?.name} onChange={(e) => setNickname(e.target.value)}></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleSavePokemon()}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PokemonDetail;
