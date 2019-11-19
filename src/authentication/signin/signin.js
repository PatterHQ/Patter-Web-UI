import React from 'react';
import './signin.css'
import { NavLink } from 'react-router-dom'
// import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import SimpleReactValidator from 'simple-react-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import API from "../../shared/utils/API";
class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            url: 'http://ec2-34-198-96-172.compute-1.amazonaws.com//PatterService1/getUser?email='
        }
        this.validator = new SimpleReactValidator({
            messages: {
                email: 'Please Enter Valid Email',
                default: 'This field is Required.'
            },
        });
    }
    signInHandler = (e) => {
        var prop = this.props
        e.preventDefault();
        try {
            if (this.validator.allValid()) {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then((res) => {
                        console.log(res)
                        if (!res.user.emailVerified) {
                            // console.log('Please Conform Your Email to Login')
                            toast.warn('Please Conform Your Email to Login');
                        } else {
                            API.get( res.user.email).then(res => {
                                console.log(res)
                                prop.user(res.data)
                                localStorage.setItem('logged', 'true')
                                localStorage.setItem('user', JSON.stringify(res.data))
                                toast.success('Login Successfully')
                                if (res.data.Company !== undefined) {
                                    prop.history.push('/signup/a');
                                } else {
                                    prop.history.push('/signup/b');
                                }
                            })
                        }
                        // if (res.user) Auth.setLoggedIn(true);
                    })
                    .catch(e => {
                        toast.error(e.message)
                        console.log(e)
                    });
            } else {
                this.validator.showMessages();
                this.forceUpdate();
            }
        } catch (err) {
            toast.error(err.message)
        }
    };

    render() {
        return (
            <section className='setting_block pt-5 pl-5'>
                <ToastContainer />
                <div className='container'>
                    <h2 className='heading'>Log In To Your Account</h2>
                    <form className='form' noValidate onSubmit={this.signInHandler.bind(this)}>
                        <div className='form-group'>
                            <label className='label'>Email Address</label>
                            <input type="email" className='form-control' value={this.state.email} name='email' required onChange={(e) => { this.setState({ email: e.target.value }) }} />
                            <label className='error'>{this.validator.message('email', this.state.email, 'required|email')}</label>
                        </div>
                        <div className='form-group'>
                            <label className='label'>Password</label>
                            <input type="password" className='form-control' name='password' required onChange={(e) => { this.setState({ password: e.target.value }) }} />
                            <label className='error'>{this.validator.message('password', this.state.password, 'required')}</label>
                        </div>
                        <div className='form-group'>
                            <button className='btn_green' type='submit'>Log in</button>
                        </div>
                        <p className='primary'>Do not have an account yet? <NavLink className='primary' to='/signup'><strong><u>Sign Up </u></strong></NavLink></p>
                    </form>
                </div>
            </section>
        );
    }
}

export default Signin;