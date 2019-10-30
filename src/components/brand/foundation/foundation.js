import React, { Component } from 'react';
import { Select } from 'dropdown-select';
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../shared/modal/modal';


class foundation extends Component {

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
          <h2 className='heading bold mb-3'>Our Foundation</h2>
          <h4 className='mb-5'>These are the brand elements in which the entire organization is built upon.</h4>
          <form className='form'>
            <div className='form-group'>
              <label className='label'>Mission/ Purpose</label>
              <textarea className='form-control textarea'>
                Lorem ipsum dolor sit amet, duo te dicit impedit, pro mutat inermis delicata eu, sit ea esse aliquam suscipiantur. Ut vix libris invidunt.
              </textarea>
              <span className='textarea_tooltip mt-4 pt-2' onClick={this.handleShow} ><GoLightBulb /></span>
            </div>
            <div className='form-group'>
              <label className='label'>Origin Story</label>
              <textarea className='form-control textarea'>
                Lorem ipsum dolor sit amet, duo te dicit impedit, pro mutat inermis delicata eu, sit ea esse aliquam suscipiantur. Ut vix libris invidunt.
              </textarea>
              <span className='textarea_tooltip mt-4 pt-2' onClick={this.handleShow} ><GoLightBulb /></span>
            </div>
            <div className='form-group'>
              <label className='label'>Elevator Pitch</label>
              <textarea className='form-control textarea'>
                Lorem ipsum dolor sit amet, duo te dicit impedit, pro mutat inermis delicata eu, sit ea esse aliquam suscipiantur. Ut vix libris invidunt.
              </textarea>
              <span className='textarea_tooltip mt-4 pt-2' onClick={this.handleShow} ><GoLightBulb /></span>
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

export default foundation;
