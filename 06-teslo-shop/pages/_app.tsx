import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { lightTheme } from '../themes/light-theme';
import { SWRConfig } from 'swr';
import { UIProvider } from '../context/ui/UIProvider';
import { CartProvider } from '../context/cart/CartProvider';
import { AuthProvider } from '../context/auth/AuthProvider';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig 
        value={{
          // refreshInterval: 3000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UIProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
