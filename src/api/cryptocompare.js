import axios from 'axios';

const client = axios.create({
    baseURL: process.env.VUE_APP_CRYPTOCOMPARE_API_BASE_URL,
    params: {
        api_key: process.env.VUE_APP_CRYPTOCOMPARE_API_KEY
    }
});

export default {
    pricemultifull(params) {
        return client.get(`pricemultifull`, params);
    },
};
