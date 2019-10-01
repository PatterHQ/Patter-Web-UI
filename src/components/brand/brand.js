import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import First from './first/first';
import Second from './second/second';

import './brand.css'

class Brand extends Component {

  render() {
    return (
      <div>
        <div className='body_content'>
          <div className='sidebar sidebar_list second'>
            <ul>
              <li><NavLink to={'/brand/first'}>First</NavLink ></li>
              <li><NavLink to={'/brand/second'}>Second</NavLink ></li>
            </ul>
          </div>
          <div className='content'>
            <Route exact path='/brand/first' component={First} />
            <Route exact path='/brand/second' component={Second} />
          </div>
        </div>
      </div>
    );
  }
}

export default Brand;
