import React, { Component } from 'react';
import { Select } from 'dropdown-select';

class companyInfo extends Component {

  render() {
    let options = [{ label: 'label1', value: 'value1' }, { label: 'label2', value: 'value2' }]
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
              <Select placeholder='Casino/ Gaming' options={options} labelKey="label" valueKey="value" />
            </div>
            <div className='form-group'>
              <label className='label'>Company Type</label>
              <Select placeholder='Software as a Service (SaaS)' options={options} labelKey="label" valueKey="value" />
            </div>
            <div className='form-group'>
              <label className='label'>Stage</label>
              <Select placeholder='Traction (Pre-PM Fit)' options={options} labelKey="label" valueKey="value" />
            </div>
            <div className='form-group'>
              <label className='label'>Location (City, State)</label>
              <input type="text" className='form-control' placeholder='Location (City, State)' />
            </div>
            <div className='form-group'>
              <label className='label'>Number of Employees</label>
              <Select placeholder='5-10' options={options} labelKey="label" valueKey="value" />
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
