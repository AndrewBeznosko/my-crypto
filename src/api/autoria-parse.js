import axios from 'axios';

const client = axios.create({
    baseURL: 'backend/price.php',
});

export default {
    getAvgPrice(data) {
        return client.post(`/`, data);
    },
};
