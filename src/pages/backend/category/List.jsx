import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPlus, FaToggleOn, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router'
import categoryService from '../../../services/categoryService';
import { UrlImg } from '../../../config';


const List = () => {
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    (async () => {
      const categorys = await categoryService.getList();
      console.log("Kết quả từ API:", categorys);
      setCategorys(categorys);
    })();
  }, []);
  const loadCategorys = async () => {
    const res = await categoryService.getAll();
    if (res && res.categorys) {
      setCategorys(res.categorys);
    }
  };
  useEffect(() => {
    loadCategorys();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá danh mục này không?")) {
      await categoryService.delete(id);
    }
  };

  return (
    <div className=''>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold uppercase text-black'>DANH MỤC SẢN PHẨM</h1>
        <div className=''>
          <NavLink to="/admin/category/create" className="bg-green-600 p-2 rounded-xl text-white mx-1">
            <FaPlus className="inline" />Thêm mới
          </NavLink>
          <NavLink to="/admin/category/trash" className="bg-red-600 p-2 rounded-xl text-white mx-1">
            <FaTrash className="inline" />Thùng rác
          </NavLink>
        </div>
      </div>
      <div className='p-2 border border-[#cccccc]'>
        <table class="border-collapse border border-gray-400 w-full">
          <thead>
            <tr>

              <th class="border border-gray-300 p-2 w-28">Hình</th>
              <th class="border border-gray-300 p-2">Danh mục</th>
              <th class="border border-gray-300 p-2">Slug</th>
              <th class="border border-gray-300 p-2">Chức năng</th>
              <th class="border border-gray-300 p-2 w-7">ID</th>
            </tr>
          </thead>
          <tbody>
            {categorys && categorys.length > 0 && categorys.map((category, index) => {
              return (
                <tr key={index}>
                  <td className='border border-gray-300 p-2 w-28'>
                    <img src={UrlImg + "category/" + category.image} alt='hinh' />
                  </td>

                  <td class="border border-gray-300 p-2">{category.name}</td>
                  <td class="border border-gray-300 p-2">{category.slug}</td>

                  <td class="border border-gray-300 p-2 text-center">
                    <button className='inline-block mx-1 text-green-500'>
                      <FaToggleOn />
                    </button>
                    <NavLink className="inline-block mx-1 text-blue-600" to={'/admin/category/edit/' + category.id}>
                      <FaEdit />
                    </NavLink>
                    <NavLink className="inline-block mx-1 text-green-600" to={'/admin/category/show/' + category.id}>
                      <FaEye />
                    </NavLink>
                    <button onClick={() => handleDelete(category.id)} className="text-red-600 mx-1">
                      <FaTrash />
                    </button>
                  </td>
                  <td class="border border-gray-300 p-2">{category.id}</td>
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

