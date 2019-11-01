import React from 'react';
import './signup-2b.css'
import { NavLink } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

class Signup2b extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: '',
            domain: '',
            url:'http://ec2-34-198-96-172.compute-1.amazonaws.com//PatterService1/insertCompany'
        }
        this.validator = new SimpleReactValidator({
            messages: {
                default: 'This field is Required.',
            },
        });
    }

    signUpHandler = async (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            let data={
                CompanyName: this.state.company,
                Website: this.state.domain
            }
            await axios.post(this.state.url, data).then(res => {
                console.log(res)
                toast.success('Company Added Successfully')
                this.props.history.push('/')
            })
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
                            <button className='btn_green' type='submit'>Sign Up</button>
                        </div>
                        <NavLink to='' className='primary'> &#60; Back</NavLink>
                        <p className='primary'>Already have an account? <NavLink className='primary' to='/login'><strong><u>Log In </u></strong></NavLink></p>
                    </form>
                </div>
            </section>
        );
    }
}

export default Signup2b;