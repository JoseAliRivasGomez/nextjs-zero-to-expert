import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme } from '../themes/darktheme';

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    )
}

export default MyApp
