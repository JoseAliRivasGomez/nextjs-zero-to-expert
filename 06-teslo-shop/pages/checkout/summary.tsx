import { Card, CardContent, Grid, Typography, Divider, Button, Link } from '@mui/material';
import { Box } from '@mui/system';
import { CartList } from '../../components/cart/CartList';
import { OrderSummary } from '../../components/cart/OrderSummary';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import NextLink from "next/link"
import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { countries } from '../../utils/countries';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const SummaryPage = () => {

    const {shippingAddress, numberOfItems} = useContext(CartContext);
    const router = useRouter();

    useEffect(() => {
      if(!Cookies.get('firstName')){
        router.push('/checkout/address');
      }
    }, [router])
    

    if(!shippingAddress){
        <></>;
    }


  return (
    <ShopLayout title='Resumen de orden' pageDescription='Resumen de la orden'>
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>
        <Grid container>
            <Grid item xs={12} sm={7} sx={{mt:2}}>
                <CartList />
            </Grid>
            <Grid item xs={12} sm={5} sx={{mt:2}}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})</Typography>
                        <Divider sx={{my:1}} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        
                        <Typography>{shippingAddress?.firstName} {shippingAddress?.lastName}</Typography>
                        <Typography>{shippingAddress?.address}{shippingAddress?.address2 !== '' ? `, ${shippingAddress?.address2}` : ''}</Typography>
                        <Typography>{shippingAddress?.city}, {shippingAddress?.zip}</Typography>
                        <Typography>{countries.find(c => c.code === shippingAddress?.country)?.name}</Typography>
                        <Typography>{shippingAddress?.phone}</Typography>

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
                            <Button color='info' sx={{backgroundColor: 'secondary.main'}} className='circular-btn' fullWidth>
                                Confirmar Orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage