import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import foundation from './foundation/foundation';

import './brand.css'
import companyInfo from './companyInfo/companyInfo';
import main from './main/main';
import personality from './personality/personality';
import voice from './voice/voice';
import look from './look/look';

class Brand extends Component {

  render() {
    return (
      <div>
        <div className='body_content'>
          <div className='sidebar sidebar_list second'>
            <ul>
              <li><NavLink to={'/brand/company-info'}>Company Info</NavLink ></li>
              <li><NavLink to={'/brand/foundation'}>Our Foundation</NavLink ></li>
              <li><NavLink to={'/brand/personality'}>Our Personality</NavLink ></li>
              <li><NavLink to={'/brand/voice'}>Our Voice</NavLink ></li>
              <li><NavLink to={'/brand/look'}>Our Look</NavLink ></li>
            </ul>
          </div>
          <div className='content'>
            <Route exact path='/brand' component={main} />
            <div className='brand_wrapper'>
              <Switch>
                <Route path='/brand/company-info' component={companyInfo} />
                <Route path='/brand/foundation' component={foundation} />
                <Route path='/brand/personality' component={personality} />
                <Route path='/brand/voice' component={voice} />
                <Route path='/brand/look' component={look} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Brand;
