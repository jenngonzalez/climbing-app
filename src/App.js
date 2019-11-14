import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/slide';
import { Link } from 'react-router-dom';
import PrivateRoute from './components/Utils/PrivateRoute';
import LandingPage from './routes/LandingPage/LandingPage';
import ClimbingPlan from './routes/ClimbingPlan/ClimbingPlan';
import ClimbingTrack from './routes/ClimbingTrack/ClimbingTrack';
import AddClimb from './routes/AddClimb/AddClimb';
import ClimbingStats from './routes/ClimbingStats/ClimbingStats';
import ClimbDetails from './routes/ClimbDetails/ClimbDetails';
import SignUpLogIn from './routes/SignUpLogIn/SignUpLogIn';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';
import AuthContext from './contexts/AuthContext';
import TokenService from './services/token-service';
import './App.css';


export default class App extends Component {

  state = {
    hasError: false,
    loggedIn: TokenService.hasAuthToken() ? true : false
  }

  static contextType = AuthContext

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

  renderLogoutLink = () => {
    const email = TokenService.getEmail()
    return (
      <div className='menu-logged-in'>
        Logged In As {email}
        <Link
          to='/signuplogin'
          id='logout'
          className='logout'
          onClick={this.handleLogoutClick}>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink = () => {
    return (
      <div className='menu-logged-out'>
        <Link
          to='/signuplogin'
          id='signup-login'
          className='menu-item'
        >
          Sign Up or Log In
        </Link>
      </div>
    )

  }

  renderPrivateLinks = () => {
    return (
      <div />
    )
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    TokenService.clearEmail()
    this.setState({
      loggedIn: false
    })
  }

  render() {

    const contextValue = {
      loggedIn: this.loggedIn
    }

    console.log('app state', this.state)

    return (
      <div className='app'>
        <AuthContext.Provider value={contextValue}>
        <header className='app-header'>
          <h1>Approach <span className='mountains'>AA</span> Ascend</h1>
        </header>               
        <Menu className={ 'nav-menu' }>
            <Link id='plan' className='menu-item' to='/plan'>Plan</Link>
            <Link id='track' className='menu-item' to='/track'>Track</Link>
            <Link id='add' className='menu-item' to='/add'>Add</Link>
            <Link id='stats' className='menu-item' to='/stats'>Stats</Link>
            <Link id='home' className='menu-item' to='/'>Home</Link>
            {TokenService.hasAuthToken()
                ? this.renderLogoutLink()
                : this.renderLoginLink()}
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
            <PrivateRoute
              path='/track'
              component={ClimbingTrack}
            />
            <PrivateRoute
              path='/add'
              component={AddClimb}
            />
            <PrivateRoute
              path='/stats'
              component={ClimbingStats}
            />
            <Route
              path='/climbdetails'
              component={ClimbDetails}
            />
            <Route
              path='/signuplogin'
              component={SignUpLogIn}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
        <footer>
          <p className='copyright'>&copy; Jennifer Gonzalez 2019</p>
        </footer>
        </AuthContext.Provider>
      </div>
    )
  }
}
