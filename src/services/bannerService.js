import httpAxios from "./httpAxios";

const bannerService = {
  getList: async () => {
    const data = await httpAxios.get("banner");
    console.log("bannerService list:", data);
    if (data.status === "success" && Array.isArray(data.banners)) {
      return data.banners;
    }
    return [];
  },
  
create: async (banner) => {
        const data = await httpAxios.post('banner', banner);
        return data;
},
getRow: async (id) => {
  const res = await httpAxios.get(`/banner/${id}`);
  if (res.success && res.banner) {
    return res.banner;
  }
  return []; 
},


update: async function (banner,id) {
const result = await httpAxios.post(`banner/${id}`,banner);
return result;
},
delete(id) {
  return httpAxios.delete(`banner/${id}`);
},
bannerlist: async (position, limit = 5) => {
    const response = await httpAxios.get(`banner-list/${position}/${limit}`);
    if (response && response.success) {
      return response;
    } else {
      throw new Error('Không có banner');
    }
},
};

export default bannerService;