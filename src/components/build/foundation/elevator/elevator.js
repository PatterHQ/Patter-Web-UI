import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../../shared/modal/modal';

class elevator extends Component {
    constructor(props) {
        super(props);
        this.state={
            show: false, 
        }
    }

    handleClose = () => {
        this.setState({
            show: false, 
        })
    };
    handleShow = () => {
        this.setState({
            show: true, 
        })
    };

    render() {
        const {show} = this.state;
        return (
            <div>
                <h2 className='heading bold mb-3'>Elevator Pitch</h2>
                <h4>The elevator pitch is a short (1-2 sentence) description of what your company does, for whom, what the benefit is and why you are unique.</h4>
                <form className='form pt-5'>
                    <div className='form-group'>
                        <textarea placeholder='Your Elevator Pitch' className='form-control' rows='5'></textarea>
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/foundation/origin' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <NavLink to='/build/foundation/organizational' className='btn_green m-0'>Next</NavLink>
                    </div>
                </form>
                <Popup show={show} hide={this.handleClose}/>
            </div>
        );
    }
}

export default elevator;