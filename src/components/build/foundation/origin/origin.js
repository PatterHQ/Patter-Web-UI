import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../../shared/modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import API from "../../../../shared/utils/API";

class origin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            brandData: '',
            BrandElementDescription: '',
            departmentID: 0,
            loader: false,
            title: '',
            desc: '',
            Importance: '',
            Hint: '',
        }

    }

    componentDidMount = async () => {
        this.setState({ loader: true })
        try {
            await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=4`).then(res => {
                console.log(res)
                this.setState({
                    brandData: res.data,
                    BrandElementDescription: res.data.Value,
                    title: res.data.BrandElement.BrandElementName,
                    desc: res.data.BrandElement.BrandElementDescription,
                    Importance: res.data.BrandElement.Importance,
                    Hint: res.data.BrandElement.Hint,
                })
                if (res.data.Department != undefined) {
                    this.setState({ departmentID: res.data.Department.DepartmentID })
                }
            })
        } catch (err) {
            toast.error(err.message)
        }
        this.setState({ loader: false })
    }
    handleClose = () => {
        this.setState({
            show: false,
        })
    };
    handleShow = () => {
        this.setState({
            show: true,
        })
    };

    handleSubmit = async (e) => {
        this.setState({ loader: true })
        e.preventDefault();
        let data = {
            "CompanyBrandElementID": this.state.brandData.CompanyBrandElementID,
            "BrandElement": {
                "BrandElementID": this.state.brandData.BrandElement.BrandElementID
            },
            "Department": { "DepartmentID": this.state.departmentID },
            "User": { "UserID": JSON.parse(localStorage.user).UserID },
            "Value": this.state.BrandElementDescription
        }
        console.log(data)

        try {
            await API.post(`updateCompanyBrandElement`, data).then(res => {
                console.log(res)
                if (res.data.Result === 1) {
                    //toast.success('Updated Successfuly')
                    setTimeout(() => {
                        this.props.history.push('/build/foundation/elevator')
                    }, 1000);
                }
            })
        } catch (err) {
            toast.error(err.message)
        }
        this.setState({ loader: false })
    }

    render() {
        const { show } = this.state;
        return (
            <div className=''>
                {
                    this.state.loader ? <div className='loader_overlay'>
                        <div className="custom_loader">Loading...</div>
                    </div> : null
                }
                <ToastContainer />
                <h2 className='heading bold mb-3'>Origin Story</h2>
                <h4>Your Origin Story lets your customers and your stakeholders know where the company came from. This helps make a personal connection and builds affinity.</h4>
                <form className='form pt-5' onSubmit={($event) => this.handleSubmit($event)} noValidate>
                    <div className='form-group'>
                        <textarea placeholder='Your Origin Story' className='form-control' rows='5' value={this.state.BrandElementDescription} onChange={($event) => this.setState({ BrandElementDescription: $event.target.value })} ></textarea>
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/foundation/mission' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <button type='submit' className='btn_green m-0'>Next</button>
                    </div>
                </form>
                <Popup show={show} Hint={this.state.Hint} Importance={this.state.Importance} title={this.state.title} desc={this.state.desc} hide={this.handleClose} />
            </div>
        );
    }
}

export default origin;