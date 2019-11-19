import React, { Component } from 'react';
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
            percentage0: '',
            percentage1: '',
            percentage2: '',
            percentage3: '',
            percentage4: '',
            CompanyBrandElementColorPaletteID: [],
            
        }
    }

    componentDidMount = async () => {
        try {

            // get Color Palette
            await API.get( `getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=5`).then(res => {
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
                        CompanyBrandElementColorPaletteID: [...this.state.CompanyBrandElementColorPaletteID, v.CompanyBrandElementColorPaletteID]
                    })
                })
            })
        } catch (err) {
            toast.error(err.message)
        }
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
                [col]: val
            })
        } else {
            toast.warn('Percentage Limit Exceeded')
        }
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
                <div className='container'>
                    <form className='form pt-3'>
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
                            <input type="color" className='form-control color' value={this.state.color0} placeholder='Color #1' onChange={(e) => this.changeColorHandler('color0', e.target.value)} />
                            <input type="number" className='form-control percentage' value={this.state.percentage0} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage0', this.state.percentage0, e.target.value)} />
                            <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                        </div>
                        <div className='form-group flex'>
                            <input type="color" className='form-control color' value={this.state.color1} placeholder='Color #2' onChange={(e) => this.changeColorHandler('color1', e.target.value)} />
                            <input type="number" className='form-control percentage' value={this.state.percentage1} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage1', this.state.percentage1, e.target.value)} />
                        </div>
                        <div className='form-group flex'>
                            <input type="color" className='form-control color' value={this.state.color2} placeholder='Color #3' onChange={(e) => this.changeColorHandler('color2', e.target.value)} />
                            <input type="number" className='form-control percentage' value={this.state.percentage2} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage2', this.state.percentage2, e.target.value)} />
                        </div>
                        <div className='form-group flex'>
                            <input type="color" className='form-control color' value={this.state.color3} placeholder='Color #4' onChange={(e) => this.changeColorHandler('color3', e.target.value)} />
                            <input type="number" className='form-control percentage' value={this.state.percentage3} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage3', this.state.percentage3, e.target.value)} />
                        </div>
                        <div className='form-group flex'>
                            <input type="color" className='form-control color' value={this.state.color4} placeholder='Color #5' onChange={(e) => this.changeColorHandler('color4', e.target.value)} />
                            <input type="number" className='form-control percentage' value={this.state.percentage4} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage4', this.state.percentage4, e.target.value)} />
                        </div>
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
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Soft <span className='float-right'>Sharp</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Bright <span className='float-right'>Muted</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Abstract <span className='float-right'>Technical</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Relaxed <span className='float-right'>Busy</span></h4>
                            <input type="range" className='slider' />
                        </div>
                        <div className='form-group'>
                            <h4 className='bold m-0'>Classic<span className='float-right'>Modern</span></h4>
                            <input type="range" className='slider' />
                        </div>

                        <div className='mt-3 mb-5 text-right'>
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

export default look;