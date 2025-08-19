import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
<<<<<<< HEAD
=======
import ChatBox from '../../components/frontend/ChatBox';

>>>>>>> 6358b48 (cap nhat code)
const LayoutSite = () => {
  return (
    <div>
     <Header />
<<<<<<< HEAD
     <Nav />
     <main className="mymain">
      <div className="container mx-auto md:px-6">
     
       <Outlet />

      </div>
     </main>
     <Footer />
=======
     <Nav /> 
     <main className="mymain">
      <div className="container mx-auto md:px-6">
       <Outlet />
      </div>
     </main>
     <Footer />
     <ChatBox />
>>>>>>> 6358b48 (cap nhat code)
    </div>
  )
}

export default LayoutSite
