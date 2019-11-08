export default {
    SERVER_ENDPOINT: process.env.NODE_ENV !== 'development' ? 'https://greenhouse-server23823.herokuapp.com/api' : 'http://localhost:8000/api',
    GEOCODE_ENDPOINT: 'https://maps.googleapis.com/maps/api/geocode',
    MAPS_KEY: 'AIzaSyD5iG5IxfYfV26XJkkmdmxREMXf7bq91Iw'
}