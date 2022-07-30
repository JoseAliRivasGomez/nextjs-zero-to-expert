import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layouts/Layout';
import { Pokemon } from '../../interfaces/pokemon-full';
import pokeApi from '../../api/pokeApi';
import { Button, Card, Col, Container, Grid, Row, Text } from '@nextui-org/react';
import Image from 'next/image';
import localFavorites from '../../utils/localFavorites';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { PokemonListResponse, SmallPokemon } from '../../interfaces/pokemon-list';
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
    pokemon: Pokemon 
}

const PokemonByNamePage: NextPage<Props> = ({pokemon}) => {

    // const router = useRouter();
    // console.log(router.query);
    
    //console.log(pokemon);

    const nameCapi = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if(pokemon?.id) setIsFavorite(localFavorites.isPokemonFavorite(pokemon.id));
    }, [pokemon.id])
    

    const onToggleFavorite = () => {

        if(!isFavorite){
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: {
                    x: 1,
                    y: 0
                }
            })
        }

        localFavorites.toggleFavorite(pokemon.id);
        setIsFavorite(!isFavorite);

        
    }
    

    return (
        <Layout title={nameCapi}>
            
            <Grid.Container css={{marginTop: '5px'}} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{padding: '30px'}}>
                        <Card.Body>
                            <Card.Image
                            src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                            alt={pokemon.name}
                            width="100%"
                            height={200} />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button color="gradient" ghost={!isFavorite} onClick={onToggleFavorite}>
                                {isFavorite ? 'En Favoritos' : 'Guardar en Favoritos'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container display='flex' direction='row' gap={0}>
                                <Row gap={1}>
                                    <Col>
                                        <Image
                                        src={pokemon.sprites.front_default}
                                        alt={pokemon.name}
                                        width={100}
                                        height={100} />
                                    </Col>
                                    <Col>
                                        <Image
                                        src={pokemon.sprites.back_default}
                                        alt={pokemon.name}
                                        width={100}
                                        height={100} />
                                    </Col>
                                    <Col>
                                        <Image
                                        src={pokemon.sprites.front_shiny}
                                        alt={pokemon.name}
                                        width={100}
                                        height={100} />
                                    </Col>
                                    <Col>
                                        <Image
                                        src={pokemon.sprites.back_shiny}
                                        alt={pokemon.name}
                                        width={100}
                                        height={100} />
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>

            </Grid.Container>

        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    const pokemons151: string[] = data.results.map(({name}) => name);
        
    return {
        paths: pokemons151.map(name => ({
            params: {name}
        })),
        // paths: [
        //     {
        //         params: {
        //             id: '1'
        //         }
        //     }
        // ],
        //fallback: false //Manda al 404 page
        fallback: 'blocking' //deja pasar si no esta en los 151
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const {name} = params as {name:string};

    const pokemon = await getPokemonInfo(name);

    if(!pokemon){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
  
    return {
      props: {
        pokemon
      },
      revalidate: 86400 // 60*60*24, revalidar cada 24 horas
    }
  }

export default PokemonByNamePage