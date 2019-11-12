import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { Select } from 'dropdown-select';
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../../shared/modal/modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';


class character extends Component {
    constructor(props) {
        super(props);
        this.state={
            show: false, 
            brandData: '',
            options: '',
            vals: '',
            BrandElementDescription: '',
            url: 'http://ec2-34-198-96-172.compute-1.amazonaws.com//PatterService1/getCompanyBrandElement?'
        }
    }

    componentDidMount = async () => {
        try {
            await Axios.get(this.state.url+`companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=8`).then(res => {
                console.log(res)
                let vals=[]
                let opt=[]
                res.data.CompanyBrandElementPersonalityCharacteristics.forEach((v,i)=> { 
                    opt.push(v.PersonalityCharacteristic)
                    vals.push(v.PersonalityCharacteristic.PersonalityCharacteristicID)
                 }) 
                this.setState({ 
                    brandData: res.data, 
                    vals: vals,
                    options: opt,
                })
                console.log(this.state.options)
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
            <div>
                <h2 className='heading bold mb-3'>Character Attributes</h2>
                <h4 className='mb-5'>Your character attributes give final definition to how the organization conducts itself. They provide further context for team members and help set expectations for stakeholders.</h4>
                <form className='form'>
                    <div className='form-group'>
                        <Select placeholder='Characteristic #1' options={this.state.options[0]} value={this.state.vals[0]} labelKey="PersonalityCharacteristicName" valueKey="PersonalityCharacteristicID" />
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Characteristic #2' options={this.state.options[1]} labelKey="PersonalityCharacteristicName" valueKey="PersonalityCharacteristicID"  />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Characteristic #3' options={this.state.options[2]} labelKey="PersonalityCharacteristicName" valueKey="PersonalityCharacteristicID"  />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Characteristic #4' options={this.state.options[3]} labelKey="PersonalityCharacteristicName" valueKey="PersonalityCharacteristicID"  />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Characteristic #5' options={this.state.options[4]} labelKey="PersonalityCharacteristicName" valueKey="PersonalityCharacteristicID"  />
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/personality' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <NavLink to='/build/voice' className='btn_green m-0'>NEXT</NavLink>
                    </div>
                </form>
                <Popup show={show} hide={this.handleClose}/>
            </div>
        );
    }
}

export default character;