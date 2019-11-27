import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { Select } from 'dropdown-select';
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../shared/modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import API from "../../../shared/utils/API";
import SimpleReactValidator from 'simple-react-validator';

class organizational extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            brandData: '',
            val1: '',
            val2: '',
            val3: '',
            val4: '',
            val5: '',
            options: [],
            CompanyOrganizationalValueIDs: [],
            loader: false
        }
        this.validator = new SimpleReactValidator({
            messages: {
                default: 'This field is Required.'
            },
        });

    }

    componentDidMount = async () => {
        this.setState({ loader: true })
        try {
            await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=3`).then(res => {
                console.log(res)
                let ids = []
                res.data.CompanyBrandElementValues.forEach((v, i) => {
                    let vars = `val${i + 1}`
                    this.setState({ [vars]: v.Value })
                    ids.push(v.CompanyBrandElementValuesID)
                })
                this.setState({
                    brandData: res.data,
                    CompanyOrganizationalValueIDs: ids,
                })
            })
        } catch (err) {
            toast.error(err.message)
        }

        try {
            await API.get(`getValues`).then(res => {
                console.log(res)
                this.setState({
                    options: res.data,
                })
            })

        } catch (error) {
            toast.error(error.message)
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

    showValue = (v) => {
        console.log(v)
    }

    changeHandler = (stVar, val) => {
        this.setState({
            [stVar]: val
        })
    }

    handleSubmit = async (e) => {
        this.setState({ loader: true })
        e.preventDefault();
        if (this.validator.allValid()) {
            let data = [
                { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[0], "ValuesID": this.state.val1.ValuesID },
                { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[1], "ValuesID": this.state.val2.ValuesID },
                { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[2], "ValuesID": this.state.val3.ValuesID },
                { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[3], "ValuesID": this.state.val4.ValuesID },
                { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[4], "ValuesID": this.state.val5.ValuesID }
            ]

            try {
                await API.post(`updateOrganizationalValues`, data).then(res => {
                    console.log(res)
                    //toast.success('Updated Successfully')
                    setTimeout(() => {
                        this.props.history.push('/build/personality');
                    }, 1000);
                })
            } catch (err) {
                toast.error(err.message)
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
        this.setState({ loader: false })
    }

    render() {
        const { show } = this.state;
        return (
            <div className=''>
                {
                    this.state.loader ? <div className='loader_overlay'>
                        <div className="custom_loader">Loading...</div>
                    </div> : null
                }
                <ToastContainer />
                <h2 className='heading bold mb-3'>Organizational Values</h2>
                <h4 className='mb-5'>Possibly one of the most important aspects of your brand are your values. These are the select group of concepts that drive the way your company will operate in good times and especiall in tough times.</h4>
                <form className='form' onSubmit={($event) => this.handleSubmit($event)} noValidate>
                    <div className='form-group'>
                        <Select placeholder='Value #1' name='val1' onChange={(val) => this.showValue(val)} options={this.state.options} value={this.state.val1} labelKey="ValuesName" valueKey="ValuesID" onChange={(val) => this.changeHandler('val1', val)} />
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                        <label className='error'>{this.validator.message('val1', this.state.val1, 'required')}</label>
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Value #2' name='val2' options={this.state.options} labelKey="ValuesName" value={this.state.val2} valueKey="ValuesID" onChange={(val) => this.changeHandler('val2', val)} />
                        <label className='error'>{this.validator.message('val2', this.state.val2, 'required')}</label>
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Value #3' name='val3' options={this.state.options} labelKey="ValuesName" value={this.state.val3} valueKey="ValuesID" onChange={(val) => this.changeHandler('val3', val)} />
                        <label className='error'>{this.validator.message('val3', this.state.val3, 'required')}</label>
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Value #4' name='val4' options={this.state.options} labelKey="ValuesName" value={this.state.val4} valueKey="ValuesID" onChange={(val) => this.changeHandler('val4', val)} />
                        <label className='error'>{this.validator.message('val4', this.state.val4, 'required')}</label>
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Value #5' name='val5' options={this.state.options} labelKey="ValuesName" value={this.state.val5} valueKey="ValuesID" onChange={(val) => this.changeHandler('val5', val)} />
                        <label className='error'>{this.validator.message('val5', this.state.val5, 'required')}</label>
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/foundation/elevator' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <button type='submit' className='btn_green m-0'>NEXT</button>
                    </div>
                </form>
                <Popup show={show} hide={this.handleClose} />
            </div>
        );
    }
}

export default organizational;