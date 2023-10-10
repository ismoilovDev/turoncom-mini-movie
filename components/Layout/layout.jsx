import { memo } from 'react'
import Head from 'next/head'
import Navbar from '../Navbar/navbar'
import Footer from '../Footer/footer'

const Layout = ({ children }) => {
   return (
      <div className="layout">
         <Head>
            <title>Turoncom Movie Mini</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
         <Navbar />
         <div className="page">
            <div className="container">
               {children}
            </div>
         </div>
         <Footer />
      </div>
   )
}

export default memo(Layout)
