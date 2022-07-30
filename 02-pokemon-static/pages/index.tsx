import { Grid, Image } from '@nextui-org/react'
import type { NextPage, GetStaticProps } from 'next'
import { Layout } from '../components/layouts/Layout'
import pokeApi from '../api/pokeApi';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon/PokemonCard';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {

  
  

    return (
      <Layout title='Listado de Pokemons'>

      {/* <Image
      src='/img/banner.png'
      alt='banner'
      width={200}
      height={150} /> */}
        
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </Grid.Container>

      </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((pokemon, i) =>({
    ...pokemon,
    id: i+1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
