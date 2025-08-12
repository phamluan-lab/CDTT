import httpAxios from "./httpAxios";

    const cartService = {
    checkout: (data) => httpAxios.post('/checkout', data),
    getCart: () => httpAxios.get('/cart')
    };

export default cartService;