import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import './header.css'
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            main: 0,
        }

    }

    currentKey(key) {
        this.setState({ main: key })
    }


    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg">
                    <div className='logo'>
                        <NavLink to={'/home'}>
                            <img src='/images/logo.png' alt='logo' />
                        </NavLink>
                    </div>
                    <div className='right_nav'>
                        <ul>
                            <li>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        Account
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item><NavLink to='/setting'>Setting</NavLink></Dropdown.Item>
                                        <Dropdown.Item><NavLink to='/user'>User</NavLink></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                            <li className='m-0'>
                                <Dropdown className='userItem'>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        Aroun <img src='/images/user.png' alt='user' />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item><NavLink to='/profile'>Profile</NavLink></Dropdown.Item>
                                        <Dropdown.Item><NavLink to='/signout'>Sign Out</NavLink></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                    <div className='mobile_menu'>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>
                            <Dropdown.Menu onChange={() => this.currentKey(0)}>
                                <p className='lvl1 custom_lvl' onClick={() => this.currentKey(1)}>Aaron</p>
                                {this.state.main === 1 ? <div>
                                     <Dropdown.Item><NavLink to='' className='lvl3 custom_lvl'>Profile</NavLink></Dropdown.Item>
                                     <Dropdown.Item><NavLink to='' className='lvl3 custom_lvl'>SIGN OUT</NavLink></Dropdown.Item>
                                </div>
                                    : null
                                }
                                <p className='lvl1 custom_lvl' onClick={() => this.currentKey(2)}>Account</p>
                                {this.state.main === 2 ? <div>
                                     <Dropdown.Item><NavLink to='' className='lvl3 custom_lvl'>Setting</NavLink></Dropdown.Item>
                                     <Dropdown.Item><NavLink to='' className='lvl3 custom_lvl'>User</NavLink></Dropdown.Item>
                                </div>
                                    : null
                                }
                                 <Dropdown.Item><NavLink to='/home' className='lvl2 custom_lvl'>Home</NavLink></Dropdown.Item>
                                 <Dropdown.Item><NavLink to='/build' className='lvl2 custom_lvl'>Build</NavLink></Dropdown.Item>
                                <p className='lvl2 custom_lvl' onClick={() => this.currentKey(5)}>Our Brand</p>
                                {this.state.main === 5 ? <div>
                                     <Dropdown.Item><NavLink to='/brand/first' className='lvl3 custom_lvl'>Company Info</NavLink></Dropdown.Item>
                                     <Dropdown.Item><NavLink to='/brand/second' className='lvl3 custom_lvl'>Our Foundations</NavLink></Dropdown.Item>
                                    {/*  <Dropdown.Item><NavLink to='' className='lvl3 custom_lvl'>Our Personality</NavLink></Dropdown.Item>
                                     <Dropdown.Item><NavLink to='' className='lvl3 custom_lvl'>Our Voice</NavLink></Dropdown.Item>
                                     <Dropdown.Item><NavLink to='' className='lvl3 custom_lvl'>Our Look</NavLink></Dropdown.Item> */}
                                </div>
                                    : null
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default Header;
