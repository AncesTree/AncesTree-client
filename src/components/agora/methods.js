import axios from 'axios';

export const get = (url, headers) => {
    return new Promise((resolve, reject) => {
        axios.get(url, headers)
            .then(res => {
                resolve(res.data);
            }).catch(err => reject(err));
    });
};

export const post = (url, body, headers) => {
    return new Promise((resolve, reject) => {
        axios.post(url, body, headers)
            .then(res => {
                resolve(res.data);
            }).catch(err => reject(err));
    });
};

export const patch = (url, body, headers) => {
    return new Promise((resolve, reject) => {
        axios.patch(url, body, headers)
            .then(res => {
                resolve(res.data);
            }).catch(err => reject(err));
    })
}
