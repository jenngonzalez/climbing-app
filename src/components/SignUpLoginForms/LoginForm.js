import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import GetUserClimbs from '../../services/get-user-climbs-api-service';
import ClimbingContext from '../../contexts/ClimbingContext';
import './SignUpLoginForms.css';



export default class LoginForm extends Component {

    static contextType = ClimbingContext

    static defaultProps = {
        onLoginSuccess: () => {},
        onCancel: () => {}
    }
    
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null
        }
    }

    handleSubmitAuth = e => {
        e.preventDefault()
        const { loginEmail, loginPassword } = e.target

        AuthApiService.postLogin({
            email: loginEmail.value,
            password: loginPassword.value
        })
            .then(res => {
                loginEmail.value=''
                loginPassword.value=''
                TokenService.saveAuthToken(res.authToken)
                TokenService.saveEmail(res.email)
                GetUserClimbs.getClimbs()
                    .then(climbData => {
                        const userClimbs = climbData.map(climb => {
                            return {
                                id: climb.id,
                                date: climb.date,
                                location: climb.location,
                                climb_name: climb.climb_name,
                                climb_type: climb.climb_type,
                                climb_grade: climb.climb_grade,
                                user_status: climb.user_status,
                                image: climb.image
                            }
                        })
                        this.context.addUserClimbs(userClimbs)
                        this.props.onLoginSuccess()
                    })
            })
            .catch(res => {
                this.setState({ loading: false, error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='login-form'
                onSubmit={this.handleSubmitAuth}
            >
                {this.state.loading && <p className='loading'>Logging You In ...</p>}
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
                </div>
                <label htmlFor='loginEmail'>Email Address:</label>
                <input
                    type='email'
                    name='loginEmail'
                    id='loginEmail'
                    aria-label='your email address'
                    aria-required='true'
                    autoComplete='your email'
                    required
                />
                <label htmlFor="loginPassword">Password:</label>
                <input
                    type='password'
                    name='loginPassword'
                    id='loginPassword'
                    aria-label='your password'
                    aria-required='true'
                    autoComplete='your password'
                    required
                />
                <div className='login-buttons'>
                    <button type='submit'>Login</button>
                </div>
            </form>
        )
    }

}