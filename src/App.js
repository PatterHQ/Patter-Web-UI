import React, { Component } from 'react';
import Header from './shared/header/header';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css'
import Home from './components/home/home';
import Brand from './components/brand/brand';
import Build from './components/build/build';
import Setting from './components/user/setting/setting';
import Signup from './authentication/register/signup/signup';
import Signup2a from './authentication/register/signup-2a/signup-2a';
import Sidebar from './shared/sidebar';
import Signup2b from './authentication/register/signup-2b/signup-2b';
import UserManagement from './components/user/management/user-management';
import Profile from './components/user/profile/profile';
import Signin from './authentication/signin/signin';
import ForgetPassword from './authentication/forget-password/forget-password';
import * as firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import { loader } from './shared/utils/API'

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      logged: localStorage.logged,
    }

    this.setState({
      logged: localStorage.logged
    })
    console.log(localStorage.logged)
  }

  loginHandler = (user) => {
    console.log('user')
    console.log(user)
    console.log('user')
    this.setState({
      user: user,
      logged: 'true'
    })
  }

  render() {
    return (
      <div>
        <Router>
          <Header user={this.state.user} logged={this.state.logged} />
          {
            this.state.logged === 'true' ?
              <div className='body_content'>
                {/* mention the route where you want sidebar */}
                <Route exact path='/' component={Sidebar} />
                <Route path='/build' component={Sidebar} />
                <Route path='/brand' component={Sidebar} />
                <Route path='/setting' component={Sidebar} />
                <Route path='/user' component={Sidebar} />
                <Route path='/profile' component={Sidebar} />
                {/* mention the route where you want sidebar */}

                <div className='content'>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/build' component={Build} />
                    <Route path='/brand' component={Brand} />
                    <Route exact path='/setting' component={Setting} />
                    <Route exact path='/user' component={UserManagement} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/signup/a' component={Signup2a} />
                    <Route exact path='/signup/b' component={Signup2b} />
                    <Route path=''>
                      <Redirect to='/' />
                    </Route>
                  </Switch>
                </div>
              </div>
              : <div className='body_content'>
                <div className='content'>
                  <Switch>
                    <Route exact path="/login" render={(routeProps) => <Signin user={this.loginHandler} {...routeProps} />} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/forget-password' component={ForgetPassword} />
                    <Route exact path='/signup/a' component={Signup2a} />
                    <Route exact path='/signup/b' component={Signup2b} />
                    <Route path=''>
                      <Redirect to='/signup' />
                    </Route>
                  </Switch>
                </div>
              </div>
          }
        </Router>
      </div>
    );
  }
}

export default App;
