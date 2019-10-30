import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import './look.css'
class look extends Component {
    render() {
        return (
            <div className='look'>
                <h2 className='heading bold mb-3'>Part 4: Our Look</h2>
                <h4 className='mb-4'>The final section is where we maintain your outward appearance. This is what your customers and stakeholders see (visually) when they interact with your brand.</h4>
                <h4 className='bold mb-3 px-3'>Logo</h4>
                <h4 className='mb-5'>Your logo is very often the first interaction a customer or stakeholder will have with your brand. It should be representative of every other aspect of your brand.</h4>
                <button className='btn_green btn_upload'>UPLOAD LOGO</button>
                <form className='form pt-3'>
                    <div className='form-group'>
                        <div className='tag_container'></div>
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/voice' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <NavLink to='/build/look/palette' className='btn_green m-0'>NEXT</NavLink>
                    </div>
                </form>
            </div>
        );
    }
}

export default look;