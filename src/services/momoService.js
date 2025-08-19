import axios from 'axios';
import { UrlAPI } from '../config';

const momoService = {
  // Tạo yêu cầu thanh toán
  createPayment: async (orderData) => {
    try {
      const response = await axios.post(`${UrlAPI}momo/create-payment`, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Kiểm tra trạng thái thanh toán
  checkPaymentStatus: async (orderId) => {
    try {
      const response = await axios.get(`${UrlAPI}momo/check-payment/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Cập nhật trạng thái đơn hàng sau khi thanh toán
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await axios.post(`${UrlAPI}momo/update-order-status`, {
        orderId,
        status
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default momoService; 