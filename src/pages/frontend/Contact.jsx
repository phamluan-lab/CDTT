import React, { useState } from 'react';
import contactService from '../../services/contactService';
import Breadcrumb from '../frontend/home/BreadCrumb';
 

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Đang gửi...'); 
      await contactService.create(formData); 
      setStatus('Gửi thành công!');
      setFormData({ name: '', email: '', phone: '', message: '' });
  };
  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Liên hệ', to: '/lien-he' },
   
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Thông tin của chúng tôi</h3>
          <p className="text-gray-600 mb-2">
            <strong>Địa chỉ:</strong> Đường 79, phường Phước Long B, quận Thủ Đức, TP HCM
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Điện thoại:</strong> 0885235674
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> support@gmail.com
          </p>
          {/* Thêm các thông tin khác nếu cần */}
        </div>

        {/* Phần nhúng Google Map */}
        <div className="w-full h-64 md:h-auto">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Vị trí của chúng tôi</h3>
           {/* Thay thế iframe này bằng mã nhúng bản đồ thực tế từ Google Maps */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58049.858486935016!2d106.76844326771032!3d10.843259239769854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527aa01b285d7%3A0x22d9a83a78bd0770!2zMTAwIMSQLiA3OSwgUGjGsOG7m2MgTG9uZyBCLCBRdeH6rW4gOSwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1749631332718!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>

      {/* Phần Form Liên hệ */}
      <div className="max-w-xl mx-auto">
         <h3 className="text-xl font-semibold mb-3 text-gray-800">Gửi tin nhắn cho chúng tôi</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Họ và tên *" value={formData.name} onChange={handleChange} required
            className="w-full border border-gray-300 p-3 rounded"
          />
          <input type="email" name="email" placeholder="Email" value={formData.email} 
          onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded"
          />
          <input type="text" name="phone" placeholder="Số điện thoại *" value={formData.phone} onChange={handleChange} required
            className="w-full border border-gray-300 p-3 rounded"
          />
          <textarea name="message" placeholder="Nội dung" value={formData.message} onChange={handleChange} rows="4"
            className="w-full border border-gray-300 p-3 rounded">
          </textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
            Gửi thông tin
          </button>
          {status && <p className="text-center text-sm text-gray-600 mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
}

export default Contact;


