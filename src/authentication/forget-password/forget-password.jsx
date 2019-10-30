import React from 'react';
import { NavLink } from 'react-router-dom'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
        }
        this.validator = new SimpleReactValidator({
            messages: {
                email: 'Please Enter Valid Email',
                default: 'This field is Required.'
            },
        });
    }

    HandleResetpassword = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            var auth = firebase.auth();
            auth.sendPasswordResetEmail(this.state.email).then(function () {
                toast.success('Reset link is sent on you email address')
            }).catch(function (error) {
                toast.error(error.message)
            });
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
                    <h2 className='heading'>Recover Your Password</h2>
                    <h4 className='text-body mb-4'>Enter your email address below and we will send you <br />instructions to reset your password.</h4>
                    <form className='form' noValidate onSubmit={this.HandleResetpassword.bind(this)}>
                        <div className='form-group'>
                            <label className='label'>Email Address</label>
                            <input type="email" className='form-control' value={this.state.email} name='email' required onChange={(e) => { this.setState({ email: e.target.value }) }} />
                            <label className='error'>{this.validator.message('email', this.state.email, 'required|email')}</label>
                        </div>
                        <div className='form-group'>
                            <button className='btn_green'>SUBMIT</button>
                        </div>
                        <p className='primary'>Do not have an account yet? <NavLink className='primary' to=''><strong><u>Sign Up </u></strong></NavLink></p>
                    </form>
                </div>
            </section>
        )
    }
}

export default ForgetPassword;