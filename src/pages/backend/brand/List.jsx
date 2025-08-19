import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPlus, FaToggleOn, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router'
import brandService from '../../../services/brandService';
import { UrlImg } from '../../../config';

const List = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    (async () => {
      const brands = await brandService.getList();
      console.log("Kết quả từ API:", brands);
      setBrands(brands);
    })();
  }, []);
  const loadBrands = async () => {
    const res = await brandService.getAll();
    if (res && res.brands) {
      setBrands(res.brands);
    }
  };
  useEffect(() => {
    loadBrands();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá thương hiệu này không?")) {
      await brandService.delete(id);
    }
  };
  return (
    <div className=''>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold uppercase text-black'>DANH SÁCH THƯƠNG HIỆU</h1>
        <div className=''>
          <NavLink to="/admin/brand/create" className="bg-green-600 p-2 rounded-xl text-white mx-1">
            <FaPlus className="inline" />Thêm mới
          </NavLink>
          <NavLink to="/admin/brand/trash" className="bg-red-600 p-2 rounded-xl text-white mx-1">
            <FaTrash className="inline" />Thùng rác
          </NavLink>
        </div>
      </div>
      <div className='p-2 border border-[#cccccc]'>
        <table class="border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2 w-28">Hình</th>

              <th class="border border-gray-300 p-2">Thương hiệu</th>
              <th class="border border-gray-300 p-2">Slug</th>
              <th class="border border-gray-300 p-2">Chức năng</th>
              <th class="border border-gray-300 p-2 w-7">ID</th>
            </tr>
          </thead>
          <tbody>
            {brands && brands.length > 0 && brands.map((brand, index) => {
              return (
                <tr key={index}>
                  <td className='border border-gray-300 p-2 w-28'>
                    <img src={UrlImg + "brand/" + brand.image} alt='hinh' />
                  </td>
                  <td class="border border-gray-300 p-2">{brand.name}</td>
                  <td class="border border-gray-300 p-2">{brand.slug}</td>

                  <td class="border border-gray-300 p-2 text-center">
                    <button className='inline-block mx-1 text-green-500'>
                      <FaToggleOn />
                    </button>
                    <NavLink className="inline-block mx-1 text-blue-600" to={'/admin/brand/edit/' + brand.id}>
                      <FaEdit />
                    </NavLink>
                    <NavLink className="inline-block mx-1 text-green-600" to={'/admin/brand/show/' + brand.id}>
                      <FaEye />
                    </NavLink>
                    <button onClick={() => handleDelete(brand.id)} className="text-red-600 mx-1">
                      <FaTrash />
                    </button>
                  </td>
                  <td class="border border-gray-300 p-2">{brand.id}</td>
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

