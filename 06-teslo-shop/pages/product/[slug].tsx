import { Button, Chip, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideshow } from '../../components/products/ProductSlideshow';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { SizeSelector } from '../../components/products/SizeSelector';
import { IProduct } from '../../interfaces/products';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllProductSlugs, getProductBySlug } from '../../database/dbProducts';

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({product}) => {



  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'> 
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

            <Box sx={{my:2}}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter />
              <SizeSelector 
                //selectedSize={product.sizes[0]} 
                sizes={product.sizes}  />
            </Box>

            <Button color='info' sx={{backgroundColor: 'secondary.main'}} className='circular-btn'>
              Agregar al carrito
            </Button>

            {/* <Chip label="No hay disponibles" color="error" variant="outlined" /> */}
            <Box sx={{mt:3}}>
              <Typography variant='subtitle2'>Descripcion</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const slugs = await getAllProductSlugs();
      
    //const slugsArray: string[] = slugs.map(({slug}) => slug);

    return {
        paths: slugs.map(({slug}) => ({
            params: {slug}
        })),
        // paths: [
        //     {
        //         params: {
        //             id: '1'
        //         }
        //     }
        // ],
      //fallback: false //Manda al 404 page
      fallback: 'blocking' //deja pasar si no esta en los 649
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const {slug=''} = params as {slug: string};

    const product = await getProductBySlug(slug);

    if(!product){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
      props: {
        product
      }, 
      revalidate: 86400 // 60*60*24, revalidar cada 24 horas
    }
}

// export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
//   const {slug=''} = params as {slug: string};

//   const product = await getProductBySlug(slug);

//   if(!product){
//       return {
//           redirect: {
//               destination: '/',
//               permanent: false,
//           }
//       }
//   }

//   return {
//       props: {
//         product
//       }
//   }
// }

export default ProductPage