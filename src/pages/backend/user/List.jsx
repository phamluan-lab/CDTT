import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaPlus, FaToggleOn, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router';
import userService from '../../../services/userService';
import { UrlImg } from '../../../config';
const List = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await userService.list();
      console.log("Kết quả từ API:", result);
      setUsers(result);
    })();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá người dùng này không?")) {
      await userService.delete(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold uppercase text-black">DANH SÁCH NGƯỜI DÙNG</h1>
        <div>
          <NavLink to="/admin/user/create" className="bg-green-600 p-2 rounded-xl text-white mx-1">
            <FaPlus className="inline" />Thêm mới
          </NavLink>
          <NavLink to="/admin/user/trash" className="bg-red-600 p-2 rounded-xl text-white mx-1">
            <FaTrash className="inline" />Thùng rác
          </NavLink>
        </div>
      </div>

      <div className="p-2 buser buser-[#cccccc]">
        <table className="buser-collapse buser buser-gray-400 w-full">

          <thead>
            <tr>
              <th className="buser buser-gray-300 p-2 w-28">Avatar</th>
              <th className="buser buser-gray-300 p-2">Họ và Tên</th>
              <th className="buser buser-gray-300 p-2">Email</th>
              <th className="buser buser-gray-300 p-2">Phone</th>
              <th className="buser buser-gray-300 p-2">Username</th>
              <th className="buser buser-gray-300 p-2 w-32">Chức năng</th>
              <th className="buser buser-gray-300 p-2 w-12">ID</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="buser buser-gray-300 p-2">
                    <img src={UrlImg + "user/" + user.avatar} alt='hinh' />
                  </td>
                  <td className="buser buser-gray-300 p-2">{user.name}</td>
                  <td className="buser buser-gray-300 p-2">{user.email}</td>
                  <td className="buser buser-gray-300 p-2">{user.phone}</td>
                  <td className="buser buser-gray-300 p-2">{user.username}</td>

                  <td className="buser buser-gray-300 p-2 text-center">
                    <button className="inline-block mx-1 text-green-500">
                      <FaToggleOn />
                    </button>
                    <NavLink className="inline-block mx-1 text-blue-600" to={`/admin/user/edit/${user.id}`}>
                      <FaEdit />

                    </NavLink>
                    <NavLink className="inline-block mx-1 text-green-600" to={'/admin/user/show/' + user.id}>
                      <FaEye />
                    </NavLink>
                    <button onClick={() => handleDelete(user.id)} className="text-red-600 mx-1">
                      <FaTrash />
                    </button>
                  </td>
                  <td className="buser buser-gray-300 p-2">{user.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
