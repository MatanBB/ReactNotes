import Axios from 'axios'
// import { router } from '@/router'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


const axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint:any, data:any) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint:any, data:any) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint:any, data:any) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint:any, data:any) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint:any, method = 'GET', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
        console.dir(err)
        throw err
    }
}