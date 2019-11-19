import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import './palette.css'
import Popup from '../../../../shared/modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import API from "../../../../shared/utils/API";


class palette extends Component {

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

    handleSubmit = async (e) => {
        e.preventDefault();
        let data = [
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
            await API.post( `updateColorPalettes`, data).then(res => {
                console.log(res.data)
                if(res.data.Result===1){
                    toast.success('Updated Successfully')
                    this.props.history.push('/build/complete')
                }
            })

        } catch (error) {
            toast.error(error.message)
        }
    }


    changeColorHandler = (col, val) => {
        this.setState({
            [col]: val
        })
    }

    changePercentageHandler = (col, old, val) => {
        let sum = Number(this.state.percentage0) + Number(this.state.percentage1) + Number(this.state.percentage2) + Number(this.state.percentage3) + Number(this.state.percentage4);
        let total = Number(sum) - Number(old) + Number(val);
        console.log(Number(sum) +' '+ Number(old) +' '+ Number(val))
        if (total <= 100) {
            this.setState({
                [col]: val
            })
        }else{
            toast.warn('Percentage Limit Exceeded')
        }
    }


    render() {
        const { show } = this.state;
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
            <div className='palette'>
                <ToastContainer />
                <h2 className='heading bold mb-3'>Color Palette</h2>
                <h4 className='mb-3'>Your use of color is critical to maintaining consistency across your brand and visual channels. These colors should represent the brand elements already described and should be used correctly in all applications.</h4>
                <h4 className='mb-5'>All entries should be in HEX value.</h4>
                <form className='form' onSubmit={($event) => this.handleSubmit($event)} noValidate>
                    <div className='form-group'>
                        <input type="color" className='form-control color' placeholder='Color #1' onChange={(e) => this.changeColorHandler('color0', e.target.value)} />
                        <input type="number" className='form-control percentage' value={this.state.percentage0} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage0', this.state.percentage0, e.target.value)} />
                        <span className='textarea_tooltip' onClick={this.handleShow} ><GoLightBulb /></span>
                    </div>
                    <div className='form-group'>
                        <input type="color" className='form-control color' value={this.state.color1} placeholder='Color #2' onChange={(e) => this.changeColorHandler('color1', e.target.value)} />
                        <input type="number" className='form-control percentage' value={this.state.percentage1} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage1', this.state.percentage1, e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <input type="color" className='form-control color' value={this.state.color2} placeholder='Color #3' onChange={(e) => this.changeColorHandler('color2', e.target.value)} />
                        <input type="number" className='form-control percentage' value={this.state.percentage2} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage2', this.state.percentage2, e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <input type="color" className='form-control color' value={this.state.color3} placeholder='Color #4' onChange={(e) => this.changeColorHandler('color3', e.target.value)} />
                        <input type="number" className='form-control percentage' value={this.state.percentage3} placeholder='%' onChange={(e) => this.changePercentageHandler('percentage3', this.state.percentage3, e.target.value)} />
                    </div>
                    <div className='form-group'>
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
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/look/palette' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <button type='submit' className='btn_green m-0'>NEXT</button>
                    </div>
                </form>
                <Popup show={show} hide={this.handleClose} />
            </div>
        );
    }
}

export default palette;