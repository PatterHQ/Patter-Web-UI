import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import './header.css'
import { NavLink } from 'react-router-dom';
import { app } from 'firebase';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            main: 0,
            login: '',
            user: '',
            name: '',
            logged: localStorage.logged
        }
    }

    componentDidMount() {
        let userData = JSON.parse(localStorage.getItem('user'))
        console.log(userData)
        if (localStorage.getItem('logged') === 'true') {
            this.setState({ name: userData.FirstName })
        } else {
            this.setState({ name: 'Login' })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            name: nextProps.user.FirstName,
            user: nextProps.user,
            logged: nextProps.logged,

        })
    }

    currentKey(key) {
        if (key !== this.state.main) {
            this.setState({ main: key })
        } else {
            this.setState({ main: 0 })
        }
    }

    logoutHandler = () => {
        localStorage.removeItem('logged')
        localStorage.removeItem('user')
        window.location.pathname = '/signup'
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg">
                    <div className='logo'>
                        <NavLink to={'/'}>
                            <img src='/images/logo.png' alt='logo' />
                        </NavLink>
                    </div>
                    <div className='right_nav'>
                        {
                            this.state.logged === 'true' ?
                                <ul className='mb-0'>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                Account
                                        </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item as="span"><NavLink to='/setting'>Setting</NavLink></Dropdown.Item>
                                                <Dropdown.Item as="span"><NavLink to='/user'>User</NavLink></Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                    <li className='m-0'>
                                        <Dropdown className='userItem'>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                {this.state.name} <img src='/images/user.png' alt='user' />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item as="span"><NavLink to='/profile'>Profile</NavLink></Dropdown.Item>
                                                <Dropdown.Item as="span"><span className='pointer' onClick={() => this.logoutHandler()}>Sign Out</span></Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                </ul>
                                :
                                <ul className='mb-0 not_logged'>
                                    <li><NavLink to={'/login'}>Log in <img src='/images/login-placeholder.png' alt='user' /></NavLink></li>
                                </ul>
                        }
                    </div>
                    <div className='mobile_menu'>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>
                            <Dropdown.Menu onChange={() => this.currentKey(0)}>
                                <p className='lvl1 custom_lvl' onClick={() => this.currentKey(1)}>Aaron</p>
                                {this.state.main === 1 ? <div>
                                    <Dropdown.Item as="span"><NavLink to='' className='lvl3 custom_lvl'>Profile</NavLink></Dropdown.Item>
                                    <Dropdown.Item as="span"><NavLink to='' className='lvl3 custom_lvl'>SIGN OUT</NavLink></Dropdown.Item>
                                </div>
                                    : null
                                }
                                <p className='lvl1 custom_lvl' onClick={() => this.currentKey(2)}>Account</p>
                                {this.state.main === 2 ? <div>
                                    <Dropdown.Item as="span"><NavLink to='/setting' className='lvl3 custom_lvl'>Setting</NavLink></Dropdown.Item>
                                    <Dropdown.Item as="span"><NavLink to='' className='lvl3 custom_lvl'>User</NavLink></Dropdown.Item>
                                </div>
                                    : null
                                }
                                <Dropdown.Item as="span"><NavLink to='/build' className='lvl2 custom_lvl'>Build</NavLink></Dropdown.Item>
                                <p className='lvl2 custom_lvl' onClick={() => this.currentKey(5)}>Our Brand</p>
                                {this.state.main === 5 ? <div>
                                    <Dropdown.Item as="span"><NavLink to='/brand/company-info' className='lvl3 custom_lvl'>Company Info</NavLink></Dropdown.Item>
                                    <Dropdown.Item as="span"><NavLink to='/brand/foundation' className='lvl3 custom_lvl'>Our Foundations</NavLink></Dropdown.Item>
                                    <Dropdown.Item as="span"><NavLink to='/brand/personality' className='lvl3 custom_lvl'>Our Personality</NavLink></Dropdown.Item>
                                    <Dropdown.Item as="span"><NavLink to='/brand/voice' className='lvl3 custom_lvl'>Our Voice</NavLink></Dropdown.Item>
                                    <Dropdown.Item as="span"><NavLink to='/brand/look' className='lvl3 custom_lvl'>Our Look</NavLink></Dropdown.Item>
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
