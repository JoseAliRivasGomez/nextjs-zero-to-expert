import { Card, CardContent, Grid, Typography, Divider, Button, Link, Chip } from '@mui/material';
import { Box } from '@mui/system';
import { CartList } from '../../components/cart/CartList';
import { OrderSummary } from '../../components/cart/OrderSummary';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import NextLink from "next/link"
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { getOrderById } from '../../database/dbOrders';
import { IOrder } from '../../interfaces/order';
import { countries } from '../../utils/countries';

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({order}) => {
    
    const {shippingAddress} = order;

  return (
    <ShopLayout title='Resumen de orden' pageDescription='Resumen de la orden'>
        <Typography variant='h1' component='h1'>Orden: {order._id}</Typography>

        {
            order.isPaid ? (
                <Chip sx={{my:2}} label="Orden ya fue pagada" variant="outlined" color="success" icon={<CreditScoreOutlined />} />
            ) : (
                <Chip sx={{my:2}} label="Pendiente de pago" variant="outlined" color="error" icon={<CreditCardOffOutlined />} />
            )
        }

        <Grid container className='fadeIn'>
            <Grid item xs={12} sm={7} sx={{mt:2}}>
                <CartList products={order.orderItems} />
            </Grid>
            <Grid item xs={12} sm={5} sx={{mt:2}}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
                        <Divider sx={{my:1}} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
                        </Box>

                        
                        <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                        <Typography>{shippingAddress.address}{shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
                        <Typography>{shippingAddress.city}, {shippingAddress.zip}</Typography>
                        <Typography>{countries.find(c => c.code === shippingAddress.country)?.name}</Typography>
                        <Typography>{shippingAddress?.phone}</Typography>

                        <Divider sx={{my:1}} />

                        <OrderSummary order={order} />

                        <Box sx={{mt: 3}} display='flex' flexDirection='column'>
                            {
                                order.isPaid ? (
                                    <Chip sx={{my:2}} label="Orden ya fue pagada" variant="outlined" color="success" icon={<CreditScoreOutlined />} />
                                ) : (
                                    <h1>Pagar</h1>
                                )
                            }
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    
    const {id = ''} = query;

    const session: any = await getSession({req});

    if(!session){
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await getOrderById(id.toString());

    if(!order){
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }

    if(order.user !== session.user._id){
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage