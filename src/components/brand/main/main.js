import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { isImportSpecifier } from '@babel/types';
import './main.css'

class main extends Component {
    render() {
        return (
            <div className='p-3 brand'>
                <div className='container'>
                    <h2 className='heading bold mb-3'>Brand Central</h2>
                    <h4 className='mb-5'>Here you will be able to access and manage all the aspects of your brand</h4>
                    <div className='brand_container'>
                        <div>
                            <NavLink to='/brand/company-info' className='item'>
                                <h4 className='bold'>Company Info</h4>
                                <p>Lorem ipsum dolor sit amet, duo te dicit impedit</p>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to='/brand/foundation' className='item'>
                                <h4 className='bold'>Our Foundation</h4>
                                <p>Lorem ipsum dolor sit amet, duo te dicit impedit</p>
                            </NavLink>
                            <NavLink to='/brand/personality' className='item'>
                                <h4 className='bold'>Our Personality</h4>
                                <p>Lorem ipsum dolor sit amet, duo te dicit impedit</p>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to='/brand/voice' className='item'>
                                <h4 className='bold'>Our Voice</h4>
                                <p>Lorem ipsum dolor sit amet, duo te dicit impedit</p>
                            </NavLink>
                            <NavLink to='/brand/look' className='item'>
                                <h4 className='bold'>Our Look</h4>
                                <p>Lorem ipsum dolor sit amet, duo te dicit impedit</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default main;