import React, { Component } from 'react';
import './SignUpLogIn.css';

export default class SignUpLogIn extends Component {
    render() {
        return (
            <div className='signuplogin-forms'>
                <div className='signup'>
                    <h2>Sign Up</h2>
                    <form className='signup-form'>
                        <label htmlFor='new-email'>Email:</label>
                        <input
                        type='email'
                        name='new-email'
                        id='new-email'
                        placeholder='Email'
                        aria-label='your email address'
                        aria-required='true'
                        autoComplete='email'
                        required
                        />
                        {/* <label htmlFor='new-username'>Username:</label>
                        <input
                        type='text'
                        name='new-username'
                        id='new-username'
                        placeholder='Username'
                        /> */}
                        <label htmlFor='new-password'>Password:</label>
                        <input
                        type='password'
                        name='new-password'
                        id='new-password'
                        placeholder='Password'
                        aria-label='create a password'
                        aria-required=
                        'true'
                        autoComplete='password'
                        required
                        />
                        <button type='submit' className='signup-button'>Sign Up</button>
                    </form>
                </div>
                <div className='login'>
                    <span className='exists'>Already have an account?</span>
                    <h2>Log In</h2>
                    <form className='login-form'>
                        <label htmlFor='user-email'>Email:</label>
                        <input
                        type='text'
                        name='user-email'
                        id='user-email' placeholder='Email'
                        aria-label='your email address'
                        aria-required='true'
                        autoComplete='email'
                        required
                        />
                        <label htmlFor='user-password'>Password:</label>
                        <input
                        type='password'
                        name='user-password'
                        id='user-password'
                        placeholder='Password'
                        aria-label='your password'
                        aria-required='true'
                        autoComplete='password'
                        required
                        />
                        <button type='submit' className='login-button'>Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}