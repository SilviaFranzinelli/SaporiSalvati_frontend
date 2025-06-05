
export const fetchWithAuth = (url, options = {}) => {
    const token = localStorage.getItem('token');

    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: "Bearer " + token
        }
    }

    return fetch(url, options);

};