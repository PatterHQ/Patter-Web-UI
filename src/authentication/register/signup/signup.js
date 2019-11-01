import React from 'react';
import './signup.css'
import { NavLink } from 'react-router-dom'
// import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            url: 'http://ec2-34-198-96-172.compute-1.amazonaws.com//PatterService1/insertUser'
        }
        this.validator = new SimpleReactValidator({
            messages: {
                email: 'Please Enter Valid Email',
                default: 'This field is Required.',
                min:    'Password Must be 8 Charactor long'
            },
        });
    }

    signUpHandler = (e) => {
        e.preventDefault();
        let props=this.props
        if (this.validator.allValid()) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then( res => {
                    console.log(res)
                    let data ={Email:this.state.email,FirstName:this.state.firstName,LastName:this.state.lastName}
                    // toast.success('Registered Successfully')
                    axios.post(this.state.url, data).then(res => {
                        console.log(res.data);
                        localStorage.setItem('newRegister',JSON.stringify(res.data))
                    })
                    res.user.sendEmailVerification().then(function () {
                        toast.success('Registered Successfully')
                        props.history.push('login')
                    }).catch(function (error) {
                        toast.error(error.message)
                    });
                    // if (res.user) Auth.setLoggedIn(true);
                })
                .catch(e => {
                    console.log(e)
                    toast.error(e.message)
                });
        } else {
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
                            <label className='error'>{this.validator.message('password', this.state.password, 'required|min:8')}</label>
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