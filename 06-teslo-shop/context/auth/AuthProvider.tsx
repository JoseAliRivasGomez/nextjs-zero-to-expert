import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { IUser } from '../../interfaces/users';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import tesloApi from '../../api/tesloApi';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

export interface AuthState {
   isLoggedIn: boolean;
   user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
   isLoggedIn: false,
   user: undefined,
}

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter();

    useEffect(() => {
      checkToken();
    }, [])

    const checkToken = async () => {

        if(!Cookies.get('token')){
            return;
        }

        try {
            const {data} = await tesloApi.get('/user/renew');
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type: 'Auth - Login', payload: user});

        } catch (error) {
            Cookies.remove('token');
        }
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const {data} = await tesloApi.post('/user/login', {email, password});
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type: 'Auth - Login', payload: user});
            return true;

        } catch (error) {
            return false;
        }
    }

    const registerUser = async (name: string, email: string, password: string): Promise<{hasError: boolean; message?: string;}> => {
        try {
            const {data} = await tesloApi.post('/user/register', {name, email, password});
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type: 'Auth - Login', payload: user});
            
            return {
                hasError: false
            }

        } catch (error) {
            if(axios.isAxiosError(error)){
                const {message} = error.response?.data as {message : string}
                return {
                    hasError: true,
                    message,
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const logoutUser = () => {
        Cookies.remove('token');
        Cookies.remove('cart');
        router.reload();
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            registerUser,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}