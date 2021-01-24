import axios from 'axios';

const client = axios.create({
    baseURL: process.env.VUE_APP_OPEN_CARS_API_BASE_URL,
    headers: {'X-Api-Key': process.env.VUE_APP_OPEN_CARS_API_KEY}
});

export default {
    operations(params) {
        return client.get(`operations`, params);
    },
    registrations(params) {
        return client.get(`registrations`, params);
    },
};
