import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaSave } from 'react-icons/fa'
import { NavLink, useNavigate, useParams } from 'react-router'
import userService from '../../../services/userService'

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [roles, setRoles] = useState("");
  const [status, setStatus] = useState(1);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await userService.list();
      console.log("Kết quả từ API:", result);
      setUsers(result);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const user = await userService.getRow(id);
      console.log('Danh mục đã được tìm thấy:', user);
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setPassword(user.password);
      setAddress(user.address);
      setRoles(user.roles);
      setStatus(Number(user?.status ?? 1));
    })();
  }, [id]);

  // Hàm xử lý submit
  const handleUpdate = async (event) => {
    event.preventDefault();

    const avatar = document.getElementById('avatar')?.files?.[0];
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("roles", roles);
    formData.append("status", status);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    
    const result = await userService.update(formData, id);
    if (result.success) {
      alert('Cập nhật user thành công');
      navigate('/admin/user');
    } else {
      alert('Cập nhật user thất bại');
    }

  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='font-bold uppercase text-green-700'>SỬA NGƯỜI DÙNG</h1>
          <div>
            <button type='submit' className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaSave className="inline" /> Lưu
            </button>
            <NavLink to="/admin/user/create" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
              <FaArrowLeft className="inline" /> Thêm mới
            </NavLink>
          </div>
        </div>
        <div className='p-4 border border-[#cccccc]'>
          <div className="flex gap-6">
            <div className='basis-9/12'>
              <div className='mb-3'>
                <label htmlFor='name'>Tên người dùng</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' id='name' className='p-2 border rounded-xl w-full mt-1' />
              </div>
              <div className='mb-3'>
                <label htmlFor='username'>Username</label>
                <textarea value={username} onChange={(e) => setUsername(e.target.value)} id='username' className='p-2 border rounded-xl w-full mt-1'></textarea>
              </div>
              <div className='mb-3'>
                <label htmlFor='email'>Email</label>
                <textarea value={email} onChange={(e) => setEmail(e.target.value)} id='email' className='p-2 border rounded-xl w-full mt-1'></textarea>
              </div>
              <div className='mb-3'>
                <label htmlFor='phone'>Số điện thoại</label>
                <textarea value={phone} onChange={(e) => setPhone(e.target.value)} id='phone' className='p-2 border rounded-xl w-full mt-1'></textarea>
              </div>
              <div className='mb-3'>
                <label htmlFor='password'>Mật khẩu</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} id='password' className='p-2 border rounded-xl w-full mt-1' />
              </div>
              <div className='mb-3'>
                <label htmlFor='address'>Địa chỉ</label>
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} id='address' className='p-2 border rounded-xl w-full mt-1' />
              </div>
              <div className="mb-3">
                <label htmlFor="position">Vị trí</label>
                <select
                  value={roles}
                  onChange={(e) => setRoles(e.target.value)}
                  id="roles"
                  className="p-2 border rounded-xl w-full mt-2"
                >
                  <option value="">-- Vai trò --</option>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

            </div>

            <div className='basis-3/12'>
              <div className='mb-3'>
                <label htmlFor='avatar'>Avatar</label>
                <input type='file' id='avatar' className='p-2 border rounded-xl w-full mt-2' />
              </div>
              <div className='mb-3'>
                <label htmlFor='status'>Trạng thái</label>
                <select value={status} onChange={(e) => setStatus(parseInt(e.target.value))} id="status" className='p-2 border rounded-xl w-full mt-2'>
                  <option value="1">Hiện</option>
                  <option value="0">Ẩn</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
};

export default Edit;
