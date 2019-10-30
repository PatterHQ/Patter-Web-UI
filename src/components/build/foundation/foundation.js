import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { Select } from 'dropdown-select';

class foundation extends Component {
    render() {
        let options = [{ label: 'label1', value: 'value1' }, { label: 'label2', value: 'value2' }]
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
                        <Select placeholder='Vertical (Industry)' options={options} labelKey="label" valueKey="value" />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Company Type' options={options} labelKey="label" valueKey="value" />
                    </div>
                    <div className='form-group'>
                        <Select placeholder='Stage' options={options} labelKey="label" valueKey="value" />
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control' placeholder='Location (City, State)' />
                    </div>
                    <div className='form-group'>
                    <Select placeholder='5-10' options={options} labelKey="label" valueKey="value" />
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