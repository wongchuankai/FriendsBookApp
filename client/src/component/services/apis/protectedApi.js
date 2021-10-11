import axios from 'axios'
import JWTLocalStorage from '../JWTLocalStorage/JWTLocalStorage'

const baseURL = "http://localhost:8000/api/secure/"

const instance = axios.create({
    baseURL: baseURL
})

const verification = () => instance.get('/verify')
const newpost = (payload) => instance.post('newpost', payload)
const getPublicPostWithUser = (payload) => instance.post('getPublicPostWithUser', payload)
const retrievePostsByUser = (payload) => instance.post('retrievePostsByUser', payload)
const userlikepost = (payload) => instance.post('userlikepost', payload)
const userUnlikePost = (payload) => instance.post('userUnlikePost', payload)
const getFriendRequestToUser = (payload) => instance.post('getFriendRequestToUser', payload)
const acceptFriendRequest = (payload) => instance.post('acceptFriendRequest', payload)
const sendFriendRequest = (payload) => instance.post('sendFriendRequest', payload)
const getPeopleYouMayKnow = (payload) => instance.post('getPeopleYouMayKnow', payload)
const rejectFriendRequest = (payload) => instance.post('rejectFriendRequest', payload)
const findUserFriends = (payload) => instance.post('findUserFriends', payload)
const findUserFriendsByUsername = (payload) => instance.post('findUserFriendsByUsername', payload)
const getStatusBetween2Users = (payload) => instance.post('getStatusBetween2Users', payload)
const getUserIDbyUsername = (payload) => instance.post('getUserIDbyUsername', payload)

instance.interceptors.request.use((config) => {
    config.data = {
        ...config.data,
        token: JWTLocalStorage.getToken()
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})


const apis = {
    verification,
    newpost,
    getPublicPostWithUser,
    userlikepost,
    userUnlikePost,
    getFriendRequestToUser,
    acceptFriendRequest,
    sendFriendRequest,
    getPeopleYouMayKnow,
    rejectFriendRequest,
    retrievePostsByUser,
    findUserFriends,
    findUserFriendsByUsername,
    getStatusBetween2Users,
    getUserIDbyUsername
}

export default apis