import { Layout } from '../../components/layouts/Layout';
import { Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { NoFavorites } from '../../components/ui/NoFavorites';
import { useState, useEffect } from 'react';
import localFavorites from '../../utils/localFavorites';
import { Favorites } from '../../components/ui/Favorites';
import { NextPage } from 'next';

const FavoritesPage: NextPage = () => {

    const [favPokemons, setFavPokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavPokemons(localFavorites.pokemons);
    }, [])

    return (
        <Layout title='Favoritos'>
            
            {
                (!favPokemons[0])
                ? (<NoFavorites />)
                : (<Favorites pokemons={favPokemons} />)
            }

        </Layout>
    )
}

export default FavoritesPage