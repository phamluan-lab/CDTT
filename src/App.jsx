import React from 'react'
import Logo from './assets/logo.webp'
import { FaSearch, FaUser } from 'react-icons/fa'
const App = () => {
  return (
    <>
    <header className='myheader'>
      <div className='container mx-auto'>
       <div className='flex items-center gap-5 py-2'>
       <div className='basis-2/12'>
        <img src={Logo} className='w-full' alt='' />
       </div>
        <div className='basis-5/12'>
         <form action="" className='w-8/12 relative mx-4'>
          <input type='search' placeholder='Từ khóa tìm kiếm' className='w-full border-2 border-red-400 h-12 rounded-xl px-3' />
          <button type='submit' className='absolute right-1 top-1 h-10 w-10 rounded-xl bg-red-400'>
            <FaSearch className='w-full' />
          </button>
         </form>
        </div>
        <div className='bg-amber-200 basis-5/12'>
        <div className='grid grid-cols-3 gap-2'>
          <div>
            <div className='flex'>
              <div className='basis-4/12'>
              <div className='w-12 h-12 border-2 border-red-400 rounded-full'>
              <FaUser className='w-full h-6 w-6' />
              </div>
              </div>
              <div className='basis-8/12'>
              <h3>Thông tin</h3>
              <a href='#'>Tài khoản</a>
              </div>
            </div>
          </div>
        </div>
        </div>
       </div>
      </div>
    </header>
    <nav className='mymenu'>
      <div className='container mx-auto'>
        <ul className='flex'>
          <li><a href="#">Home</a></li>
          <li><a href="#">Home</a></li>
          <li><a href="#">Home</a></li>
          <li><a href="#">Home</a></li>
        </ul>
      </div>
    </nav>
    <main className='mymain'>
      <div className='container mx-auto'>
        Main
      </div>
    </main>
    <footer className='myfooter'>
      <section>
        <div className='container mx-auto'>
          <div className='flex'>
            <div></div>
          </div>
        </div>
      </section>
    </footer>
    </>
  )
}

export default App




