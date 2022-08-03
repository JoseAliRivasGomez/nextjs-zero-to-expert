import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { lightTheme } from '../themes/light-theme';
import { SWRConfig } from 'swr';
import { UIProvider } from '../context/ui/UIProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
      value={{
        // refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <UIProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </SWRConfig>
  )
}

export default MyApp
