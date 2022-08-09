import { Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import { Box } from '@mui/system';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import NextLink from "next/link"
import { useForm } from 'react-hook-form';
import { isEmail } from '../../utils/validations';
import tesloApi from '../../api/tesloApi';
import { ErrorOutline } from '@mui/icons-material';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { useRouter } from 'next/router';

type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const router = useRouter();
    const {loginUser} = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onLogin = async ({email, password}: FormData) => {

        setShowError(false);

        const isValidLogin = await loginUser(email, password);

        if(!isValidLogin){
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 5000);
            return;
        }
        
        router.replace('/');

    }

  return (
    <AuthLayout title="Ingresar">
        <form onSubmit={handleSubmit(onLogin)} noValidate>
            <Box sx={{width: 350, padding: '10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Iniciar Sesion</Typography>
                        <Chip label="No reconocemos ese usuario / contraseña" color="error" icon={<ErrorOutline />} className="fadeIn" 
                            sx={{marginTop:1, display: showError ? 'flex' : 'none'}} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField type='email' label="Correo" variant='filled' fullWidth {...register('email', {
                            required: 'El usuario es requerido',
                            validate: isEmail
                        })} error={!!errors.email} helperText={errors.email?.message} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Contraseña" type="password" variant='filled' fullWidth {...register('password', {
                            required: 'La contraseña es requerida',
                            minLength: {value: 8, message: 'Minimo 8 caracteres'}
                        })} error={!!errors.password} helperText={errors.password?.message} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button color='info' sx={{backgroundColor: 'secondary.main'}} className='circular-btn' size='large' fullWidth type='submit'>
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href="/auth/register" passHref>
                            <Link underline='always'>
                                ¿No tienes cuenta aun?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>  
    </AuthLayout>
  )
}

export default LoginPage