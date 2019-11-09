import React from 'react'

const AuthContext = React.createContext({
    loggedIn: () => {},
    loggedOut: () => {},
    error: null
})

export default AuthContext