import config from '../config';


function handleErrors(response) {
    if (response.status !== 201) {
        return response.json().then((body) => {
            throw new Error(body.error)
        })
    } else {
        return response;
    }
}

const AuthApiService = {
    postLogin(credentials) {
        return fetch(`${config.SERVER_ENDPOINT}/auth/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postSignUp(credentials) {
        return fetch(`${config.SERVER_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(handleErrors)
    }
}

export default AuthApiService