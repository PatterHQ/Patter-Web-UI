import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../../shared/modal/modal';

class origin extends Component {
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
            <div className=''>
                <h2 className='heading bold mb-3'>Origin Story</h2>
                <h4>Your Origin Story lets your customers and your stakeholders know where the company came from. This helps make a personal connection and builds affinity.</h4>
                <form className='form pt-5'>
                    <div className='form-group'>
                        <textarea placeholder='Your Origin Story' className='form-control' rows='5'></textarea>
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/foundation/origin' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <NavLink to='/build/foundation/elevator' className='btn_green m-0'>Next</NavLink>
                    </div>
                </form>
                <Popup show={show} hide={this.handleClose}/>
            </div>
        );
    }
}

export default origin;