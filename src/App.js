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
import mountains from './mountains-white.png';
import './App.css';


export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      loggedIn: TokenService.hasAuthToken() ? true : false,
      menuOpen: false
    }
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
      <>
        <Link
          to='/signuplogin'
          id='logout'
          className='logout'
          onClick={this.handleLogoutClick}>
          Logout
        </Link>
        <br /><br />
        Logged In As {email}
      </>
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

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  
  closeMenu () {
    this.setState({menuOpen: false})
  }

  render() {

    const contextValue = {
      loggedIn: this.loggedIn
    }

    return (
      <div className='app'>
        <AuthContext.Provider value={contextValue}>
          <header className='app-header'>
            <h1>-Ascend-</h1>
          </header>               
          <Menu
            className='nav-menu'
            isOpen={this.state.menuOpen}
            onStateChange={(state) => this.handleStateChange(state)}
          >
              <Link id='home' className='menu-item' to='/' onClick={() => this.closeMenu()}> 
                <img src={mountains} alt='mountains icon' className='mountain-icon'/>
              </Link>
              <Link id='plan' className='menu-item' to='/plan' onClick={() => this.closeMenu()}>Plan</Link>
              <Link id='track' className='menu-item' to='/track' onClick={() => this.closeMenu()}>Track</Link>
              <Link id='add' className='menu-item' to='/add' onClick={() => this.closeMenu()}>Add</Link>
              <Link id='stats' className='menu-item' to='/stats' onClick={() => this.closeMenu()}>Stats</Link>
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
            <p>&copy; Jennifer Gonzalez 2019</p>
            <p>Weather powered by <a href='https://darksky.net/poweredby/'>Dark Sky</a></p>
            <p>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
          </footer>
        </AuthContext.Provider>
      </div>
    )
  }
}
