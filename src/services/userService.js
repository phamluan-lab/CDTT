import httpAxios from "./httpAxios";

const API_URL = "http://localhost/laravelapirestful/public/api";
const userService = {
list: async () => {
    const data = await httpAxios.get("user");
    console.log("userService list:", data);
    if (data.status === "success" && Array.isArray(data.users)) {
      return data.users;
    }
    return [];
  },
create: async function(data) {  
      const response = await httpAxios.post("user", data);  
      return response.data;  
  },
getRow: async (id) => {
  const res = await httpAxios.get(`/user/${id}`);
  if (res.success && res.user) {
    return res.user;
  }
  return []; 
},
update: async function (user,id) {
const result = await httpAxios.post(`user/${id}`,user);
return result;
},
delete(id) {
  return httpAxios.delete(`user/${id}`);
},
register: async ({ name, username, email, password, phone, address }) => {
  const res = await httpAxios.post('/register', { name, username, email, password, phone, address });
  return res.user;
},
login: async ({ username, password }) => {
  try {
    const res = await httpAxios.post('/login', { username, password });
    // Kiểm tra xem API có trả về thành công không
      return res.user; // Trả về user từ phản hồi nếu thành công
  } catch (error) {
    // Xử lý lỗi khi không thể kết nối hoặc lỗi khác
    throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
  }
},

getUser: async () => {
  const res = await httpAxios.get('/user');
  return res.data;
},
logout: async () => {
  await httpAxios.post('/logout');
},

 loginWithGoogle: async (credentialResponse) => {
            console.log("Sending credential to backend:", credentialResponse?.credential); // Log để kiểm tra
            if (!credentialResponse || !credentialResponse.credential) {
                 throw new Error("Không nhận được thông tin xác thực Google.");
            }
            try {
                // Gửi credential.credential (chỉ ID token string) đến backend
                const res = await httpAxios.post('/user/login/google', {
                    credential: credentialResponse.credential
                });

                if (res.data.success) {
                     return res.user; // Trả về dữ liệu user từ backend
                } else {
                     // Backend trả về success: false
                     throw new Error(res.data.message || 'Đăng nhập bằng Google thất bại tại backend');
                }

            } catch (error) {
                console.error("Error calling backend API for Google login:", error.response?.data || error.message);
                throw new Error(error.response?.data?.message || 'Lỗi khi gửi yêu cầu đăng nhập đến máy chủ');
            }
        },


  
};

export default userService;