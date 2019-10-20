import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/slide';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './routes/LandingPage/LandingPage';
import ClimbingPlan from './routes/ClimbingPlan/ClimbingPlan';
import ClimbingTrack from './routes/ClimbingTrack/ClimbingTrack';
import ClimbingStats from './routes/ClimbingStats/ClimbingStats';
import SignUpLogIn from './routes/SignUpLogIn/SignUpLogIn';
import './App.css';

export default class App extends Component {

  state = {
    hasError: false,
    loggedIn: false
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  loggedIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  loggedOut = () => {
    this.setState({
      loggedIn: false
    })
  }

  render() {

    const contextValue = {
      loggedIn: this.loggedIn
    }


    return (
      <div className='app'>
        {/* <AuthContext.Provider value={contextValue}> */}
        <header className='app-header'>
          <h1>Approach // Ascend</h1>
        </header>               
        <Menu className={ 'nav-menu' }>
          {/* <nav className='nav-menu'> */}
            <Link id='plan' className='menu-item' to='/plan'>Plan</Link>
            <Link id='track' className='menu-item' to='/track'>Track</Link>
            <Link id='stats' className='menu-item' to='/stats'>Stats</Link>
            {/* <Link onClick={ this.showSettings } className="menu-item--small" to="">Settings</Link> */}
            <Link id='signup-login' className='menu-item' to='/signuplogin'>Sign Up // Log In</Link>
            <Link id='home' className='menu-item' to='/'>Home</Link>
          {/* </nav> */}
        </Menu>
        <main className='app-main' id='page-wrap'>
          {this.state.hasError && <p className='error'>Error - please go back to the previous page and try again</p>}
          <Switch>
            <Route
              exact path='/'
              component={LandingPage}
            />
            <Route
              path='/plan'
              component={ClimbingPlan}
            />
            <Route
              path='/track'
              component={ClimbingTrack}
            />
            <Route
              path='/stats'
              component={ClimbingStats}
            />
            <Route
              path='/signuplogin'
              component={SignUpLogIn}
            />
          </Switch>
        </main>
        <footer>
          <p className='copyright'>&copy; Jennifer Gonzalez 2019</p>
        </footer>
        {/* </AuthContext.Provider> */}
      </div>
    )
  }
}
