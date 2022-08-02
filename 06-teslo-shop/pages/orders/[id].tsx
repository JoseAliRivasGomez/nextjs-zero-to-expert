import { Card, CardContent, Grid, Typography, Divider, Button, Link, Chip } from '@mui/material';
import { Box } from '@mui/system';
import { CartList } from '../../components/cart/CartList';
import { OrderSummary } from '../../components/cart/OrderSummary';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import NextLink from "next/link"
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout title='Resumen de orden 4673734583834857' pageDescription='Resumen de la orden'>
        <Typography variant='h1' component='h1'>Orden: 4673734583834857</Typography>

        {/* <Chip sx={{my:2}} label="Pendiente de pago" variant="outlined" color="error" icon={<CreditCardOffOutlined />} /> */}
        <Chip sx={{my:2}} label="Orden ya fue pagada" variant="outlined" color="success" icon={<CreditScoreOutlined />} />

        <Grid container>
            <Grid item xs={12} sm={7} sx={{mt:2}}>
                <CartList />
            </Grid>
            <Grid item xs={12} sm={5} sx={{mt:2}}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos)</Typography>
                        <Divider sx={{my:1}} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        
                        <Typography>Kim Wexler</Typography>
                        <Typography>123 Algun Lugar</Typography>
                        <Typography>Nebraska, HYA 235</Typography>
                        <Typography>Estados Unidos</Typography>
                        <Typography>+506 85238922</Typography>

                        <Divider sx={{my:1}} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{mt: 3}}>
                            <h1>Pagar</h1>
                            <Chip sx={{my:2}} label="Orden ya fue pagada" variant="outlined" color="success" icon={<CreditScoreOutlined />} />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage