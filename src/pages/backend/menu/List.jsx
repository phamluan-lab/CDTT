import React, { useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaToggleOn, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router'
import menuService from '../../../services/menuService';
const List = () => {
  const [menus, setMenus] = useState([]);

useEffect(() => {
  (async () => {
    const result = await menuService.list();
    console.log("Kết quả từ API:", result); // Kiểm tra kết quả trả về
    setMenus(result); // Sử dụng kết quả trả về từ API
  })();
}, []);
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá menu này không?")) {
      await menuService.delete(id);
    }
  };
  return (
    <div className=''>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold uppercase text-black'>DANH SÁCH MENU</h1>
        <div className=''>
          <NavLink to="/admin/menu/create" className="bg-green-600 p-2 rounded-xl text-white mx-1">
            <FaPlus className="inline" />Thêm mới
          </NavLink>
          <NavLink to="/admin/menu/trash" className="bg-red-600 p-2 rounded-xl text-white mx-1">
            <FaTrash className="inline" />Thùng rác
          </NavLink>
        </div>
      </div>
      <div className='p-2 bMenu bMenu-[#cccccc]'>
        <table class="bMenu-collapse bMenu bMenu-gray-400 w-full">
          <thead>
            <tr>
              <th class="bMenu bMenu-gray-300 p-2 w-28">Tên menu</th>
              <th class="bMenu bMenu-gray-300 p-2 w-28">Liên kết</th>
              <th class="bMenu bMenu-gray-300 p-2">Chức năng</th>
              <th class="bMenu bMenu-gray-300 p-2 w-7">ID</th>
            </tr>
          </thead>
          <tbody>
            {menus && menus.length > 0 && menus.map((menu, index) => {
              return (
                <tr key={index}>
                  <td class="bMenu bMenu-gray-300 p-2">{menu.name}</td>
                  <td class="bMenu bMenu-gray-300 p-2">{menu.link}</td>
                  <td class="bMenu bMenu-gray-300 p-2 text-center">
                    <button className='inline-block mx-1 text-green-500'>
                      <FaToggleOn />
                    </button>
                    <NavLink className="inline-block mx-1 text-blue-600" to={'/admin/menu/edit/' + menu.id}>
                      <FaEdit />
                    </NavLink>
                    <button onClick={() => handleDelete(menu.id)} className="text-red-600 mx-1">
                      <FaTrash />
                    </button>
                  </td>
                  <td class="bMenu bMenu-gray-300 p-2">{menu.id}</td>
                </tr>
              );
            })}


          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List
