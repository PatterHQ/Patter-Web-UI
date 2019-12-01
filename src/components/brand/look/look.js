import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { GoLightBulb } from "react-icons/go";
import './look.css'
import Popup from '../../../shared/modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import API from "../../../shared/utils/API";

class look extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            palette: null,
            color0: '#fdffff',
            color1: '#fdffff',
            color2: '#fdffff',
            color3: '#fdffff',
            color4: '#fdffff',
            error0: false,
            error1: false,
            error2: false,
            error3: false,
            error4: false,
            percentage0: '',
            percentage1: '',
            percentage2: '',
            percentage3: '',
            percentage4: '',
            CompanyBrandElementColorPaletteID: [],

            styleAssessmentID: [],
            style0: { Score: 0 },
            style1: { Score: 0 },
            style2: { Score: 0 },
            style3: { Score: 0 },
            style4: { Score: 0 },
            style5: { Score: 0 },

            error: '',
            loader: false,

            title: '',
            desc: '',

        }
    }

    componentDidMount = async () => {
        this.setState({ loader: true })
        try {

            // get Color Palette
            await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=5`).then(res => {
                this.setState({ palette: res.data })

                res.data.CompanyBrandElementColorPalette.forEach((v, i) => {
                    let color = `color${i}`
                    let percentage = `percentage${i}`
                    let colVal = '#ffffff'
                    if (v.ColorValue !== '') {
                        colVal = v.ColorValue
                    }
                    this.setState({
                        [color]: colVal,
                        [percentage]: v.Percentage,
                        title: res.data.BrandElement.BrandElementName,
                        desc: res.data.BrandElement.BrandElementDescription,
                        CompanyBrandElementColorPaletteID: [...this.state.CompanyBrandElementColorPaletteID, v.CompanyBrandElementColorPaletteID]
                    })
                })
            })

            // get style accessment
            await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=7`).then(res => {
                console.log(res)
                res.data.CompanyBrandElementStyleAssessments.forEach((v, i) => {
                    let vars = `style${i}`
                    this.setState({
                        [vars]: v.StyleAssessment.Score,
                        styleAssessmentID: [...this.state.styleAssessmentID, v.CompanyBrandElementStyleAssessmentsID]
                    })
                })
                console.log(this.state)
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

    changeColorHandler = (col, val) => {
        this.setState({
            [col]: val
        })
    }

    changePercentageHandler = (col, old, val) => {
        let sum = Number(this.state.percentage0) + Number(this.state.percentage1) + Number(this.state.percentage2) + Number(this.state.percentage3) + Number(this.state.percentage4);
        let total = Number(sum) - Number(old) + Number(val);
        console.log(Number(sum) + ' ' + Number(old) + ' ' + Number(val))
        if (total <= 100) {
            this.setState({
                error: '',
                [col]: val
            })
        } else {
            this.setState({
                error: 'Percentage Limit Exceeded',
            })
        }
    }

    checkColor = () => {
        let { color0, color1, color2, color3, color4, error0, error1, error2, error3, error4 } = this.state
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(color0)) { this.setState({ error0: true }) } else { this.setState({ error0: false }) }
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(color1)) { this.setState({ error1: true }) } else { this.setState({ error1: false }) }
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(color2)) { this.setState({ error2: true }) } else { this.setState({ error2: false }) }
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(color3)) { this.setState({ error3: true }) } else { this.setState({ error3: false }) }
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(color4)) { this.setState({ error4: true }) } else { this.setState({ error4: false }) }

    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loader: true })
        let { color0, color1, color2, color3, color4, error0, error1, error2, error3, error4 } = this.state

        this.checkColor()

            let styleData = [
                { "CompanyStyleAssessmentID": this.state.styleAssessmentID[0], "Score": this.state.style0 },
                { "CompanyStyleAssessmentID": this.state.styleAssessmentID[1], "Score": this.state.style1 },
                { "CompanyStyleAssessmentID": this.state.styleAssessmentID[2], "Score": this.state.style2 },
                { "CompanyStyleAssessmentID": this.state.styleAssessmentID[3], "Score": this.state.style3 },
                { "CompanyStyleAssessmentID": this.state.styleAssessmentID[4], "Score": this.state.style4 },
                { "CompanyStyleAssessmentID": this.state.styleAssessmentID[5], "Score": this.state.style5 }
            ]

            let ColorData = [
                {
                    "CompanyColorPaletteID": this.state.CompanyBrandElementColorPaletteID[0],
                    "ColorValue": this.state.color0,
                    "Percentage": this.state.percentage0
                },
                {
                    "CompanyColorPaletteID": this.state.CompanyBrandElementColorPaletteID[1],
                    "ColorValue": this.state.color1,
                    "Percentage": this.state.percentage1
                },
                {
                    "CompanyColorPaletteID": this.state.CompanyBrandElementColorPaletteID[2],
                    "ColorValue": this.state.color2,
                    "Percentage": this.state.percentage2
                },
                {
                    "CompanyColorPaletteID": this.state.CompanyBrandElementColorPaletteID[3],
                    "ColorValue": this.state.color3,
                    "Percentage": this.state.percentage3
                },
                {
                    "CompanyColorPaletteID": this.state.CompanyBrandElementColorPaletteID[4],
                    "ColorValue": this.state.color4,
                    "Percentage": this.state.percentage4
                }
            ]


            try {
                await API.post('updateStyleAssessments', styleData).then(res => {
                    console.log(res)
                    if (res.data.Result === 1) {
                        console.log('Style Updated')
                    }
                })

                await API.post(`updateColorPalettes`, ColorData).then(rest => {
                    console.log(rest.data)
                    if (rest.data.Result === 1) {
                        console.log('Color Updated')
                    }
                })

            } catch (error) {
                console.log(error)
            }
        

        this.setState({ loader: false })

    }

    render() {
        const { show } = this.state;
        let style = { background: 'url(/images/brand-logo.png) no-repeat', backgroundSize: 'cover' }
        let color_1 = {
            backgroundColor: this.state.color0,
            width: this.state.percentage0 + '%'
        }
        let color_2 = {
            backgroundColor: this.state.color1,
            width: this.state.percentage1 + '%'
        }
        let color_3 = {
            backgroundColor: this.state.color2,
            width: this.state.percentage2 + '%'
        }
        let color_4 = {
            backgroundColor: this.state.color3,
            width: this.state.percentage3 + '%'
        }
        let color_5 = {
            backgroundColor: this.state.color4,
            width: this.state.percentage4 + '%'
        }
        return (
            <div className='look p-3'>
                {
                    this.state.loader ? <div className='loader_overlay'>
                        <div className="custom_loader">Loading...</div>
                    </div> : null
                }
                <div className='container'>
                    <form className='form pt-3' onSubmit={($event) => this.handleSubmit($event)} noValidate>
                        <h2 className='heading bold mb-3'>Our Look</h2>
                        <h4 className='mb-4'>These are the brand elements in which the entire organization is built upon.</h4>
                        <h4 className='bold mb-3 px-3'>Logo</h4>
                        <h4 className='mb-5'>Your logo is very often the first interaction a customer or stakeholder will have with your brand. It should be representative of every other aspect of your brand.</h4>
                        <button className='btn_green btn_upload mb-3'>UPLOAD LOGO</button>
                        <div className='form-group mb-5'>
                            <div className='tag_container' style={style}></div>
                        </div>
                        <label className='label mb-3'>Color Palette</label>
                        <div className='form-group flex'>
                            <input type="text" className='form-control' value={this.state.color0} placeholder='Color #1' onChange={(e) => this.setState({ color0: e.target.value })} />
                            <input type="number" className='form-control percentage' value={this.state.percentage0} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage0', this.state.percentage0, e.target.value)} />
                            <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                            {
                                this.state.error0 ? <label className='error'>Not a valid HEX Code</label> : null
                            }
                        </div>
                        <div className='form-group flex'>
                            <input type="text" className='form-control' value={this.state.color1} placeholder='Color #2' onChange={(e) => this.changeColorHandler('color1', e.target.value)} />
                            <input type="number" className='form-control percentage' value={this.state.percentage1} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage1', this.state.percentage1, e.target.value)} />
                            {
                                this.state.error1 ? <label className='error'>Not a valid HEX Code</label> : null
                            }
                        </div>
                        <div className='form-group flex'>
                            <input type="text" className='form-control' value={this.state.color2} placeholder='Color #3' onChange={(e) => this.changeColorHandler('color2', e.target.value)} />
                            <input type="number" className='form-control percentage' value={this.state.percentage2} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage2', this.state.percentage2, e.target.value)} />
                            {
                                this.state.error2 ? <label className='error'>Not a valid HEX Code</label> : null
                            }
                        </div>
                        <div className='form-group flex'>
                            <input type="text" className='form-control' value={this.state.color3} placeholder='Color #4' onChange={(e) => this.changeColorHandler('color3', e.target.value)} />
                            <input type="number" className='form-control percentage' value={this.state.percentage3} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage3', this.state.percentage3, e.target.value)} />
                            {
                                this.state.error3 ? <label className='error'>Not a valid HEX Code</label> : null
                            }
                        </div>
                        <div className='form-group flex'>
                            <input type="text" className='form-control' value={this.state.color4} placeholder='Color #5' onChange={(e) => this.changeColorHandler('color4', e.target.value)} />
                            <input type="number" className='form-control percentage' value={this.state.percentage4} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage4', this.state.percentage4, e.target.value)} />
                            {
                                this.state.error4 ? <label className='error'>Not a valid HEX Code</label> : null
                            }
                        </div>
                        {
                            this.state.error !== '' ? <p className='alert alert-danger'>{this.state.error}</p> : null
                        }
                        <div className='form-group flex mb-5'>
                            <div className='color_palette'>
                                <span className='color_1' style={color_1}></span>
                                <span className='color_2' style={color_2}></span>
                                <span className='color_3' style={color_3}></span>
                                <span className='color_4' style={color_4}></span>
                                <span className='color_5' style={color_5}></span>
                            </div>
                        </div>
                        <label className='label bold mb-3'>Style Assessment</label>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Subtle <span className='float-right'>Bold</span></h4>
                            <input type="range" value={this.state.style0} className='slider' onChange={(e) => this.setState({ style0: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Soft <span className='float-right'>Sharp</span></h4>
                            <input type="range" value={this.state.style1} className='slider' onChange={(e) => this.setState({ style1: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Bright <span className='float-right'>Muted</span></h4>
                            <input type="range" value={this.state.style2} className='slider' onChange={(e) => this.setState({ style2: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Abstract <span className='float-right'>Technical</span></h4>
                            <input type="range" value={this.state.style3} className='slider' onChange={(e) => this.setState({ style3: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Relaxed <span className='float-right'>Busy</span></h4>
                            <input type="range" value={this.state.style4} className='slider' onChange={(e) => this.setState({ style4: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Classic<span className='float-right'>Modern</span></h4>
                            <input type="range" value={this.state.style5} className='slider' onChange={(e) => this.setState({ style5: e.target.value })} />
                        </div>

                        <div className='mt-3 mb-5 text-right'>
                            <button className='btn_green'>Save</button>
                            <button type="button" className='btn_white'>Cancel</button>                        </div>
                    </form>
                </div>
                <Popup show={show} title={this.state.title} desc={this.state.desc} hide={this.handleClose} />
            </div>
        );
    }
}

export default look;