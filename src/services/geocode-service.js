import config from '../config'

const GeocodeService = {
    getLatLng(locationQuery) {
        return fetch(`${config.GEOCODE_ENDPOINT}/json?address=${locationQuery}&key=${config.MAPS_KEY}`)
            .then(res => 
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    }
}

export default GeocodeService