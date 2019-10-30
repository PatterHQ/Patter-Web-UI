import React, { Component } from 'react';
import { Select } from 'dropdown-select';
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../shared/modal/modal';

class personality extends Component {
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
        let options = [{ label: 'label1', value: 'value1' }, { label: 'label2', value: 'value2' }]
        return (
            <div className='p-3'>
                <div className='container'>
                    <form className='form'>
                        <h2 className='heading bold mb-3'>Our Personality</h2>
                        <h4 className='mb-4'>These are the brand elements in which the entire organization is built upon.</h4>
                        <h4 className='mb-5 bold label'>Personality Assessment <span onClick={this.handleShow} ><GoLightBulb className='float-right' /></span></h4>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Feminine <span className='float-right'>Masculine</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Yourthful <span className='float-right'>Mature</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Casual <span className='float-right'>Formal</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Charming <span className='float-right'>Rugged</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Extroverted <span className='float-right'>Introverted</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Risk-Averse <span className='float-right'>Risk-Taking</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Chill <span className='float-right'>Energetic</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group mb-5'>
                            <h4 className='bold m-0'>Serious <span className='float-right'>Funny</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <label className='label'>Organizational Values</label>
                            <Select placeholder='Humility' options={options} labelKey="label" valueKey="value" />
                            <span className='textarea_tooltip mt-4 pt-2' onClick={this.handleShow} ><GoLightBulb /></span>
                        </div>
                        <div className='form-group'>
                            <Select placeholder='Empathy' options={options} labelKey="label" valueKey="value" />
                        </div>
                        <div className='form-group'>
                            <Select placeholder='Collaboration' options={options} labelKey="label" valueKey="value" />
                        </div>
                        <div className='form-group'>
                            <Select placeholder='Persistence' options={options} labelKey="label" valueKey="value" />
                        </div>
                        <div className='form-group'>
                            <Select placeholder='Speed' options={options} labelKey="label" valueKey="value" />
                        </div>
                        <div className='mt-3 mb-5'>
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

export default personality;