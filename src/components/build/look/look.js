import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import './look.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import API from "../../../shared/utils/API";


class look extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: null,
            file: null,
            logoValue: '',
            image: ''
        }
    }

    componentDidMount = async () => {
        try {

            await this.getImage()

            await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=6`).then(res => {
                this.setState({
                    logo: res.data,
                    logoValue: res.data.Value,
                })
                console.log(this.state.logo)
            })
        } catch (err) {
            toast.error(err.message)
        }
    }

    getImage=async ()=>{
        let id=JSON.parse(localStorage.user).Company.CompanyID
        await API.get(`getImage?fileName=${id}patter.png`).then(res=>{
            console.log(res)
            if(res.data.Result===1){
                this.setState({image: res.data.Data})
            }
        })
    }
    changeImg = (e) => {
        try {
            console.log(e.target.files[0])

            if (e.target.files[0] != null) {
                var file = e.target.files[0];
                var myReader = new FileReader();

                myReader.onloadend = (e) => {
                    console.log(myReader.result)
                    this.setState({
                        image: (myReader.result).toString()
                    })
                }
                myReader.readAsDataURL(file);
            }

        } catch (err) {
            console.log(err.message)
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let company = JSON.parse(localStorage.user).Company
            let data = {
                "FileName": `${company.CompanyID}patter.png`,
                "Data": this.state.image
            }
            API.post('saveImage', data).then(res => {
                console.log(res)
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    render() {
        return (
            <div className='look'>
                <ToastContainer />
                <h2 className='heading bold mb-3'>Part 4: Our Look</h2>
                <h4 className='mb-4'>The final section is where we maintain your outward appearance. This is what your customers and stakeholders see (visually) when they interact with your brand.</h4>
                <h4 className='bold mb-3 px-3'>Logo</h4>
                <h4 className='mb-5'>Your logo is very often the first interaction a customer or stakeholder will have with your brand. It should be representative of every other aspect of your brand.</h4>
                <form className='form pt-3' onSubmit={($event) => this.handleSubmit($event)} noValidate encType='multipart'>
                    <div className='form-group'>
                        <input type="file" id="file" accept="image/*" onChange={(e) => this.changeImg(e)} />
                        <label htmlFor="file" className="btn-1">UPLOAD LOGO</label>
                    </div>
                    <div className='form-group'>
                        {
                            this.state.image !== '' ? <div className='tag_container transparnt'><img className='img-responsive' src={this.state.image} alt='logo' /></div> : <div className='tag_container'></div>
                        }
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/voice' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        {/* <NavLink to='/build/look/palette' className='btn_green m-0'>NEXT</NavLink> */}
                        <button className='btn_green' type='submit'>Next</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default look;