import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

    const getlayout = Component.getLayout || ((page) => page);

    // return (
    //   <>
    //     <Component {...pageProps} />
    //   </>
    // )
    return getlayout(<Component {...pageProps} />);
}

export default MyApp
