import { Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { ShopLayout } from "../../components/layouts/ShopLayout"
import { Box } from '@mui/system';

const AddressPage = () => {
  return (
    <ShopLayout title="Direccion" pageDescription="Confirmar direccion del destino">
        <Typography variant="h1" component='h1'>Direccion</Typography>

        <Grid container spacing={2} sx={{mt: 1}}>
            <Grid item xs={12} sm={6}>
                <TextField label="Nombre" variant='filled' fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Apellido" variant='filled' fullWidth/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label="Direccion" variant='filled' fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Direccion 2 (opcional)" variant='filled' fullWidth/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label="Codigo Postal" variant='filled' fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Ciudad" variant='filled' fullWidth/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Select variant='filled' label="Pais" value={1}>
                        <MenuItem value={1}>Costa Rica</MenuItem>
                        <MenuItem value={2}>Honduras</MenuItem>
                        <MenuItem value={3}>El Salvador</MenuItem>
                        <MenuItem value={4}>Mexico</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Telefono" variant='filled' fullWidth/>
            </Grid>
        </Grid>

        <Box sx={{mt: 5}} display='flex' justifyContent='center'>
            <Button color='info' sx={{px: 2, py: 1, backgroundColor: 'secondary.main'}}  className="circular-btn">
                Revisar pedido
            </Button>
        </Box>
    </ShopLayout>
  )
}

export default AddressPage