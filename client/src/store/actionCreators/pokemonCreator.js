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

import { baseUrl } from "../../apis/baseUrl";

const setPokemonList = (payload) => {
  return { type: SET_POKEMON_LIST, payload };
};

const setPokemonListError = (payload) => {
  return { type: SET_POKEMON_LIST_ERROR, payload };
};

const setPokemonListLoading = (payload) => {
  return { type: SET_POKEMON_LIST_LOADING, payload };
};

const setPokemonDetail = (payload) => {
  return { type: SET_POKEMON_DETAIL, payload };
};

const setPokemonDetailError = (payload) => {
  return { type: SET_POKEMON_DETAIL_ERROR, payload };
};

const setPokemonDetailLoading = (payload) => {
  return { type: SET_POKEMON_DETAIL_LOADING, payload };
};

const setMyPokemon = (payload) => {
  return { type: SET_MY_POKEMON, payload };
};

const setMyPokemonError = (payload) => {
  return { type: SET_MY_POKEMON_ERROR, payload };
};

const setMyPokemonLoading = (payload) => {
  return { type: SET_MY_POKEMON_LOADING, payload };
};

export const fetchPokemon = (page) => {
  return async (dispatch) => {
    try {
      setPokemonListLoading(true);
      const { data: pokemons } = await baseUrl.get(`/pokemon`);
      dispatch(setPokemonList(pokemons));
    } catch (err) {
      setPokemonListError(err);
    } finally {
      setPokemonListLoading(false);
    }
  };
};

export const fetchPokemonDetail = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setPokemonDetailLoading(true));
      const { data: pokemons } = await baseUrl.get(`/pokemon/${id}`);
      dispatch(setPokemonDetail(pokemons));
    } catch (err) {
      dispatch(setPokemonDetailError(err));
    } finally {
      dispatch(setPokemonDetailLoading(false));
    }
  };
};

export const fetchMyPokemon = () => {
  return async (dispatch) => {
    try {
      dispatch(setMyPokemonLoading(true));
      const { data: pokemons } = await baseUrl.get(`/myPokemon`);
      dispatch(setMyPokemon(pokemons));
      return pokemons;
    } catch (err) {
      dispatch(setMyPokemonError(err));
    } finally {
      dispatch(setMyPokemonLoading(false));
    }
  };
};
