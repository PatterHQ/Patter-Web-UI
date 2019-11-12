import React, { Component } from 'react';
import { Select } from 'dropdown-select';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

class companyInfo extends Component {
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
      <div className='p-3'>
        <div className='container'>
          <h2 className='heading bold mb-3'>Company Info</h2>
          <h4 className='mb-5'>General information an details about the company.</h4>
          <form className='form'>
            <div className='form-group'>
              <label className='label'>Company Name (or DBA Name)</label>
              <input type="text" className='form-control' placeholder='Your Mission/ Purpose' />
            </div>
            <div className='form-group'>
              <label className='label'>Product Name (if different)</label>
              <input type="text" className='form-control' placeholder='' />
            </div>
            <div className='form-group'>
              <label className='label'>Industry (Vertical)</label>
              <Select placeholder='Vertical (Industry)' options={this.state.verticals} labelKey="VerticalDescription" valueKey="VerticalID" />
            </div>
            <div className='form-group'>
              <label className='label'>Company Type</label>
              <Select placeholder='Company Type' options={this.state.CompanyTypes} labelKey="CompanyTypeDescription" valueKey="CompanyTypeID" />
            </div>
            <div className='form-group'>
              <label className='label'>Stage</label>
              <Select placeholder='Stage' options={this.state.getStages} labelKey="StageDescription" valueKey="StageID" />
            </div>
            <div className='form-group'>
              <label className='label'>Location (City, State)</label>
              <input type="text" className='form-control' placeholder='Location (City, State)' />
            </div>
            <div className='form-group'>
              <label className='label'>Number of Employees</label>
              <Select placeholder='5-10' options={this.state.getEmployeeRanges} labelKey="EmployeeRangeDescription" valueKey="EmployeeRangeID" />
            </div>
            <div className='mt-3 mb-5'>
              <button className='btn_green'>Save</button>
              <button className='btn_white'>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default companyInfo;
