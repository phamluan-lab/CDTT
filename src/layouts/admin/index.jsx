import React from 'react'
<<<<<<< HEAD
import Header from './Header'
import Footer from './Footer'

const LayoutAdmin = () => {
  return (
    <div>
      <Header />
     
=======
import { useNavigate } from 'react-router'
import authService from '../../services/authService'
import Header from './Header'
import Footer from './Footer'

const LayoutAdmin = ({ children }) => {
  const navigate = useNavigate()
  const currentUser = authService.getUser()

  const handleLogout = () => {
    authService.logout()
    navigate('/admin/login')
  }

  return (
    

    <div className="min-h-screen bg-gray-100">
      
   
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
>>>>>>> 6358b48 (cap nhat code)
      <Footer />
    </div>
  )
}

<<<<<<< HEAD
export default LayoutAdmin
=======
export default LayoutAdmin
>>>>>>> 6358b48 (cap nhat code)
