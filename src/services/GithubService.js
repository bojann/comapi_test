import React from 'react';
import axios from 'axios';

const GithubService = {
    constructor() {
        super();
        this._get = this._get.bind()
    }

    _get(baseUrl, pathName) {
        return axios({
                mehod: 'GET',
                url: `${baseUrl}/${pathName}`,
                timeout: 5000,
            })
            .then( (resp) => {
                console.log(resp.data);          
                return resp.data;
            })
    }
}

export default GithubService;