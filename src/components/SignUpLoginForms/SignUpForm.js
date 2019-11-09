import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import './SignUpLoginForms.css';


export default class SignUpForm extends Component {
    static defaultProps = {
        onSignUpSuccess: () => {},
        onCancel: () => {}
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null
        }
    }


    handleSubmit = e => {
        e.preventDefault()
        this.setState({ loading: true })
        const { signUpEmail, signUpPassword } = e.target

        AuthApiService.postSignUp({
            email: signUpEmail.value,
            password: signUpPassword.value,
        })
            .then(user => {
                signUpEmail.value = ''
                signUpPassword.value = ''
                this.setState({ loading: false })
                this.props.onSignUpSuccess()
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error.message
                })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='signup-form'
                autoComplete='off'
                onSubmit={this.handleSubmit}
            >
                {this.state.loading && <p className='loading'>Submitting Your Info ...</p>}
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
                </div>
                <label htmlFor='signUpEmail'>Email Address:</label>
                <input
                    type='email'
                    name='signUpEmail'
                    id='signUpEmail'
                    aria-label='your email address'
                    aria-required='true'
                    autoComplete='email'
                    required
                />
                <label htmlFor='signUpPassword'>Password:</label>
                <input
                    type='password'
                    name='signUpPassword'
                    id='signUpPassword'
                    aria-label='create a password'
                    aria-required='true'
                    autoComplete='password'
                    required
                />
                <div className='signup-buttons'>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
        )
    }
}