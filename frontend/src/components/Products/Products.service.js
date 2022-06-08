import axios from 'axios';

export const ProductsSerivce = {
    get: () => {
        return axios.get('/api/shop/products');
    },
}