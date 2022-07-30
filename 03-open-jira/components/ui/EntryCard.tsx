import { Card, CardActionArea, Typography, CardContent, CardActions } from '@mui/material';

export const EntryCard = () => {



  return (
    <Card sx={{marginBottom: 1}}>
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace: 'pre-line'}}>Esto es la descripcion</Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                <Typography variant='body2'>Hace 30 minutos</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
