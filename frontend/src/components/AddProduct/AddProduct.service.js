import axios from 'axios';

export const AddProductSerivce = {
    add: (product) => {
        return axios.post('/api/shop/product/add', product);
    },
}