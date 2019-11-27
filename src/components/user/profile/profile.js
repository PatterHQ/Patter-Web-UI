import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom'
import { IoIosCamera } from "react-icons/io";
import './profile.css';

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            FirstName: "",
            Email: "",
            LastName: "",
            Title: "",
            
        }
    }

    componentDidMount = async () => {
        let user=JSON.parse(localStorage.user)
        this.setState({
            FirstName: user.FirstName,
            Email: user.Email,
            LastName: user.LastName,
            Title: user.Title,
        })
    }
    render() {
        return (
            <section className='setting_block pt-3 px-3'>
                <div className='container'>
                    <h2 className='heading bold'>User Profile Setting</h2>
                    <div className='upload'>
                        <IoIosCamera className='camera' />
                    </div>
                    <div className='form'>
                        <div className='form-group'>
                            <label className='label'>First Name</label>
                            <input type="text" className='form-control' value={this.state.FirstName} placeholder='Aaron' />
                        </div>
                        <div className='form-group'>
                            <label className='label'>Last Name</label>
                            <input type="text" className='form-control' value={this.state.LastName} placeholder='Gopp' />
                        </div>
                        <div className='form-group'>
                            <label className='label'>Title / Role</label>
                            <input type="text" readOnly className='form-control' value={this.state.Title} placeholder='CEO' />
                        </div>
                        <div className='form-group'>
                            <label className='label'>Email Address</label>
                            <input type="email" className='form-control' value={this.state.Email} placeholder='Aaron@patter.com' />
                        </div>
                        <div className='form-group'>
                            <button className='btn_green mr-2'>Save</button>
                            <button className='btn_white'>Cancel</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
