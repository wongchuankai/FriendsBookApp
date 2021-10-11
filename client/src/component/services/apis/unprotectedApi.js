import axios from 'axios'
import JWTLocalStorage from '../JWTLocalStorage/JWTLocalStorage'
require('dotenv').config()

const baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_SERVER_URI_UNSECURE : "http://localhost:8000/api/"

const instance = axios.create({
    baseURL: baseURL
})

const signup = (payload) => instance.post('signup', payload)
const login = (payload) => instance.post('login', payload)

const apis = {
    signup,
    login
}

export default apis