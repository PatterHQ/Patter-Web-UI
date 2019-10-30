import React from 'react';
import './signup-2b.css'
import {NavLink} from 'react-router-dom'

class Signup2b extends React.Component {
    render() {
        return (
            <section className='setting_block pt-5 pl-5'>
                <div className='container'>
                    <h2 className='heading'>Create Your Account</h2>
                    <h4>Complete the information below to create an account for your organization.</h4>
                    <div className='form'>
                        <div className='form-group'>
                            <label className='label'>Company Name</label>
                            <input type="text" className='form-control' name='company' />
                        </div>
                        <label className='label'>Site Name</label>
                        <div className='d-flex'>
                            <div className='form-group'>
                                <input type="text" className='form-control' name='company' placeholder='yourcompany' />
                            </div>
                            <h2 className='domain'>.patter.com</h2>
                        </div>
                        <div className='form-group'>
                            <button className='btn_green'>Sign Up</button>
                        </div>
                        <NavLink to='' className='primary'> &#60; Back</NavLink>
                        <p className='primary'>Already have an account? <NavLink className='primary' to='/login'><strong><u>Log In </u></strong></NavLink></p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Signup2b;