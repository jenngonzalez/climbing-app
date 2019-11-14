import React, { Component } from 'react';
import SignUpForm from '../../components/SignUpLoginForms/SignUpForm';
import LoginForm from '../../components/SignUpLoginForms/LoginForm';
import AuthContext from '../../contexts/AuthContext';
import './SignUpLogIn.css';

export default class SignUpLogIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            signUpSuccess: false
        }
    }
    
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    static contextType = AuthContext

    handleSignUpSuccess = () => {
        this.props.history.push('/signuplogin')
        this.setState({
            signUpSuccess: true
        })
    }

    handleLoginSuccess = () => {
        this.context.loggedIn()
        this.props.history.push('/stats')
    }

    render() {
        return (
            <div className='signuplogin-forms'>
                <div className='signup'>
                    <h2>Sign Up</h2>
                    <SignUpForm
                        onSignUpSuccess={this.handleSignUpSuccess}
                    />
                    {this.state.signUpSuccess && <div className='signup-success'>Sign Up Successful! You are free to log in &#9786;</div>}
                </div>
                <div className='login'>
                    <span className='exists'>Already have an account?</span>
                    <h2>Log In</h2>
                    <LoginForm
                        onLoginSuccess={this.handleLoginSuccess}
                    />     
                </div>
            </div>
        )
    }
}