import React, { useState } from 'react'
import Logo from '../../assets/logo.webp';
import { FaUserAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../../pages/frontend/home/CartContext';
import FavoriteCount from '../../pages/frontend/components/FavoriteCount';

const Header = () => {
  const { totalItems } = useCart();
  return (
    <header className="myheader">
      <div className="container mx-auto">
        <div className="flex items-center gap-8 py-2">
          <div className="basis-2/12">
            <img src={Logo} className='w-full' alt="" />
          </div>
          <div className="basis-5/12">
          
         
          </div>
          <div className="basis-5/12">
            <div className='grid grid-cols-3 gap-2'>
              <div className='flex'>
                <div className='basis-4/12'>
                  <div className='w-12 h-14 border-2 border-yellow-400 rounded-full flex justify-center items-center'>
                    <FaUserAlt className='text-3xl text-red-400' />
                  </div>
                </div>
                <div className="basis-8/12">
                  <h3 className='font-bold'>Thông tin</h3>
                  <h4>
                    <a href={localStorage.getItem('user') ? "/tai-khoan" : "/dang-nhap"}>
                      {localStorage.getItem('user') ? "Tài khoản" : "Đăng nhập"}
                    </a>
                  </h4>
                </div>
              </div>
              <div>
                <div className='flex'>
                  <div className='basis-4/12'>
                    <div className='relative w-12 h-14 border-2 border-yellow-400 rounded-full flex justify-center items-center'>
                      <FavoriteCount />
                    </div>
                  </div>
                  <div className="basis-8/12">
                    <h3 className='font-bold'>Yêu thích</h3>
                    <h4><a href='/favorites'>Sản phẩm</a></h4>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex'>
                  <div className='basis-4/12'>
                    <div className='relative w-12 h-14 border-2 border-yellow-400 rounded-full flex justify-center items-center'>
                      <FaShoppingCart className='text-3xl text-red-400' />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                          {totalItems}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="basis-8/12">
                    <h3 className='font-bold'>Gio hàng</h3>
                    <h4>
                      <a href="/gio-hang" className="text-blue-600 hover:underline">
                        Giỏ hàng
                      </a>
                    </h4>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </header>
  )
}

export default Header
