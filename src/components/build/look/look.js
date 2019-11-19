import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import './look.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import API from "../../../shared/utils/API";
import S3FileUpload from 'react-s3';

//Optional Import
import { uploadFile } from 'react-s3';


class look extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: null,
            logoValue: '',
            url: 'http://ec2-34-198-96-172.compute-1.amazonaws.com//PatterService1/',
            config: {
                bucketName: 'bucketbrandasset-dev',
                dirName: 'logo',
                region: 'us-east-1',
                accessKeyId: 'AKIAQ6OABELEHDPP63ES',
                secretAccessKey: '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',
            }
        }
    }

    componentDidMount = async () => {
        try {
            await API.get( `getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=6`).then(res => {
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

    changeImg = (e) => {
        try {
            console.log(e.target.files[0])
            uploadFile(e.target.files[0], this.state.config)
                .then(data => console.log(data))
                .catch(err => console.log(err))
        } catch (err) {
            console.log(err.message)
        }
    }
    render() {
        return (
            <div className='look'>
                <h2 className='heading bold mb-3'>Part 4: Our Look</h2>
                <h4 className='mb-4'>The final section is where we maintain your outward appearance. This is what your customers and stakeholders see (visually) when they interact with your brand.</h4>
                <h4 className='bold mb-3 px-3'>Logo</h4>
                <h4 className='mb-5'>Your logo is very often the first interaction a customer or stakeholder will have with your brand. It should be representative of every other aspect of your brand.</h4>
                <form className='form pt-3'>
                    <div className='form-group'>
                        <input type="file" id="file" accept="image/*" onChange={(e) => this.changeImg(e)} />
                        <label htmlFor="file" className="btn-1">UPLOAD LOGO</label>
                    </div>
                    <div className='form-group'>
                        <div className='tag_container'></div>
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/voice' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <NavLink to='/build/look/palette' className='btn_green m-0'>NEXT</NavLink>
                    </div>
                </form>
            </div>
        );
    }
}

export default look;