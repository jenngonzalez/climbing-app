import config from '../config'
import TokenService from '../services/token-service'

const AddClimbApiService = {
    postClimb(climb) {
        return fetch(`${config.SERVER_ENDPOINT}/climbs`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(climb)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }
}

export default AddClimbApiService