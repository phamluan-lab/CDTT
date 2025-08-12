import { data } from "react-router";
import httpAxios from "./httpAxios";

const postService = {
  list: async () => {
    const data = await httpAxios.get("post");
    console.log("postService list:", data);
    if (data.status === "success" && Array.isArray(data.posts)) {
      return data.posts;
    }
    return [];
  },
  create: async (post) => {
    try {
        const data = await httpAxios.post('post', post);
        return data;
    } catch (error) {
        console.error("Lỗi từ API khi tạo post:");
        if (error.response) {
            console.error("Response:", error.response.data);
            console.error("Status:", error.response.status);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error message:", error.message);
        }
        throw error;
    }
},
getRow: async (id) => {
  const res = await httpAxios.get(`/post/${id}`);
  if (res.success && res.post) {
    return res.post;
  }
  return []; 
},


update: async function (post,id) {
const result = await httpAxios.post(`post/${id}`,post);
return result;
},
getAll() {
  return httpAxios.get('/post').then(res => res.data);
},
delete(id) {
  return httpAxios.delete(`post/${id}`);
},
postnew: async function (limit) {
  const result = await httpAxios.get(`post-new/${limit}`);
  return result.posts;
},
postall: async function (limit, page = 1) {
  const result = await httpAxios.get(`post-all/${limit}`, {
    params: { page }
  });
  return result.posts
    
},
getPostsByTopic: async function (topicId, limit = 10, page = 1) {
  try {
    const result = await httpAxios.get(`post-topic/${limit}`, {
      params: { topic: topicId, page: page }
    });
    console.log("API Response in service:", result); // Debug log
    
    if (result.data) {
      return {
        posts: result.data.posts || [],
        pagination: result.data.pagination || {
          current_page: page,
          limit: limit,
          total: result.data.posts?.length || 0,
          last_page: Math.ceil((result.data.posts?.length || 0) / limit)
        }
      };
    }
    return {
      posts: [],
      pagination: {
        current_page: 1,
        limit: limit,
        total: 0,
        last_page: 1
      }
    };
  } catch (error) {
    console.error("Error in getPostsByTopic:", error);
    throw error;
  }
},
  getPostDetail: async (id, limit = 4) => {
    try {
      const res = await httpAxios.get(`post-detail/${id}/${limit}`);
      console.log("✔️ API post-detail trả về:", res);

      return {
        post: res.post,
        posts: res.posts || []
      };
    } catch (error) {
      console.error("❌ Lỗi gọi API post-detail:", error.response?.data?.message || error.message);
      return null;
    }
  },





postpage: async function (slug, limit) {
  try {
    // Thêm tham số limit nếu cần
    const result = await httpAxios.get(`post-page/${slug}/${limit}`);
    
    // Kiểm tra kết quả và trả về dữ liệu
    return result.data;  // result.data chứa 'post' và 'posts' nếu API trả về đúng cấu trúc
  } catch (error) {
    console.error("Lỗi khi gọi API: ", error);
    throw error;  // Ném lỗi để có thể xử lý trong component nếu cần
  }
},
relatedPosts: async function (slug, limit) {
  const result = await httpAxios.get(`related-posts/${slug}/${limit}`);
  return result.data;
},
postsale: async function (limit = 4) {
  try {
    const result = await httpAxios.get(`post-sale/${limit}`);
    return result.posts; 
  } catch (error) {
    console.error("Lỗi khi gọi API post-sale:", error);
    throw error;
  }
},



  
};

export default postService;