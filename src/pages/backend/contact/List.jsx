import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPlus, FaToggleOn, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router'
import contactService from '../../../services/contactService';
const List = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await contactService.list();
      console.log("Kết quả từ API:", result);
      setContacts(result);
    })();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá liên hệ này không?")) {
      await contactService.delete(id);
    }
  };
  return (
    <div className=''>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold uppercase text-black'>DANH SÁCH LIÊN HỆ</h1>
        <div className=''>
          <NavLink to="/admin/contact/create" className="bg-green-600 p-2 rounded-xl text-white mx-1">
            <FaPlus className="inline" />Thêm mới
          </NavLink>
          <NavLink to="/admin/contact/trash" className="bg-red-600 p-2 rounded-xl text-white mx-1">
            <FaTrash className="inline" />Thùng rác
          </NavLink>
        </div>
      </div>
      <div className='p-2 border border-[#cccccc]'>
        <table class="border-collapse border border-gray-400 w-full">
          <thead>
            <tr>

              <th class="border border-gray-300 p-2 w-28">Tên</th>
              <th class="border border-gray-300 p-2 w-28">Email</th>
              <th class="border border-gray-300 p-2 w-28">SĐT</th>

              <th class="border border-gray-300 p-2 w-40">Chức năng</th>
              <th class="border border-gray-300 p-2 w-7">ID</th>
            </tr>
          </thead>
          <tbody>
            {contacts && contacts.length > 0 && contacts.map((contact, index) => {
              return (
                <tr key={index}>
                  <td class="border border-gray-300 p-2">{contact.name}</td>
                  <td className="border border-gray-300 p-2">{contact.email}</td>
                  <td className="border border-gray-300 p-2">{contact.phone}</td>

                  <td class="border border-gray-300 p-2 text-center">
                    <button className='inline-block mx-1 text-green-500'>
                      <FaToggleOn />
                    </button>
                    <NavLink className="inline-block mx-1 text-blue-600" to={'/admin/contact/edit/' + contact.id}>
                      <FaEdit />
                    </NavLink>
                    <NavLink className="inline-block mx-1 text-green-600" to={'/admin/contact/show/' + contact.id}>
                      <FaEye />
                    </NavLink>
                    <button onClick={() => handleDelete(contact.id)} className="text-red-600 mx-1">
                      <FaTrash />
                    </button>
                  </td>
                  <td class="border border-gray-300 p-2">{contact.id}</td>
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
