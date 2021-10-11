import jwt from 'jwt-decode'

const JWTLocalStorage = () => {
    
    const tokenName = "userToken"

    const setToken = (JWT) => {
        localStorage.setItem(tokenName, JWT)
        return true
    }
    
    const getToken = () => {
        return localStorage.getItem(tokenName)
    }

    const getParsedUserData = () => {
        return jwt(getToken()).user
    }

    const isTokenSet = () => {
        return getToken() !== null
    }

    const clearToken = () => {
        localStorage.clear(tokenName)
        return true
    }

    return {
        setToken,
        getToken,
        isTokenSet,
        clearToken,
        getParsedUserData
    }
}

export default JWTLocalStorage();
