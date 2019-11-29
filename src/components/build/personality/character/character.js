import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { Select } from 'dropdown-select';
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../../shared/modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import API from "../../../../shared/utils/API";


class character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            brandData: '',
            value0: '',
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            vals: '',
            options: [],
            BrandElementDescription: '',
            loader: false,
            title: '',
            desc: '',
        }
    }

    componentDidMount = async () => {
        this.setState({ loader: true })
        try {
            await API.get(`getCharacteristics`).then(res => {
                console.log(res)
                this.setState({
                    options: res.data,
                })
            })

        } catch (error) {
            toast.error(error.message)
        }

        try {
            await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=8`).then(res => {
                console.log(res)
                let vals = []
                res.data.CompanyBrandElementPersonalityCharacteristics.forEach((v, i) => {
                    let opt = `value${i}`
                    this.setState({ [opt]: v.PersonalityCharacteristic })
                    vals.push(v.CompanyBrandElementPersonalityCharacteristicsID)
                })
                this.setState({
                    brandData: res.data,
                    vals: vals,
                    title: res.data.BrandElement.BrandElementName,
                    desc: res.data.BrandElement.BrandElementDescription,
                })
            })
        } catch (err) {
            toast.error(err.message)
        }
        this.setState({ loader: false })
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

    changeHandler = (i, val) => {
        let opt = `value${i}`
        this.setState({
            [opt]: val
        })
    }

    handleSubmit = async (e) => {
        this.setState({ loader: true })
        e.preventDefault();
        let data = [
            { "CompanyPersonalityCharacteristicID": this.state.vals[0], "PersonalityCharacteristicID": this.state.value0.PersonalityCharacteristicID },
            { "CompanyPersonalityCharacteristicID": this.state.vals[1], "PersonalityCharacteristicID": this.state.value1.PersonalityCharacteristicID },
            { "CompanyPersonalityCharacteristicID": this.state.vals[2], "PersonalityCharacteristicID": this.state.value2.PersonalityCharacteristicID },
            { "CompanyPersonalityCharacteristicID": this.state.vals[3], "PersonalityCharacteristicID": this.state.value3.PersonalityCharacteristicID },
            { "CompanyPersonalityCharacteristicID": this.state.vals[4], "PersonalityCharacteristicID": this.state.value4.PersonalityCharacteristicID }
        ]
        console.log(data)
        try {
            await API.post(`updatePersonalityCharacteristics`, data).then(res => {
                console.log(res)
                //toast.success('Updated Successfully')
                if (res.data.Result === 1) {
                    setTimeout(() => {
                        this.props.history.push('/build/voice');
                    }, 1000);
                }
            })
        } catch (err) {
            toast.error(err.message)
        }
        this.setState({ loader: false })
    }
    render() {
        const { show } = this.state;
        return (
            <div>
                {
                    this.state.loader ? <div className='loader_overlay'>
                        <div className="custom_loader">Loading...</div>
                    </div> : null
                }
                <ToastContainer />
                <h2 className='heading bold mb-3'>Character Attributes</h2>
                <h4 className='mb-5'>Your character attributes give final definition to how the organization conducts itself. They provide further context for team members and help set expectations for stakeholders.</h4>
                <form className='form' onSubmit={($event) => this.handleSubmit($event)} noValidate>
                    <div className='form-group'>
                        <Select placeholder='Characteristic #1' options={this.state.options} value={this.state.value0} labelKey="PersonalityCharacteristicName" valueKey="PersonalityCharacteristicID" onChange={(val) => this.changeHandler(0, val)} />
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Characteristic #2' options={this.state.options} value={this.state.value1} labelKey="PersonalityCharacteristicName" valueKey="PersonalityCharacteristicID" onChange={(val) => this.changeHandler(1, val)} />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Characteristic #3' options={this.state.options} value={this.state.value2} labelKey="PersonalityCharacteristicName" valueKey="PersonalityCharacteristicID" onChange={(val) => this.changeHandler(2, val)} />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Characteristic #4' options={this.state.options} value={this.state.value3} labelKey="PersonalityCharacteristicName" valueKey="PersonalityCharacteristicID" onChange={(val) => this.changeHandler(3, val)} />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Characteristic #5' options={this.state.options} value={this.state.value4} labelKey="PersonalityCharacteristicName" valueKey="PersonalityCharacteristicID" onChange={(val) => this.changeHandler(4, val)} />
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/personality' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <button type='submit' className='btn_green m-0'>NEXT</button>
                    </div>
                </form>
                <Popup show={show} title={this.state.title} desc={this.state.desc} hide={this.handleClose} />
            </div>
        );
    }
}

export default character;