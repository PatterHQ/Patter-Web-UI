import React, { Component } from 'react';
import {  FaPlus } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import './voice.css'
import Popup from '../../../shared/modal/modal';

class voice extends Component {
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
            <div className='brand voice p-3'>
                <div className='container'>
                    <form className='form'>
                        <h2 className='heading bold mb-3'>Our Voice</h2>
                        <h4 className='mb-4'>These are the brand elements in which the entire organization is built upon.</h4>
                        <div className='form-group mb-3'>
                            <label className='label'>Keywords</label>
                            <input type="text" className='form-control' placeholder='Enter Keyword' />
                            <FaPlus className='addPlus' />
                            <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                        </div>
                        <div className='form-group'>
                            <div className='tag_container'>
                                <span className='note_msg'>Player</span>
                                <span className='note_msg'>Gaming</span>
                                <span className='note_msg'>Trips</span>
                                <span className='note_msg'>Comp Management</span>
                                <span className='note_msg'>Comp</span>
                                <span className='note_msg'>Player Management</span>
                            </div>
                        </div>
                        <div className='form-group mb-3'>
                            <label className='label'>Buzzwords</label>
                            <input type="text" className='form-control' placeholder='Enter Buzzword' />
                            <FaPlus className='addPlus' />
                            <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                        </div>
                        <div className='form-group'>
                            <div className='tag_container'>
                                <span className='note_msg'>Player</span>
                                <span className='note_msg'>Gaming</span>
                                <span className='note_msg'>Trips</span>
                                <span className='note_msg'>Comp Management</span>
                                <span className='note_msg'>Comp</span>
                                <span className='note_msg'>Player Management</span>
                            </div>
                        </div>
                        <div className='mt-3 mb-5'>
                            <button className='btn_green'>Save</button>
                            <button className='btn_white'>Cancel</button>
                        </div>
                    </form>
                </div>
                <Popup show={show} hide={this.handleClose}/>
            </div>
        );
    }
}

export default voice;