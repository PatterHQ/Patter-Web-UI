import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft, FaPlus } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import './voice.css'
import Popup from '../../../shared/modal/modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';


class voice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            url: 'http://ec2-34-198-96-172.compute-1.amazonaws.com//PatterService1/getCompanyBrandElement?'
        }
    }

    componentDidMount = async () => {
        try {
            await Axios.get(this.state.url+`companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=10`).then(res => {
                console.log(res)
            })
        } catch (err) {
            toast.error(err.message)
        }
        
        try {
            await Axios.get(this.state.url+`companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=11`).then(res => {
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
        const { show } = this.state;
        return (
            <div className='voice'>
                <h2 className='heading bold mb-3'>Part 3: Our Voice</h2>
                <h4 className='mb-5'>This sections describes how we communicate both internally and externally. This is an extention of your team’s personality and should be consistent.</h4>
                <form className='form'>
                    <h4 className='heading bold mb-3'>Keywords</h4>
                    <h4 className='mb-5'>This is an inventory of words that are used to describe your organization, your product and your team. They could be used in both internal and external communication.</h4>
                    <div className='form-group mb-3'>
                        <input type="text" className='form-control' />
                        <FaPlus className='addPlus' />
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                    </div>
                    <div className='form-group'>
                        <div className='tag_container'></div>
                    </div>
                    <h4 className='heading bold mb-3'>Buzzwords</h4>
                    <h4 className='mb-5'>These are words that fit the brand but should not be over used at risk of watering down their impact.</h4>
                    <div className='form-group mb-3'>
                        <input type="text" className='form-control' />
                        <FaPlus className='addPlus' />
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                    </div>
                    <div className='form-group'>
                        <div className='tag_container'></div>
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/personality/character' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <NavLink to='/build/look' className='btn_green m-0'>NEXT</NavLink>
                    </div>
                </form>
                <Popup show={show} hide={this.handleClose} />
            </div>
        );
    }
}

export default voice;