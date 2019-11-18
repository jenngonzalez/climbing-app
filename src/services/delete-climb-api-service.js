import config from '../config'
import TokenService from '../services/token-service'

const DeleteClimbApiService = {
    deleteClimb(climbId) {
        const email = TokenService.getEmail()
        return fetch(`${config.SERVER_ENDPOINT}/climbs/${email}/${climbId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.then(e => Promise.reject(e))
                    : res
            )
    }
}

export default DeleteClimbApiService