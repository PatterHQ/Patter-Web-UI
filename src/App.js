import React, { Component } from 'react';
import Header from './shared/header/header';
import { Route, Redirect, Switch } from 'react-router-dom';
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

const firebaseApp = firebase.initializeApp(firebaseConfig);
class App extends Component {

  render() {
    return (
      <div>
        <Header />
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

              <Route exact path='/login' component={Signin} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/signup/a' component={Signup2a} />
              <Route exact path='/signup/b' component={Signup2b} />
              <Route exact path='/forget-password' component={ForgetPassword} />
              <Route path=''>
                <Redirect to='/' />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
