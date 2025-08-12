import httpAxios from "./httpAxios";

const productService = {
  list: async (page = 1, limit = 10) => {
    try {
      const res = await httpAxios.get("product", { params: { page, limit } });
      console.log('List API Response:', res); // Log để debug

      if (res && res.products) {
        return {
          products: res.products,
          total: res.total || 0,
          per_page: res.per_page || limit,
          current_page: res.current_page || page,
          last_page: res.last_page || 1
        };
      }
      return {
        products: [],
        total: 0,
        per_page: limit,
        current_page: page,
        last_page: 1
      };
    } catch (error) {
      console.error('List API Error:', error.response || error);
      return {
        products: [],
        total: 0,
        per_page: limit,
        current_page: page,
        last_page: 1
      };
    }
  },

  create: async (product) => {
    const data = await httpAxios.post("product", product, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  getCategories: async () => {
    const res = await httpAxios.get("category");
    return res.categories;
  },
  

  getBrands: async () => {
    const res = await httpAxios.get("brand");
    return res.brands;
  },
  getRow: async (id) => {
   
      const res = await httpAxios.get(`product/${id}`);
      if (res.success && res.product) {
        return res.product;
      }
  }, 
  
  
update: async function (product,id) {
  const result = await httpAxios.post(`product/${id}`,product);
  return result;
},
delete(id) {
  return httpAxios.delete(`product/${id}`);
},

getAll() {
  return httpAxios.get('/product').then(res => res.data);
},
// ... existing code ...



// ... existing code ...
productnew: async function (limit) {
  const result = await httpAxios.get(`product-new/${limit}`);
  return result.products;
},
productsale: async function (limit) {
  const result = await httpAxios.get(`product-sale/${limit}`);
  return result.products;
},
productall: async (category = "all", brand ="all",page =1, limit=3, keyword=null) => {
  const obj_params ={
    category: category,
    brand: brand,
    page: page,
    limit: limit,
    keyword: keyword
  }
  const data = await httpAxios.get(`product-all`, {params: obj_params});
  console.log(data);
  if (!data && data.success == false) {
    return [];
  }
  return data.products;
},

getBySlug: async (slug, limit = 4) => { 
    const res = await httpAxios.get(`product-slug/${slug}/${limit}`);
    console.log("Dữ liệu API trả về:", res);
    if (!res || !res.product) {
      throw new Error("Dữ liệu không hợp lệ hoặc không có sản phẩm");
    }
    return {
      product: res.product,
      relatedProducts: res.relatedProducts || [],
    };
},
// src/services/productService.js
getProductsByCategory: async function (categoryId, limit = 10) {
  const response = await httpAxios.get(`product-category/${categoryId}/${limit}`);
  return response.products;
},

changeStatus: async function (id) {
  const res = await httpAxios.post(`product/status/${id}`);
  return res.product; // Trả về { success, status, message }
},


 
};

export default productService;

