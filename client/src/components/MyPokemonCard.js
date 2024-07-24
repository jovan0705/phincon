import { Box, Image, Text, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../apis/baseUrl";
import { failAlert, successAlert } from "../helpers/alerts";
import { useDispatch } from "react-redux";
import { fetchMyPokemon } from "../store/actionCreators/pokemonCreator";
import "../styles/style.css"

const MyPokemonCard = ({pokemon, handleOpen}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRelease = async () => {
        try {
            const {data} = await baseUrl.delete(`/myPokemon/${pokemon.id}`)
            const number = data.number
            let isPrime = true;
            if (number === 1) {
                isPrime = false
            } else if (number > 1) {
                for (let i = 2; i < number; i++) {
                    if (number % i == 0) {
                        isPrime = false;
                        break;
                    }
                }
            } else {
                isPrime = false
            }
            if (isPrime) successAlert(`Success Release Pokemon with Nickname ${pokemon.nickname}`)
                else failAlert(`Fail to Release Pokemon with Nickname ${pokemon.nickname}`)
            dispatch(fetchMyPokemon());
        } catch (error) {
            console.log(error)
        }
    }

    return <Box className="myPokemonCard">
        <Box display={"flex"} flexDir={"column"} height={"140px"}>
            <Image src={pokemon.thumbnail} width={"120px"}></Image>
            <Text>{pokemon.nickname}</Text>
        </Box>
        <Box display={"flex"} mt={"12px"}>
        <Button mx={"4px"} onClick={() => {handleOpen(pokemon)}} colorScheme="blue">Rename</Button>
        <Button mx={"4px"} onClick={() => handleRelease()} colorScheme="red">Release</Button>
        </Box>
    </Box>
}

export default MyPokemonCard