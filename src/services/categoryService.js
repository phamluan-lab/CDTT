import httpAxios from "./httpAxios";

const categoryService = {
  getList: async function() {
      const category = await httpAxios.get("category");
      if (category.data && Array.isArray(category.data.categorys)) {
        return category.data.categorys;
      } else {
        console.warn("Dữ liệu không đúng cấu trúc:", category.data);
        return [];
      }  
  },
  create: async (category) => { 
      const data = await httpAxios.post("category", category);
      return data;
  
  },
  getRow: async (id) => {  
      const res = await httpAxios.get(`/category/${id}`);
      if (res.success && res.category) {
        return res.category;
      }
  }, 
update: async function (category,id) {
  const result = await httpAxios.post(`category/${id}`,category);
  return result;
},
getAll() {
  return httpAxios.get('/category').then(res => res.data);
},
delete(id) {
  return httpAxios.delete(`category/${id}`);
},
categorylist: async (parent_id = 0) => {
  const res = await httpAxios.get(`/category_list/${parent_id}`);
  if (res.success && Array.isArray(res.categorys)) {
    return res.categorys;
  }
  throw new Error('Không có dữ liệu danh mục');
},

};
export default categoryService;



