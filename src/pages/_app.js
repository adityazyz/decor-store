import '@/styles/globals.css'
import Footer from '../../components/Footer'
import Navbar from '../../components/navbar/Navbar'
import { store } from '../../store'
import { Provider } from 'react-redux'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


export default function App({ Component, pageProps }) {

  const router = useRouter();
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    router.events.on("routeChangeStart",()=>{
      setProgress(40)
    })
    router.events.on("routeChangeComplete",()=>{
      setProgress(100)
    })
  
  }, [])
  
  
  return <>

  <Provider store={store}>
    <LoadingBar
        color='#00E1A4'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
    />
    <Navbar/>
    <Component {...pageProps} />
    <Footer/>
  </Provider> 

  </> 
}
