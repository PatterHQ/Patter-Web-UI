import React from 'react';
import './signup.css'
import { NavLink } from 'react-router-dom'
// import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
        this.validator = new SimpleReactValidator({
            messages: {
                email: 'Please Enter Valid Email',
                default: 'This field is Required.'
            },
        });

    }
    signUpHandler = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(res => {
                    console.log(res)
                    // toast.success('Registered Successfully')
                    res.user.sendEmailVerification().then(function() {
                        toast.success('Registered Successfully')
                      }).catch(function(error) {
                        toast.error(error.message)
                      });
                    // if (res.user) Auth.setLoggedIn(true);
                })
                .catch(e => {
                    console.log(e)
                    toast.error(e.message)
                });
        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    };
    render() {
        return (
            <section className='setting_block pt-5 pl-5'>
                <ToastContainer />
                <div className='container'>
                    <h2 className='heading'>Create Your Account</h2>
                    <h4>Get started building your best brand</h4>
                    <form className='form' noValidate onSubmit={this.signUpHandler.bind(this)}>
                        <div className='form-group'>
                            <label className='label'>First Name</label>
                            <input type="text" className='form-control' name='firstName' required onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                            <label className='error'>{this.validator.message('firstName', this.state.firstName, 'required')}</label>
                        </div>
                        <div className='form-group'>
                            <label className='label'>Last Name</label>
                            <input type="text" className='form-control' name='lastName' required onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
                            <label className='error'>{this.validator.message('lastName', this.state.lastName, 'required')}</label>
                        </div>
                        <div className='form-group'>
                            <label className='label'>Email Address</label>
                            <input type="email" className='form-control' name='email' required onChange={(e) => { this.setState({ email: e.target.value }) }} />
                            <label className='error'>{this.validator.message('email', this.state.email, 'required|email')}</label>
                        </div>
                        <div className='form-group'>
                            <label className='label'>Password</label>
                            <input type="password" className='form-control' name='password' required onChange={(e) => { this.setState({ password: e.target.value }) }} />
                            <label className='error'>{this.validator.message('password', this.state.password, 'required')}</label>
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='btn_green' >Next</button>
                        </div>
                        <p className='primary'>By siging up, you agree to Patter’s <NavLink className='primary' to=''><u>Terms of Service and Privacy Policy.</u></NavLink></p>
                        <p className='primary'>Already have an account? <NavLink className='primary' to='/login'><strong><u>Log In </u></strong></NavLink></p>
                    </form>
                </div>
            </section>
        );
    }
}

export default Signup;