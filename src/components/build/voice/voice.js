import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft, FaPlus } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import './voice.css'
import Popup from '../../../shared/modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import API from "../../../shared/utils/API";


class voice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            keywordInput: '',
            buzzwordInput: '',
            Keywords: null,
            KeywordsValue: [],
            Buzzwords: null,
            BuzzwordsValue: [],
            loader:false
        }
    }

    componentDidMount = async () => {
        this.setState({loader:true})
        try {
            await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=10`).then(res => {
                console.log(res.data)
                if (res.data.Value !== '') {
                    this.setState({ KeywordsValue: res.data.Value.split(',') })
                }
                this.setState({ Keywords: res.data })
            })
        } catch (err) {
            toast.error(err.message)
        }

        try {
            await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=11`).then(res => {
                console.log(res.data)
                if (res.data.Value !== '') {
                    this.setState({ BuzzwordsValue: res.data.Value.split(',') })
                }
                this.setState({ Buzzwords: res.data })
            })
        } catch (err) {
            toast.error(err.message)
        }
        this.setState({loader:false})
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    handleShow = () => {
        this.setState({
            show: true,
        })
    }


    addKeyword = () => {
        this.setState({
            KeywordsValue: [...this.state.KeywordsValue, this.state.keywordInput],
            keywordInput: ''
        })
    }

    addBuzzwords = () => {
        this.setState({
            BuzzwordsValue: [...this.state.BuzzwordsValue, this.state.buzzwordInput],
            buzzwordInput: ''
        })
    }

    handleSubmit = async (e) => {
        this.setState({loader:true})
        e.preventDefault();
        let user = JSON.parse(localStorage.user)
        let departmentID = 0;
        if (user.Department !== undefined) {
            departmentID = user.Department.DepartmentID
        }
        let keywordData = {
            'CompanyBrandElementID': this.state.Keywords.CompanyBrandElementID,
            'BrandElement': {
                'BrandElementID': 10
            },
            'Department': {
                'DepartmentID': departmentID
            },
            'User': {
                'UserID': user.UserID
            },
            'Value': this.state.KeywordsValue.join(',')
        }
        let buzzwordData = {
            'CompanyBrandElementID': this.state.Buzzwords.CompanyBrandElementID,
            'BrandElement': {
                'BrandElementID': 11
            },
            'Department': {
                'DepartmentID': departmentID
            },
            'User': {
                'UserID': user.UserID
            },
            'Value': this.state.BuzzwordsValue.join(',')
        }

        try {

            let keywd = await API.post(`updateCompanyBrandElement`, keywordData).then(res => {
                console.log(res.data)
                if (res.data.Result === 1) { return true }
            })
            let buzwd = await API.post(`updateCompanyBrandElement`, buzzwordData).then(res => {
                console.log(res.data)
                if (res.data.Result === 1) { return true }
            })
            if (keywd && buzwd) {
                toast.success('Updated Successfully')
                setTimeout(() => {
                    this.props.history.push('/build/look')
                }, 1000);
            }

        } catch (error) {
            toast.error(error.message)
        }
        this.setState({loader:false})
    }

    removekeyword = (val) => {
        this.setState({
            KeywordsValue: this.state.KeywordsValue.filter(k => k != val)
        })
    }

    removeBuzzword = (val) => {
        this.setState({
            BuzzwordsValue: this.state.BuzzwordsValue.filter(k => k != val)
        })
    }



    render() {
        const { show } = this.state;
        return (
            <div className='voice'>
                {
                    this.state.loader ? <div className='loader_overlay'>
                        <div className="custom_loader">Loading...</div>
                    </div> : null
                }
                <ToastContainer />
                <h2 className='heading bold mb-3'>Part 3: Our Voice</h2>
                <h4 className='mb-5'>This sections describes how we communicate both internally and externally. This is an extention of your team’s personality and should be consistent.</h4>
                <form className='form' onSubmit={($event) => this.handleSubmit($event)} noValidate>
                    <h4 className='heading bold mb-3'>Keywords</h4>
                    <h4 className='mb-5'>This is an inventory of words that are used to describe your organization, your product and your team. They could be used in both internal and external communication.</h4>
                    <div className='form-group mb-3'>
                        <input type="text" placeholder='Enter Keyword' className='form-control' value={this.state.keywordInput} onChange={(e) => this.setState({ keywordInput: e.target.value })} />
                        <FaPlus className='addPlus pointer' onClick={this.addKeyword} />
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                    </div>
                    <div className='form-group'>
                        <div className='tag_container'>
                            {
                                this.state.KeywordsValue.map((item, index) => <div key={index + item} className='note_msg'><span>{item}</span><span className='remove' onClick={() => this.removekeyword(item)} >✖</span></div>)
                            }
                        </div>
                    </div>
                    <h4 className='heading bold mb-3'>Buzzwords</h4>
                    <h4 className='mb-5'>These are words that fit the brand but should not be over used at risk of watering down their impact.</h4>
                    <div className='form-group mb-3'>
                        <input type="text" placeholder='Enter Buzzword' className='form-control' value={this.state.buzzwordInput} onChange={(e) => this.setState({ buzzwordInput: e.target.value })} />
                        <FaPlus className='addPlus pointer' onClick={this.addBuzzwords} />
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                    </div>
                    <div className='form-group'>
                        <div className='tag_container'>
                            {
                                this.state.BuzzwordsValue.map((item, index) => <div key={index + item} className='note_msg'><span>{item}</span><span className='remove' onClick={() => this.removeBuzzword(item)} >✖</span></div>)
                            }
                        </div>
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/personality/character' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <button type='submit' className='btn_green m-0'>NEXT</button>
                    </div>
                </form>
                <Popup show={show} hide={this.handleClose} />
            </div>
        );
    }
}

export default voice;