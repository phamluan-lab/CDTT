import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import momoService from '../services/momoService';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('processing');

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const orderId = searchParams.get('orderId');
        const resultCode = searchParams.get('resultCode');

        if (resultCode === '0') {
          // Kiểm tra trạng thái thanh toán từ server
          const response = await momoService.checkPaymentStatus(orderId);
          
          if (response.success) {
            setPaymentStatus('success');
            // Cập nhật trạng thái đơn hàng
            await momoService.updateOrderStatus(orderId, 'paid');
          } else {
            setPaymentStatus('failed');
          }
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setPaymentStatus('failed');
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {paymentStatus === 'processing' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Đang xử lý thanh toán...</h2>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Thanh toán thành công!</h2>
            <p className="text-gray-600 mb-4">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
            >
              Quay về trang chủ
            </button>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">Thanh toán thất bại</h2>
            <p className="text-gray-600 mb-4">Đã có lỗi xảy ra trong quá trình thanh toán.</p>
            <button
              onClick={() => navigate('/gio-hang')}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
            >
              Thử lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess; 