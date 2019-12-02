import React from 'react';
import './signup-2a.css'
import { NavLink } from 'react-router-dom'
import Axios from 'axios';
import API from "../../../shared/utils/API";

class Signup2a extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: 'Your Company',
            url: 'http://ec2-34-198-96-172.compute-1.amazonaws.com//PatterService1/getCompany?companyID='
        }
    }
    componentDidMount = async () => {
        let regisetred = JSON.parse(localStorage.getItem('user'))
        if (regisetred.Company !== undefined && regisetred.Company !== null) {
            this.setState({ company: regisetred.Company.CompanyName })
            // API.get( regisetred.Company.CompanyID).then(res => {
            //     let comp = res.data
            //     console.log(JSON.parse(comp))
            //     this.setState({ company: res.data.CompanyName })
            // })
        }
    }

    changeInvite = async (status) => {
        try {
            let loggedUser = JSON.parse(localStorage.getItem('user'))
            if (loggedUser.AccessType === null) {
                loggedUser.AccessType = { "AccessTypeID": 0 }
            }
            loggedUser.InviteStatus = status
            await API.post('updateUser', loggedUser).then(rest => {
                if (rest.data.Result === 1) {
                    localStorage.setItem('user', JSON.stringify(loggedUser))
                    if(status==='Accepted'){
                        this.props.user(loggedUser)
                        localStorage.setItem('logged', 'true')
                        this.props.history.push('/')
                    }else if(status==='Declined'){
                        this.props.history.push('/signup/b')
                    }
                }
            })

        } catch (error) {
            console.log(error)
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
                            <button onClick={() => this.changeInvite('Accepted')} className='btn_green'>Yes</button>
                            <button onClick={() => this.changeInvite('Declined')} className='btn_white'>No</button>
                            {/* <NavLink to='/signup/b' className='btn_white'>No</NavLink> */}
                        </div>
                        <p className='primary'>Already have an account? <NavLink className='primary' to='/login'><strong><u>Log In </u></strong></NavLink></p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Signup2a;