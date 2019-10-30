import React from 'react';
import './signup-2a.css'
import {NavLink} from 'react-router-dom'

class Signup2a extends React.Component {
    render() {
        return (
            <section className='setting_block pt-5 pl-5'>
                <div className='container'>
                    <h2 className='heading'>Your Email Address Is Linked</h2>
                    <h4>The email address that you’ve entered has been linked <br /> to the account: </h4>
                    <h4 className='bold'>House Edge Digital</h4>
                    <p>Is this correct?</p>
                    <div className='form'>
                        <div className='form-group'>
                            <button className='btn_green'>Yes</button>
                            <button className='btn_white'>No</button>
                        </div>
                        <p className='primary'>Already have an account? <NavLink className='primary' to='/login'><strong><u>Log In </u></strong></NavLink></p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Signup2a;