import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { darkTheme } from '../themes/dark-theme'
import { lightTheme } from '../themes/light-theme'
import { customTheme } from '../themes/custom-theme'

import { useEffect, useState } from 'react';
import type { AppContext } from 'next/app'
import '../styles/globals.css'

import { Theme } from '@mui/material'
import Cookies from 'js-cookie';

interface Props extends AppProps {
  theme: string;
}


function MyApp({ Component, pageProps, theme = 'dark' }: Props ) {

  // console.log({theme})

  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    
    const cookieTheme = Cookies.get('theme') || 'light';
    const selectedTheme = cookieTheme === 'light'
        ? lightTheme
        : (cookieTheme === 'dark')
          ? darkTheme
          : customTheme;
    
    setCurrentTheme( selectedTheme );
  }, [])
  


  return (
    <ThemeProvider theme={ currentTheme }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}



// MyApp.getInitialProps = async( appContext: AppContext ) => {

//   const { theme } = appContext.ctx.req ? ( appContext.ctx.req as any).cookies : { theme: 'light' }
  
//   const validThemes = ['light','dark','custom'];

//   return {
//     theme: validThemes.includes( theme ) ? theme : 'dark',
//   }

// }




export default MyApp