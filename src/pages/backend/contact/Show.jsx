import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import contactService from '../../../services/contactService'; 
import { UrlImg } from '../../../config';

export default function Showcontact() {
  const { id } = useParams(); 
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const loadContact = async () => {
      setLoading(true); 
      try {
        const contactData = await contactService.getRow(id); 
        if (contactData) {
          setContact(contactData); 
        } else {
          setError('liên hệ không tồn tại.');
        }
      } catch (error) {
        setError('Lỗi khi tải chi tiết sản phẩm.');
      } finally {
        setLoading(false); 
      }
    };

    loadContact();
  }, [id]); 
  if (!contact) return <div className="text-center p-5 text-xl">Liên hệ không tồn tại.</div>;
  return (
    <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Chi tiết liên hệ: {contact.name}</h1> 
     
      <div className="space-y-4">
      <p className="text-lg"><strong>Email:</strong> {contact.email}</p>
      <p className="text-lg"><strong>SĐT:</strong> {contact.phone}</p>
      <p className="text-lg"><strong>Người dùng:</strong> {contact.userid}</p>
      <p className="text-lg"><strong>Tiêu đề:</strong> {contact.title}</p>
      <p className="text-lg"><strong>Nội dung:</strong> {contact.content}</p>
        <p className="text-lg"><strong>Mô tả:</strong> {contact.description || 'Không có mô tả.'}</p>
        <p className="text-lg"><strong>Trạng thái:</strong> {contact.status === 1 ? 'Hiển thị' : 'Ẩn'}</p>
      </div>
    </div>
  );
}





