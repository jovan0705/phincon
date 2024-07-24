import "../styles/style.css"
import { Box, Image, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"


const PokemonCard = ({pokemon}) => {
    const navigate = useNavigate();
    return <Box className="pokemonCard" onClick={() => navigate(`/pokemon/${pokemon.id}`)} >
        <Image src={pokemon.thumbnail} width={"120px"}></Image>
        <Text>{pokemon.name}</Text>
    </Box>
}

export default PokemonCard