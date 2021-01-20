import axios from 'axios';

const client = axios.create({
    baseURL: 'https://baza-gai.com.ua',
    headers: {"Accept": "application/json"}
});

export default {
    getInfo(data) {
        return client.get(`nomer/${data}`);
    },
};
