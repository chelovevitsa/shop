import axios from 'axios';

export const LoginBoxSerivce = {
    login: (data) => {
        return axios.post('/api/shop/login', data);
    }
}