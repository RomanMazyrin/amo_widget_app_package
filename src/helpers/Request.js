import axios from 'axios';
import qs from 'qs';

export default class Request {
    static async post(url, data = {}) {
        const response = await axios.post(
            url,
            qs.stringify(data),
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            },
        );
        return response;
    }

    static async get(url, data = {}) {
        const response = await axios.get(url, {
            params: {
                ...data,
            },
        });
        return response;
    }
}
