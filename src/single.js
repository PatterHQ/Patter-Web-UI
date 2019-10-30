import React, { Component } from 'react';
import Header from './shared/header/header';
import { NavLink, Route, Redirect } from 'react-router-dom';
import Home from './components/home/home';
import Brand from './components/brand/brand';
import Build from './components/build/build';
import Setting from './components/user/setting/setting';

class Single extends Component {

  render() {
    return (
      <div>
        <div className='body_content'>
          <div className='sidebar sidebar_list'>
            <ul>
              <li><NavLink to={'/build'}>Build</NavLink ></li>
              <li><NavLink to={'/brand'}>Our Brand</NavLink ></li>
            </ul>
          </div>
          <div className='content'>
            <Route exact path='/home' component={Home} />
            <Route path='/build' component={Build} />
            <Route path='/brand' component={Brand} />
            <Route path='/setting' component={Setting} />
            <Route path=''>
              <Redirect to='/home' />
            </Route>
          </div>
        </div>
      </div>
    );
  }
}

export default Single;
