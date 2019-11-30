import React from 'react';
import './setting.css'
import Form from 'react-bootstrap/Form'
import { Select } from 'dropdown-select';
import API from "../../../shared/utils/API";

class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            SiteName: ''
        }
    }
    getCompanyByID = async () => {
        try {
          let id = JSON.parse(localStorage.user).Company.CompanyID
          if (id != null) {
            await API.get(`getCompany?companyID=${id}`).then(res => {
              console.log(res.data.SiteName)
              this.setState({ SiteName: res.data.SiteName })
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    

    componentDidMount = () => {
       this.getCompanyByID();
    }

    render() {
        let options = [{ label: 'label1', value: 'value1' }, { label: 'label2', value: 'value2' }]
        return (
            <section className='setting_block pt-3 px-3'>
                <div className='container'>
                    <h2 className='heading'>Account Settings</h2>
                    <form className='form'>
                        <label className='label'>Site Name</label>
                        <div className='d-flex'>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={this.state.SiteName} name='company' placeholder='yourcompany' onChange={(e)=>this.setState({SiteName:e.target.value})} />
                            </div>
                            <h2 className='domain'>.patter.com</h2>
                        </div>
                        <div className='form-group'>
                            <label className='label'>Primary Contact</label>
                            <Select placeholder='Aaron Gopp' options={options} labelKey="label" valueKey="value" />
                        </div>
                        <div className='form-group'>
                            <Form.Group className='mb-0' controlId="formBasicCheckbox0">
                                <Form.Check type="checkbox" custom label="Deactivate Your Account" />
                            </Form.Group>
                            {/* <Form.Check type="checkbox" label="Deactivate Your Account" /> */}
                        </div>
                        <p className='primary'>(By deactivating your account, your site will no longer be accessible. Your account can always be restored with no information loss by contact our Customer Success team at 1-800-800-8000 or via email at support@patter.com)</p>
                        <div className='form-group'>
                            <button className='btn_green'>Save</button>
                            <button className='btn_white'>Cancel</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default Setting;