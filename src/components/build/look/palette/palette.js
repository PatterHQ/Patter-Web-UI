import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import './palette.css'
import Popup from '../../../../shared/modal/modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';


class palette extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            show: false, 
            url: 'http://ec2-34-198-96-172.compute-1.amazonaws.com//PatterService1/getCompanyBrandElement?'
        }
    }

    componentDidMount = async () => {
        try {
            await Axios.get(this.state.url+`companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=5`).then(res => {
                console.log(res)
            })
        } catch (err) {
            toast.error(err.message)
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
            <div className='palette'>
                <h2 className='heading bold mb-3'>Color Palette</h2>
                <h4 className='mb-3'>Your use of color is critical to maintaining consistency across your brand and visual channels. These colors should represent the brand elements already described and should be used correctly in all applications.</h4>
                <h4 className='mb-5'>All entries should be in HEX value.</h4>
                <form className='form'>
                    <div className='form-group'>
                        <input type="text" className='form-control color' placeholder='Color #1' />
                        <input type="text" className='form-control percentage' placeholder='%' />
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control color' placeholder='Color #2' />
                        <input type="text" className='form-control percentage' placeholder='%' />
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control color' placeholder='Color #3' />
                        <input type="text" className='form-control percentage' placeholder='%' />
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control color' placeholder='Color #4' />
                        <input type="text" className='form-control percentage' placeholder='%' />
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control color' placeholder='Color #5' />
                        <input type="text" className='form-control percentage' placeholder='%' />
                    </div>
                    <div className='form-group'>
                        <textarea className='textarea form-control'></textarea>
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/look/palette' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <NavLink to='/build/complete' className='btn_green m-0'>NEXT</NavLink>
                    </div>
                </form>
                <Popup show={show} hide={this.handleClose}/>
            </div>
        );
    }
}

export default palette;