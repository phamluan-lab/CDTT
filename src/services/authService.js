import httpAxios from "./httpAxios";

const authService = {
  // Đăng nhập
  login: async ({ username, password }) => {
    try {
      const res = await httpAxios.post('/admin/login', { username, password });
        return res.user;
      throw new Error(res.data.message || 'Đăng nhập thất bại');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  },

  // Đăng xuất
  logout: async () => {
    await httpAxios.post('/admin/logout');
  },

getUser: async () => {
  const res = await httpAxios.get('/user');
  return res.data;
},

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated: () => {
    return !!localStorage.getItem('admin_token');
  },

  // Lấy token
  getToken: () => {
    return localStorage.getItem('admin_token');
  }
};

export default authService; 