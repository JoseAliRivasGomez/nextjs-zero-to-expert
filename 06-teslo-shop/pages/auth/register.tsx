import { Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import { Box } from '@mui/system';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import NextLink from "next/link"
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { isEmail } from '../../utils/validations';
import tesloApi from '../../api/tesloApi';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth/AuthContext';

type FormData = {
    email: string,
    name: string,
    password: string,
};

const RegisterPage = () => {

    const router = useRouter();
    const {registerUser} = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegister = async ({email, password, name}: FormData) => {

        setShowError(false);
        const {hasError, message} = await registerUser(name, email, password);

        if(hasError){
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => {
                setShowError(false);
            }, 5000);
            return;
        }
        
        router.replace('/');

    }

  return (
    <AuthLayout title="Ingresar">
        <form onSubmit={handleSubmit(onRegister)} noValidate>
            <Box sx={{width: 350, padding: '10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                        <Chip label="Error al crear la cuenta" color="error" icon={<ErrorOutline />} className="fadeIn" 
                            sx={{marginTop:1, display: showError ? 'flex' : 'none'}} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Nombre completo" variant='filled' fullWidth {...register('name', {
                            required: 'El nombre es requerido',
                            minLength: {value: 2, message: 'Minimo 2 caracteres'}
                        })} error={!!errors.name} helperText={errors.name?.message} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type='email' label="Correo" variant='filled' fullWidth {...register('email', {
                            required: 'El correo es requerido',
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
                            Crear cuenta
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href="/auth/login" passHref>
                            <Link underline='always'>
                                ¿Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage