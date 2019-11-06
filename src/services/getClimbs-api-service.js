import config from '../config'

const GetClimbsApiService = {
    getClimbs(lat, lng) {
        return fetch(`${config.SERVER_ENDPOINT}/nearbyClimbs?lat=${lat}&lng=${lng}`)
            .then(res => 
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    }
}

export default GetClimbsApiService