import config from '../config'
import TokenService from '../services/token-service'

const GetUserClimbsApiService = {
    getClimbs() {
        const userEmail = TokenService.getEmail()
        console.log('userEmail', userEmail)
        return fetch(`${config.SERVER_ENDPOINT}/climbs/${userEmail}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }
}

export default GetUserClimbsApiService