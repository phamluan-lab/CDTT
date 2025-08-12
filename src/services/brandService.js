import httpAxios from "./httpAxios";

const brandService = {
  getList: async function() {   
      const brand = await httpAxios.get("brand");
      if (brand.data && Array.isArray(brand.data.brands)) {
        return brand.data.brands;
      } else {
        return [];
      }
  },
  create: async function(data) { 
      const response = await httpAxios.post("brand", data);  
      return response.data;  
  },
  getRow: async (id) => {
      const res = await httpAxios.get(`/brand/${id}`);
      if (res.success && res.brand) {
        return res.brand;
      }
  }, 

update: async function (brand,id) {
  const result = await httpAxios.post(`brand/${id}`,brand);
  return result;
},
getAll() {
  return httpAxios.get('/brand').then(res => res.data);
},
delete(id) {
  return httpAxios.delete(`brand/${id}`);
},
}

export default brandService;
