import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { Select } from 'dropdown-select';
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

class foundation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verticals: [],
            CompanyTypes: [],
            getStages: [],
            getEmployeeRanges: [],
            url: 'http://ec2-34-198-96-172.compute-1.amazonaws.com//PatterService1/'
        }
        this.validator = new SimpleReactValidator({
            messages: {
                default: 'This field is Required.'
            },
        });
    }

    componentDidMount = () => {
        this.getVerticals();
        this.getCompanyTypes();
        this.getStages();
        this.getEmployeeRanges();
    }

    getVerticals = async () => {
        try {
            await Axios.get(this.state.url + 'getVerticals').then(res => {
                console.log(res)
                this.setState({ verticals: res.data })
            })
        } catch (err) {
            toast.error(err.message)
        }
    }

    getCompanyTypes = async () => {
        try {
            await Axios.get(this.state.url + 'getCompanyTypes').then(res => {
                console.log(res)
                this.setState({ CompanyTypes: res.data })
            })
        } catch (err) {
            toast.error(err.message)
        }
    }

    getEmployeeRanges = async () => {
        try {
            await Axios.get(this.state.url + 'getEmployeeRanges').then(res => {
                console.log(res)
                this.setState({ getEmployeeRanges: res.data })
            })
        } catch (err) {
            toast.error(err.message)
        }
    }

    getStages = async () => {
        try {
            await Axios.get(this.state.url + 'getStages').then(res => {
                console.log(res)
                this.setState({ getStages: res.data })
            })
        } catch (err) {
            toast.error(err.message)
        }
    }

    render() {
        return (
            <div className=''>
                <h2 className='heading bold mb-3'>Part 1: Our Foundation</h2>
                <h4 className='mb-5'>Every great brand is build on top of a strong foundation. These are the big picture elements that help guide the company from the top down.</h4>
                <form className='form'>
                    <div className='form-group'>
                        <input type="text" className='form-control' placeholder='Company Name (or DBA Name)' />
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control' placeholder='Product Name (if different)' />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Vertical (Industry)' options={this.state.verticals} labelKey="VerticalDescription" valueKey="VerticalID" />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Company Type' options={this.state.CompanyTypes} labelKey="CompanyTypeDescription" valueKey="CompanyTypeID" />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Stage' options={this.state.getStages} labelKey="StageDescription" valueKey="StageID" />
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control' placeholder='Location (City, State)' />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='5-10' options={this.state.getEmployeeRanges} labelKey="EmployeeRangeDescription" valueKey="EmployeeRangeID" />
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/introduction' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <NavLink to='/build/foundation/mission' className='btn_green m-0'>NEXT</NavLink>
                    </div>
                </form>
            </div>
        );
    }
}

export default foundation;