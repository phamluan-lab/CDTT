import React, { useState } from 'react';
import momoService from '../services/momoService';

const MomoPayment = ({ amount, orderInfo }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const orderData = {
        amount,
        orderInfo,
        orderId: `ORDER_${Date.now()}`,
        redirectUrl: `${window.location.origin}/payment-success`,
        ipnUrl: `${window.location.origin}/api/momo/ipn`
      };

      const response = await momoService.createPayment(orderData);
      
      if (response.payUrl) {
        window.location.href = response.payUrl;
      } else {
        setError('Không thể tạo URL thanh toán');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi xử lý thanh toán');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50"
      >
        {loading ? 'Đang xử lý...' : 'Thanh toán với MoMo'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default MomoPayment; 