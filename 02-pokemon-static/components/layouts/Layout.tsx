import Head from "next/head"
import { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Navbar } from '../ui/Navbar';

interface Props {
    children?: ReactNode,
    title?: string;
}

export const Layout: FC<Props> = ({children, title}) => {

    const [origin, setOrigin] = useState('');

    useEffect(() => {
      setOrigin(window.location.origin);
    }, [])
    

    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Jose Rivas"/>
                <meta name="description" content={`Informacion sobre el pokemon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />
                <meta property="og:title" content={`Informacion sobre el pokemon ${title}`} />
                <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>

            <Navbar />

            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    )
}
