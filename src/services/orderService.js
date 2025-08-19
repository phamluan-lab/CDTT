import httpAxios from "./httpAxios";

const orderService = {
  list: async () => {
    const data = await httpAxios.get("order");
    console.log("Danh sách đơn hàng:", data);
    if (data.status === "success" && Array.isArray(data.orders)) {
      return data.orders;
    }
    return [];
  },

  // Tạo đơn hàng mới
  create: async (order) => {
    try {
      const response = await httpAxios.post('order', order);
      return response;
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      throw error;
    }
  },

  // Lấy danh sách người dùng
  getUsers: async () => {
    const res = await httpAxios.get("user");
    return res.users;
  },

  // Lấy thông tin chi tiết đơn hàng
  getRow: async (id) => {
    const res = await httpAxios.get(`/order/${id}`);
    if (res.success && res.order) {
      return res.order;
    }
    return [];
  },

  // Cập nhật đơn hàng
  update: async function (order, id) {
    try {
      // Validate required fields
      if (!order.name || !order.phone || !order.email || !order.address) {
        throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc');
      }

      const result = await httpAxios.post(`order/${id}`, {
        name: order.name,
        phone: order.phone,
        email: order.email,
        address: order.address,
        note: order.note || '',
        status: order.status || 0,
        userid: order.userid
      });

      if (result.data && result.data.success) {
        return {
          success: true,
          message: 'Cập nhật đơn hàng thành công',
          order: result.data.order
        };
      } else {
        throw new Error(result.data?.message || 'Cập nhật đơn hàng thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật đơn hàng:', error);
      throw new Error(error.response?.data?.message || 'Không thể cập nhật đơn hàng. Vui lòng thử lại sau.');
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateStatus: async function (id, status) {
    try {
      // Kiểm tra trạng thái hợp lệ
      const validStatuses = [0, 1, 2, 3];
      const statusValue = parseInt(status);
      
      if (!validStatuses.includes(statusValue)) {
        throw new Error('Trạng thái đơn hàng không hợp lệ');
      }

      // Lấy thông tin đơn hàng hiện tại
      const currentOrder = await this.getRow(id);
      if (!currentOrder) {
        throw new Error('Không tìm thấy đơn hàng');
      }

      // Gọi API cập nhật trạng thái
      const result = await httpAxios.put(`order/${id}/status`, { 
        status: statusValue
      });

      // Kiểm tra kết quả
      if (result.success) {
        return {
          success: true,
          message: 'Cập nhật trạng thái đơn hàng thành công',
          order: result.order
        };
      } else {
        throw new Error(result.message || 'Cập nhật trạng thái đơn hàng thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại sau.');
    }
  },

  // Lấy lịch sử trạng thái đơn hàng
  getStatusHistory: async function (id) {
    try {
      const result = await httpAxios.get(`order/${id}/status-history`);
      return result.history || [];
    } catch (error) {
      console.error('Lỗi khi lấy lịch sử trạng thái đơn hàng:', error);
      return [];
    }
  },

  // Xóa đơn hàng
  delete(id) {
    return httpAxios.delete(`order/${id}`);
  },
};

export default orderService;