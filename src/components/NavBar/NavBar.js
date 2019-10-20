import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default class NavBar extends Component {
    render() {
        return (
            <nav className='navbar' role='navigation'>
                <h1>Approach // Ascend</h1>
                <Menu>
                    <Link id='plan' className='menu-item' to='/plan'>Plan</Link>
                    <Link id='track' className='menu-item' to='/track'>Track</Link>
                    <Link id='stats' className='menu-item' to='/stats'>Stats</Link>
                    <Link onClick={ this.showSettings } className="menu-item--small" to="">Settings</Link>
                </Menu>
            </nav>
        )
    }
}