import httpAxios from "./httpAxios";

const contactService = {
  list: async () => {
    const data = await httpAxios.get("contact");
    console.log("contactService list:", data);
    if (data.status === "success" && Array.isArray(data.contacts)) {
      return data.contacts;
    }
    return [];
  },
  create: async function (data) {
    const response = await httpAxios.post("contact", data);
    return response.data;
  },

  getRow: async (id) => {
    const res = await httpAxios.get(`/contact/${id}`);
    if (res.success && res.contact) {
      return res.contact;
    }
    return [];
  },
  update: async function (contact, id) {
    const result = await httpAxios.post(`contact/${id}`, contact);
    return result;
  },
  delete(id) {
    return httpAxios.delete(`contact/${id}`);
  },

};

export default contactService;