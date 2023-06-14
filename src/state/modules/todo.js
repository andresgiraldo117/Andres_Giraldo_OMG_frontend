import axios from "axios";
import { handleResponse } from '../../helpers/authservice/user.service'

export const state = {
    todos: [],
};

export const getters = {
    todos: state => state.todos,
};

export const mutations = {
    setTodos(state, newValue) {
        state.todos = newValue
    },
};

export const actions = {
    fetchTodos({ commit }) {
        axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
            commit('setTodos', res.data)
        })
    },


    // eslint-disable-next-line no-unused-vars
    fethgetallProducts({commit}, payload){
        return new Promise((resolve) => {
            fetch(process.env.VUE_APP_API + `/api/products`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                    'apikey': process.env.VUE_APP_APIKEY,
                    'token': payload.token,
                },
            })
            .then(handleResponse)
            .then(res => {
                resolve(res);
            });
        })
    },
    // eslint-disable-next-line no-unused-vars
    fethgetallProductsbyId({commit}, payload){
        return new Promise((resolve) => {
            fetch(process.env.VUE_APP_API + `/api/products/${payload.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                    'apikey': process.env.VUE_APP_APIKEY,
                    'token': payload.token,
                },
            })
            .then(handleResponse)
            .then(res => {
                resolve(res);
            });
        })
    },
    // eslint-disable-next-line no-unused-vars
    fethRegisterProduct({commit}, payload){
        return new Promise((resolve) => {
            fetch(process.env.VUE_APP_API + `/api/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'apikey': process.env.VUE_APP_APIKEY,
                    'token': payload.token,
                },
                body: JSON.stringify(payload.data)
            })
            .then(handleResponse)
            .then(res => {
                resolve(res);
            });
        })
    },
    // eslint-disable-next-line no-unused-vars
    fethupdateProduct({commit}, payload){
        return new Promise((resolve) => {
            fetch(process.env.VUE_APP_API + `/api/products/modify/${payload.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                    'apikey': process.env.VUE_APP_APIKEY,
                    'token': payload.token,
                },
                body: JSON.stringify(payload.data)
            })
            .then(handleResponse)
            .then(res => {
                resolve(res);
            });
        })
    },
    // eslint-disable-next-line no-unused-vars
    fethdeleteProduct({commit}, payload){
        return new Promise((resolve) => {
            fetch(process.env.VUE_APP_API + `/api/products/remove/${payload.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json',
                    'apikey': process.env.VUE_APP_APIKEY,
                    'token': payload.token,
                },
            })
            .then(handleResponse)
            .then(res => {
                resolve(res);
            });
        })
    },
};
