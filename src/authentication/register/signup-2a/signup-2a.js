import React from 'react';
import './signup-2a.css'
import { NavLink } from 'react-router-dom'
import Axios from 'axios';

class Signup2a extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: 'Your Company',
            url: 'http://ec2-34-198-96-172.compute-1.amazonaws.com//PatterService1/getCompany?companyID='
        }
    }
    componentDidMount = async () => {
        let regisetred = JSON.parse(localStorage.getItem('newRegister'))
        if (regisetred.Company !== undefined) {
            Axios.get(this.state.url + regisetred.Company.CompanyID).then(res => {
                console.log(res)
                this.setState({ company: res.data.CompanyName })
            })
        }
    }
    render() {
        return (
            <section className='setting_block pt-5 pl-5'>
                <div className='container'>
                    <h2 className='heading'>Your Email Address Is Linked</h2>
                    <h4>The email address that you’ve entered has been linked <br /> to the account: </h4>
                    <h4 className='bold'>{this.state.company}</h4>
                    <p>Is this correct?</p>
                    <div className='form'>
                        <div className='form-group'>
                            <NavLink to='/' className='btn_green'>Yes</NavLink>
                            <NavLink to='/signup/b' className='btn_white'>No</NavLink>
                        </div>
                        <p className='primary'>Already have an account? <NavLink className='primary' to='/login'><strong><u>Log In </u></strong></NavLink></p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Signup2a;