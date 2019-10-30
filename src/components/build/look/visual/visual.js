import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";

class visual extends Component {
    render() {
        return (
            <div className=''>
                <h2 className='heading bold mb-3'>Visual Style</h2>
                <h4 className='mb-5'>The style assessment is used to help clarify the brand's visual identity when specifics are not available.</h4>
                <form className='form'>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Subtle <span className='float-right'>Bold</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Soft <span className='float-right'>Sharp</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Bright <span className='float-right'>Muted</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Abstract <span className='float-right'>Technical</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Relaxed <span className='float-right'>Busy</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Classic<span className='float-right'>Modern</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/foundation/organizational' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <NavLink to='/build/personality/character' className='btn_green m-0'>NEXT</NavLink>
                    </div>
                </form>
            </div>
        );
    }
}

export default visual;