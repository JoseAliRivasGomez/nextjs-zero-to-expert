import { FC, PropsWithChildren } from 'react'
import Head from 'next/head'
import { Navbar } from '../ui/Navbar'

export const Layout:FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
        <Head>

        </Head>
        <nav>
            <Navbar />
        </nav>
        <main style={{ padding: '20px 50px' }}>
            { children }
        </main>
    
    </>
  )
}