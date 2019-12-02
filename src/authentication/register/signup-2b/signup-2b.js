import React from 'react';
import './signup-2b.css'
import { NavLink } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';
import API from "../../../shared/utils/API";

class Signup2b extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: '',
            domain: '',
            errors: '',
        }
        this.validator = new SimpleReactValidator({
            messages: {
                default: 'This field is Required.',
            },
        });
    }

    signUpHandler = async (e) => {
        this.setState({ errors: '' })
        e.preventDefault();
        if (this.validator.allValid()) {

            try {

                let data = {
                    "SiteName": this.state.domain,
                    "CompanyName": this.state.company
                }
                let companyData = await API.post('insertCompany', data).then(res => {
                    if (res.data.Result === -1) {
                        // toast.error('This Site Name is already taken')
                        this.setState({ errors: 'This Site Name is already taken' })
                        return null;
                    } else {
                        return res.data.CompanyID
                    }
                })
                console.log(companyData)
                if (companyData !== null) {
                    let loggedUser = JSON.parse(localStorage.getItem('user'))
                    let postData = {
                        "UserID": loggedUser.UserID,
                        "Email": loggedUser.Email,
                        "FirstName": loggedUser.FirstName,
                        "LastName": loggedUser.LastName,
                        InviteStatus: 'Accepted',
                        "Title": "",
                        "Company": { "CompanyID": companyData },
                        "Department": { "DepartmentID": 0 },
                        "Role": { "RoleID": 0 },
                        "AccessType": { "AccessTypeID": 0 }
                    }

                    await API.post('updateUser', postData).then(rest => {
                        console.log(rest)
                        if (rest.data.Result === 1) {
                            //toast.success('Company Added Successfully')
                            this.props.user(postData)
                            localStorage.setItem('user', JSON.stringify(postData))
                            localStorage.setItem('logged', 'true')
                            this.props.history.push('/')
                        }
                        if (rest.data.Result === -1) {
                            // toast.error(rest.data.ErrorMessage)
                            toast.error(rest.data.ErrorMessage)
                            this.setState({ errors: rest.data.ErrorMessage })
                        }
                    })
                }
            } catch (err) {
                // toast.error(err.message)
                this.setState({ errors: err.message })
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <section className='setting_block pt-5 pl-5'>
                <ToastContainer />
                <div className='container'>
                    <h2 className='heading'>Create Your Account</h2>
                    <h4>Complete the information below to create an account for your organization.</h4>
                    <form className='form' noValidate onSubmit={this.signUpHandler.bind(this)}>
                        <div className='form-group'>
                            <label className='label'>Company Name</label>
                            <input type="text" className='form-control' name='company' required onChange={(e) => { this.setState({ company: e.target.value }) }} />
                            <label className='error'>{this.validator.message('company', this.state.company, 'required')}</label>
                        </div>
                        <label className='label'>Site Name</label>
                        <div className='d-flex'>
                            <div className='form-group'>
                                <input type="text" className='form-control' name='domain' placeholder='yourcompany' required onChange={(e) => { this.setState({ domain: e.target.value }) }} />
                                <label className='error'>{this.validator.message('domain', this.state.domain, 'required')}</label>
                            </div>
                            <h2 className='domain'>.patter.com</h2>
                        </div>
                        <div className='form-group'>
                            {
                                this.state.errors !== '' ? <p className='alert alert-danger'>{this.state.errors}</p> : null
                            }
                            <button className='btn_green' type='submit'>Sign Up</button>
                        </div>
                        <NavLink to='' className='primary'> &#60; Back</NavLink>
                        {/* <p className='primary'>Already have an account? <NavLink className='primary' to='/login'><strong><u>Log In </u></strong></NavLink></p> */}
                    </form>
                </div>
            </section>
        );
    }
}

export default Signup2b;