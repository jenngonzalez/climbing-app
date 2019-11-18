export default {
    SERVER_ENDPOINT: process.env.NODE_ENV !== 'development' ? 'https://ascend-app-server.herokuapp.com/api' : 'http://localhost:8000/api',
    GEOCODE_ENDPOINT: 'https://maps.googleapis.com/maps/api/geocode',
    MAPS_KEY: 'AIzaSyD5iG5IxfYfV26XJkkmdmxREMXf7bq91Iw',
    TOKEN_KEY: 'ascend-app-auth-token',
    USER_EMAIL: 'email'
}