import axios from 'axios'
import JWTLocalStorage from '../JWTLocalStorage/JWTLocalStorage'

const baseURL = "http://localhost:8000/api/"

const instance = axios.create({
    baseURL: baseURL
})

const signup = (payload) => instance.post('signup', payload)
const login = (payload) => instance.post('login', payload)

// instance.interceptors.response.use((config) => {
//     console.log(config.data)
//     console.log(JWTLocalStorage.getToken())
//     return config;
// }, (error) => {
//     return Promise.reject(error)
// })

const apis = {
    signup,
    login
}

export default apis