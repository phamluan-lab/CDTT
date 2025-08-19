import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPlus, FaToggleOn, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router'
import bannerService from '../../../services/bannerService';
import { UrlImg } from '../../../config';

const List = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await bannerService.getList();
      console.log("Kết quả từ API:", result);
      setBanners(result);
    })();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá banner này không?")) {
      await bannerService.delete(id);
    }
  };

  return (
    <div className=''>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold uppercase text-black'>DANH SÁCH BANNER</h1>
        <div className=''>
          <NavLink to="/admin/banner/create" className="bg-green-600 p-2 rounded-xl text-white mx-1">
            <FaPlus className="inline" />Thêm mới
          </NavLink>
          <NavLink to="/admin/banner/trash" className="bg-red-600 p-2 rounded-xl text-white mx-1">
            <FaTrash className="inline" />Thùng rác
          </NavLink>
        </div>
      </div>
      <div className='p-2 border border-[#cccccc]'>
        <table class="border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th class="border border-gray-300 w-28 p-2 ">Hình</th>
              <th class="border border-gray-300 p-2">Tên banner</th>
              <th class="border border-gray-300 p-2">Vị trí</th>
              <th class="border border-gray-300 p-2 w-60">Chức năng</th>
              <th class="border border-gray-300 p-2 w-7">ID</th>
            </tr>
          </thead>
          <tbody>
            {banners && banners.length > 0 && banners.map((banner, index) => {
              return (
                <tr key={index}>
                  <td class="border border-gray-300 p-2">
                    <img src={UrlImg + "banner/" + banner.image} alt='hinh' />
                  </td>
                  <td class="border border-gray-300 p-2">{banner.name}</td>
                  <td class="border border-gray-300 p-2">{banner.position}</td>
                  <td class="border border-gray-300 p-2 text-center">
                    <button className='inline-block mx-1 text-green-500'>
                      <FaToggleOn />
                    </button>
                    <NavLink className="inline-block mx-1 text-blue-600" to={'/admin/banner/edit/' + banner.id}>
                      <FaEdit />
                    </NavLink>
                    <NavLink className="inline-block mx-1 text-green-600" to={'/admin/banner/show/' + banner.id}>
                      <FaEye />
                    </NavLink>
                    <button onClick={() => handleDelete(banner.id)} className="text-red-600 mx-1">
                      <FaTrash />
                    </button>
                  </td>
                  <td class="border border-gray-300 p-2">{banner.id}</td>
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