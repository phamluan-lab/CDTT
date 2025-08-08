import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
const LayoutSite = () => {
  return (
    <div>
     <Header />
     <Nav />
     <main className="mymain">
      <div className="container mx-auto md:px-6">
     
       <Outlet />

      </div>
     </main>
     <Footer />
    </div>
  )
}

export default LayoutSite
