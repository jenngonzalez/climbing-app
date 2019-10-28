import config from '../config'

const GetWeatherApiService = {
    getWeather(lat, lng) {
        return fetch(`${config.SERVER_ENDPOINT}/weather?lat=${lat}&lng=${lng}`)
            .then(res => 
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    }
}

export default GetWeatherApiService