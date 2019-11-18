import config from '../config'

const TokenService = {
    saveAuthToken(token) {
        window.sessionStorage.setItem(config.TOKEN_KEY, token)
    },
    saveEmail(email) {
        window.sessionStorage.setItem(config.USER_EMAIL, email)
    },
    getEmail() {
        return window.sessionStorage.getItem(config.USER_EMAIL)
    },
    clearEmail() {
        window.sessionStorage.removeItem(config.USER_EMAIL)
    },
    getAuthToken() {
        return window.sessionStorage.getItem(config.TOKEN_KEY)
    },
    clearAuthToken() {
        window.sessionStorage.removeItem(config.TOKEN_KEY)
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
    }
}

export default TokenService