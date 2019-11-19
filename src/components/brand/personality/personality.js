import React, { Component } from 'react';
import { Select } from 'dropdown-select';
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../shared/modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Axios from 'axios';
import API from "../../../shared/utils/API";

class personality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,

            options: [],
            val1: '',
            val2: '',
            val3: '',
            val4: '',
            val5: '',

            organizationalData: null,
            CompanyOrganizationalValueIDs: [],

            brandData: '',
            score0: 0,
            score1: 0,
            score2: 0,
            score3: 0,
            score4: 0,
            score5: 0,
            score6: 0,
            score7: 0,
            CompanyPersonalityAssessmentID: [],

            loader:false,

        }
    }

    componentDidMount = async () => {
        this.setState({loader:true})
        try {

            // getPersonalityAssessment
            await API.get(`/getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=9`).then(res => {
                console.log(res)
                let ids = []
                res.data.CompanyBrandElementPersonalityAssessments.forEach((v, i) => {
                    let vars = `score${i}`
                    ids.push(v.CompanyBrandElementPersonalityAssessmentsID);
                    this.setState({
                        [vars]: v.PersonalityAssessment.Score,
                    })
                })
                this.setState({
                    brandData: res.data,
                    CompanyPersonalityAssessmentID: ids
                })
            })

            // getValues
            await API.get(`/getValues`).then(res => {
                console.log(res)
                this.setState({
                    options: res.data,
                })
            })

            // Organizational
            await API.get(`/getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=3`).then(res => {
                console.log(res)
                res.data.CompanyBrandElementValues.forEach((v, i) => {
                    let vars = `val${i + 1}`
                    this.setState({ [vars]: v.Value, CompanyOrganizationalValueIDs: [...this.state.CompanyOrganizationalValueIDs, v.CompanyBrandElementValuesID] })
                })
                this.setState({
                    organizationalData: res.data,
                })
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
    };
    handleShow = () => {
        this.setState({
            show: true,
        })
    };

    changeHandler = (stVar, val) => {
        this.setState({
            [stVar]: val
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({loader:true})
        let PersonalityData = [
            { "CompanyPersonalityAssessmentID": this.state.CompanyPersonalityAssessmentID[0], "Score": Number(this.state.score0) },
            { "CompanyPersonalityAssessmentID": this.state.CompanyPersonalityAssessmentID[1], "Score": Number(this.state.score1) },
            { "CompanyPersonalityAssessmentID": this.state.CompanyPersonalityAssessmentID[2], "Score": Number(this.state.score2) },
            { "CompanyPersonalityAssessmentID": this.state.CompanyPersonalityAssessmentID[3], "Score": Number(this.state.score3) },
            { "CompanyPersonalityAssessmentID": this.state.CompanyPersonalityAssessmentID[4], "Score": Number(this.state.score4) },
            { "CompanyPersonalityAssessmentID": this.state.CompanyPersonalityAssessmentID[5], "Score": Number(this.state.score5) },
            { "CompanyPersonalityAssessmentID": this.state.CompanyPersonalityAssessmentID[6], "Score": Number(this.state.score6) },
            { "CompanyPersonalityAssessmentID": this.state.CompanyPersonalityAssessmentID[7], "Score": Number(this.state.score7) }
        ]

        let OrganizationalData = [
            { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[0], "ValuesID": this.state.val1.ValuesID },
            { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[1], "ValuesID": this.state.val2.ValuesID },
            { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[2], "ValuesID": this.state.val3.ValuesID },
            { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[3], "ValuesID": this.state.val4.ValuesID },
            { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[4], "ValuesID": this.state.val5.ValuesID }
        ]

        try {
            let personalityRes = await API.post(`/updatePersonalityAssessments`, PersonalityData).then(res => {
                console.log(res)
                if (res.data.Result === 1) {
                    return true
                } else {
                    return false
                }
            })

            let OrganizationalRes = await API.post(`/updateOrganizationalValues`, OrganizationalData).then(res => {
                console.log(res)
                if (res.data.Result === 1) {
                    return true
                } else {
                    return false
                }
            })

            if (personalityRes && OrganizationalRes) {
                toast.success('Updated Successfully')
            } else {
                toast.error('Something went Wrong!')
            }

        } catch (err) {
            toast.error(err.message)
        }
        this.setState({loader:false})
    }

    render() {
        const { show } = this.state;
        return (
            <div className='p-3'>
                {
                    this.state.loader ? <div className='loader_overlay'>
                        <div className="custom_loader">Loading...</div>
                    </div> : null
                }
                <ToastContainer />
                <div className='container'>
                    <form className='form' onSubmit={($event) => this.handleSubmit($event)} noValidate>
                        <h2 className='heading bold mb-3'>Our Personality</h2>
                        <h4 className='mb-4'>These are the brand elements in which the entire organization is built upon.</h4>
                        <h4 className='mb-5 bold label'>Personality Assessment <span onClick={this.handleShow} ><GoLightBulb className='float-right' /></span></h4>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Feminine <span className='float-right'>Masculine</span></h4>
                            <input type="range" className='slider' value={this.state.score0} onChange={($event) => this.setState({ score0: $event.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Yourthful <span className='float-right'>Mature</span></h4>
                            <input type="range" className='slider' value={this.state.score1} onChange={($event) => this.setState({ score1: $event.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Casual <span className='float-right'>Formal</span></h4>
                            <input type="range" className='slider' value={this.state.score2} onChange={($event) => this.setState({ score2: $event.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Charming <span className='float-right'>Rugged</span></h4>
                            <input type="range" className='slider' value={this.state.score3} onChange={($event) => this.setState({ score3: $event.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Extroverted <span className='float-right'>Introverted</span></h4>
                            <input type="range" className='slider' value={this.state.score4} onChange={($event) => this.setState({ score4: $event.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Risk-Averse <span className='float-right'>Risk-Taking</span></h4>
                            <input type="range" className='slider' value={this.state.score5} onChange={($event) => this.setState({ score5: $event.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Chill <span className='float-right'>Energetic</span></h4>
                            <input type="range" className='slider' value={this.state.score6} onChange={($event) => this.setState({ score6: $event.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Serious <span className='float-right'>Funny</span></h4>
                            <input type="range" className='slider' value={this.state.score7} onChange={($event) => this.setState({ score7: $event.target.value })} />
                        </div>

                        <div className='form-group'>
                            <label className='label'>Organizational Values</label>
                            <Select placeholder='Humility' labelKey="ValuesName" valueKey="ValuesID" options={this.state.options} value={this.state.val1} onChange={(val) => this.changeHandler('val1', val)} />
                            <span className='textarea_tooltip mt-4 pt-2' onClick={this.handleShow} ><GoLightBulb /></span>
                        </div>
                        <div className='form-group'>
                            <Select placeholder='Empathy' labelKey="ValuesName" valueKey="ValuesID" options={this.state.options} value={this.state.val2} onChange={(val) => this.changeHandler('val2', val)} />
                        </div>
                        <div className='form-group'>
                            <Select placeholder='Collaboration' labelKey="ValuesName" valueKey="ValuesID" options={this.state.options} value={this.state.val3} onChange={(val) => this.changeHandler('val3', val)} />
                        </div>
                        <div className='form-group'>
                            <Select placeholder='Persistence' labelKey="ValuesName" valueKey="ValuesID" options={this.state.options} value={this.state.val4} onChange={(val) => this.changeHandler('val4', val)} />
                        </div>
                        <div className='form-group'>
                            <Select placeholder='Speed' labelKey="ValuesName" valueKey="ValuesID" options={this.state.options} value={this.state.val5} onChange={(val) => this.changeHandler('val5', val)} />
                        </div>

                        <div className='mt-3 mb-5'>
                            <button className='btn_green'>Save</button>
                            <button className='btn_white'>Cancel</button>
                        </div>
                    </form>
                </div>
                <Popup show={show} hide={this.handleClose} />
            </div>
        );
    }
}

export default personality;