import React from 'react';
import {
  FaBoxOpen, FaListUl, FaTags, FaBars, FaImages, FaNewspaper,
  FaClipboardList, FaEnvelopeOpenText, FaFolderOpen, FaUsers, FaSignOutAlt
} from 'react-icons/fa';
import Logo from '../../assets/admin1.png';
import { Outlet } from 'react-router';

const Header = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-sky-700 text-white shadow-md flex flex-col">
        <div className="flex items-center justify-center h-20 border-b border-sky-600">
          <img src={Logo} className="w-12 h-12 mr-2" alt="Logo" />
          <span className="text-xl font-bold">Quản trị</span>
        </div>
       <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <a className="flex items-center px-3 py-2 rounded hover:bg-white hover:text-sky-600 transition" href="/admin/product">
            <FaBoxOpen className="mr-2" /> Sản phẩm
          </a>
          <a className="flex items-center px-3 py-2 rounded hover:bg-white hover:text-sky-600 transition" href="/admin/category">
            <FaListUl className="mr-2" /> Danh mục
          </a>
          <a className="flex items-center px-3 py-2 rounded hover:bg-white hover:text-sky-600 transition" href="/admin/brand">
            <FaTags className="mr-2" /> Thương hiệu
          </a>
          <a className="flex items-center px-3 py-2 rounded hover:bg-white hover:text-sky-600 transition" href="/admin/menu">
            <FaBars className="mr-2" /> Menu
          </a>
          <a className="flex items-center px-3 py-2 rounded hover:bg-white hover:text-sky-600 transition" href="/admin/banner">
            <FaImages className="mr-2" /> Banner
          </a>
          <a className="flex items-center px-3 py-2 rounded hover:bg-white hover:text-sky-600 transition" href="/admin/post">
            <FaNewspaper className="mr-2" /> Bài viết
          </a>
          <a className="flex items-center px-3 py-2 rounded hover:bg-white hover:text-sky-600 transition" href="/admin/order">
            <FaClipboardList className="mr-2" /> Đơn hàng
          </a>
          <a className="flex items-center px-3 py-2 rounded hover:bg-white hover:text-sky-600 transition" href="/admin/contact">
            <FaEnvelopeOpenText className="mr-2" /> Liên hệ
          </a>
          <a className="flex items-center px-3 py-2 rounded hover:bg-white hover:text-sky-600 transition" href="/admin/topic">
            <FaFolderOpen className="mr-2" /> Chủ đề
          </a>
          <a className="flex items-center px-3 py-2 rounded hover:bg-white hover:text-sky-600 transition" href="/admin/user">
            <FaUsers className="mr-2" /> Người dùng
          </a>
        </nav>
        <div className="border-t border-sky-600 p-4">
          <a href="/dang-xuat" className="flex items-center text-white hover:text-yellow-300">
            <FaSignOutAlt className="mr-2" /> Đăng xuất
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
      
    </div>
    
  );
};

// Component hiển thị link có icon

export default Header;
