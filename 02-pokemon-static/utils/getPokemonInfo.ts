import pokeApi from "../api/pokeApi";
import { Pokemon } from "../interfaces/pokemon-full";

export const getPokemonInfo = async(param: string) => {

    try {

        const {data} = await pokeApi.get<Pokemon>(`/pokemon/${param}`);
  
        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites
        }
        
    } catch (error) {
        return null;
    }

}
