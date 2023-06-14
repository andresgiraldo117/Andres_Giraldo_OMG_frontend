import Vue from 'vue'
import axios from "axios";
import VueAxios from 'vue-axios';

export const userService = {
    login,
    logout,
    register,
};
Vue.use(VueAxios, axios);

function login(email, password) {

    const requestOptions = {
        headers: { 'Content-Type': 'application/json',
        'apikey': process.env.VUE_APP_APIKEY},
        method: 'POST',
        body: JSON.stringify({ email, password })
    };

    return fetch(process.env.VUE_APP_API + `/api/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if(user.response.statusCode === 401){ Promise.reject(user && user.response.message) } 
            else if(user.response.statusCode === 404){ Promise.reject(user && user.response.message);
            }else{
                if (user.response.token) { localStorage.setItem('user', JSON.stringify(user.response))}
                return user.response;
            }
        });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(process.env.VUE_APP_API + `/api/auth/register`, requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
