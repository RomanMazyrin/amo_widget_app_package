import axios from 'axios';
import qs from 'qs';

export default class BackendClient {
    constructor(baseUrl, amoDomain) {
        this.baseUrl = baseUrl;
        this.amoDomain = amoDomain;
    }

    async get(actionUri, params = {}) {
        const response = await axios.get(`${this.baseUrl}/${actionUri}`, {
            params: {
                amo_subdomain: this.amoDomain,
                ...params,
            },
        });
        return response;
    }

    async post(actionUri, params = {}) {
        const resultParams = {
            amo_subdomain: this.amoDomain,
            ...params,
        };

        const response = await axios.post(
            `${this.baseUrl}/${actionUri}`,
            qs.stringify(resultParams),
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            },
        );

        return response;
    }
}
