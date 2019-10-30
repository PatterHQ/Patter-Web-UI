import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import './look.css'
import Popup from '../../../shared/modal/modal';

class look extends Component {
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
        let style = { background: 'url(/images/brand-logo.png) no-repeat', backgroundSize: 'cover' }
        return (
            <div className='look p-3'>
                <div className='container'>
                    <form className='form pt-3'>
                        <h2 className='heading bold mb-3'>Our Look</h2>
                        <h4 className='mb-4'>These are the brand elements in which the entire organization is built upon.</h4>
                        <h4 className='bold mb-3 px-3'>Logo</h4>
                        <h4 className='mb-5'>Your logo is very often the first interaction a customer or stakeholder will have with your brand. It should be representative of every other aspect of your brand.</h4>
                        <button className='btn_green btn_upload mb-3'>UPLOAD LOGO</button>
                        <div className='form-group mb-5'>
                            <div className='tag_container' style={style}></div>
                        </div>
                        <label className='label mb-3'>Color Palette</label>
                        <div className='form-group flex'>
                            <input type="text" className='form-control color' placeholder='Color #1' />
                            <input type="text" className='form-control percentage' placeholder='%' />
                            <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                        </div>
                        <div className='form-group flex'>
                            <input type="text" className='form-control color' placeholder='Color #2' />
                            <input type="text" className='form-control percentage' placeholder='%' />
                        </div>
                        <div className='form-group flex'>
                            <input type="text" className='form-control color' placeholder='Color #3' />
                            <input type="text" className='form-control percentage' placeholder='%' />
                        </div>
                        <div className='form-group flex'>
                            <input type="text" className='form-control color' placeholder='Color #4' />
                            <input type="text" className='form-control percentage' placeholder='%' />
                        </div>
                        <div className='form-group flex'>
                            <input type="text" className='form-control color' placeholder='Color #5' />
                            <input type="text" className='form-control percentage' placeholder='%' />
                        </div>
                        <div className='form-group flex mb-5'>
                            <div className='color_palette'>
                                <span className='color_1'></span>
                                <span className='color_2'></span>
                                <span className='color_3'></span>
                                <span className='color_4'></span>
                                <span className='color_5'></span>
                            </div>
                        </div>
                        <label className='label bold mb-3'>Style Assessment</label>
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

export default look;