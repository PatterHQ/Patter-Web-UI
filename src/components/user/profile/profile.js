import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom'
import { IoIosCamera } from "react-icons/io";
import './profile.css';
import API from "../../../shared/utils/API";


export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserID: 0,
            FirstName: "",
            Email: "",
            LastName: "",
            Title: "",

        }
    }

    componentDidMount = async () => {
        let user = JSON.parse(localStorage.user)
        this.setState({
            UserID: user.UserID,
            FirstName: user.FirstName,
            Email: user.Email,
            LastName: user.LastName,
            Title: user.Title,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let loggedUser = JSON.parse(localStorage.getItem('user'))
            loggedUser.FirstName = this.state.FirstName
            loggedUser.LastName = this.state.LastName
            if (loggedUser.AccessType === null) {
                loggedUser.AccessType = { "AccessTypeID": 0 }
            }
            await API.post('updateUser', loggedUser).then(res => {
                console.log(res)
                if(res.data.Result===1){
                    localStorage.setItem('user',JSON.stringify(loggedUser))
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <section className='setting_block pt-3 px-3'>
                <div className='container'>
                    <h2 className='heading bold'>User Profile Setting</h2>
                    <div className='upload'>
                        <IoIosCamera className='camera' />
                    </div>
                    <form className='form' onSubmit={($event) => this.handleSubmit($event)} noValidate>
                        <div className='form-group'>
                            <label className='label'>First Name</label>
                            <input type="text" className='form-control' value={this.state.FirstName} placeholder='First Name' onChange={(e) => this.setState({ FirstName: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <label className='label'>Last Name</label>
                            <input type="text" className='form-control' value={this.state.LastName} placeholder='Last Name' onChange={(e) => this.setState({ LastName: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <label className='label'>Title / Role</label>
                            <input type="text" readOnly className='form-control' value={this.state.Title} placeholder='Title' />
                        </div>
                        <div className='form-group'>
                            <label className='label'>Email Address</label>
                            <input type="email" readOnly className='form-control' value={this.state.Email} placeholder='Email' />
                        </div>
                        <div className='form-group'>
                            <button className='btn_green mr-2'>Save</button>
                            <button className='btn_white'>Cancel</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}
