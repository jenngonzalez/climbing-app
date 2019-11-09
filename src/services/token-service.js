import config from '../config'

const TokenService = {
    saveAuthToken(token) {
        window.sessionStorage.setItem(config.TOKEN_KEY, token)
    },
    // saveUserName(username) {
    //     window.sessionStorage.setItem(config.USERNAME, username)
    // },
    // getUserName() {
    //     return window.sessionStorage.getItem(config.USERNAME)
    // },
    // clearUserName() {
    //     window.sessionStorage.removeItem(config.USERNAME)
    // },
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