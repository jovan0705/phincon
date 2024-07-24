import {
  SET_POKEMON_LIST,
  SET_POKEMON_LIST_ERROR,
  SET_POKEMON_LIST_LOADING,
  SET_POKEMON_DETAIL,
  SET_POKEMON_DETAIL_ERROR,
  SET_POKEMON_DETAIL_LOADING,
  SET_MY_POKEMON,
  SET_MY_POKEMON_ERROR,
  SET_MY_POKEMON_LOADING,
} from "../actionTypes";

const initialState = {
  pokemonList: [],
  pokemonListError: null,
  pokemonListLoading: false,
  pokemonDetail: {},
  pokemonDetailError: null,
  pokemonDetailLoading: true,
  myPokemon: [],
  myPokemonError: null,
  myPokemonLoading: true,
};

const pokemonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: payload,
      };

    case SET_POKEMON_LIST_ERROR:
      return {
        ...state,
        pokemonListError: payload,
      };

    case SET_POKEMON_LIST_LOADING:
      return {
        ...state,
        pokemonListLoading: payload,
      };

    case SET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: payload,
      };

    case SET_POKEMON_DETAIL_ERROR:
      return {
        ...state,
        pokemonDetailError: payload,
      };

    case SET_POKEMON_DETAIL_LOADING:
      return {
        ...state,
        pokemonDetailLoading: payload,
      };

    case SET_MY_POKEMON:
      return {
        ...state,
        myPokemon: payload,
      };

    case SET_MY_POKEMON_ERROR:
      return {
        ...state,
        myPokemonError: payload,
      };

    case SET_MY_POKEMON_LOADING:
      return {
        ...state,
        myPokemonLoading: payload,
      };

    default:
      return state;
  }
};

export default pokemonReducer;
