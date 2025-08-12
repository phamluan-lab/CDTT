import httpAxios from "./httpAxios";

const menuService = {
  list: async () => {
    const data = await httpAxios.get("menu");
    console.log("menuService list:", data);
    if (data.status === "success" && Array.isArray(data.menus)) {
      return data.menus;
    }
    return [];
  },
create: async (menu) => {
    const data = await httpAxios.post('menu', menu);
    return data;
},
getRow: async (id) => {
  const res = await httpAxios.get(`/menu/${id}`);
  if (res.success && res.menu) {
    return res.menu;
  }
  return []; 
},

update: async function (menu, id) {
  const result = await httpAxios.post(`menu/${id}`, menu);
  return result;
},
  delete(id) {
    return httpAxios.delete(`menu/${id}`);
  },
  getMenus: async function (parent_id, position, limit) {
    const response = await httpAxios.get(`menu-list/${parent_id}/${position}/${limit}`);
    return response.menus; 
  },
  
};

export default menuService;