import { Grid, Card } from "@nextui-org/react"
import { FC } from "react"
import { Favorite } from "./Favorite"

interface Props {
    pokemons: number[]
}

export const Favorites: FC<Props> = ({pokemons}) => {
    return (
        <Grid.Container gap={2} direction='row' justify='flex-start'>
        {
            pokemons.map( id => (
                <Favorite key={id} pokemonId={id} />
            ))
        }
    </Grid.Container>
    )
}
