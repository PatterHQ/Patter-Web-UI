import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../shared/modal/modal';

class personality extends Component {
    constructor(props) {
        super(props);
        this.state={
            show: false, 
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
    
    render() {
        const {show} = this.state;
        return (
            <div className=''>
                <h2 className='heading bold mb-3'>Part 2: Our Personality</h2>
                <h4 className='mb-3'>Congratulations! You’ve completed the first section of the Brand Assessment. Hopefully it wasn’t too diffcult.</h4>
                <h4 className='mb-5'>This next section will focus on the actions that your organization will take on a day to day basis. This is essentially the personality of your company. In good times and bad, how will you interact with your customers and stakeholders.</h4>
                <h4 className='bold mb-3 px-3'>Personality Assessment <GoLightBulb onClick={this.handleShow} className='float-right pointer' /></h4>
                <h4 className='mb-3'>This exercise is to help you think through how your company is represented. Remember that there are no wrong answers. </h4>
                <h4 className='mb-5'>(Slide the marker to the appropriate location on the spectrum)</h4>
                <form className='form'>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Feminine <span className='float-right'>Masculine</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Yourthful <span className='float-right'>Mature</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Casual <span className='float-right'>Formal</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Charming <span className='float-right'>Rugged</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Extroverted <span className='float-right'>Introverted</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Risk-Averse <span className='float-right'>Risk-Taking</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Chill <span className='float-right'>Energetic</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='form-group'>
                        <h4 className='bold m-0'>Serious <span className='float-right'>Funny</span></h4>
                        <input type="range" className='slider' />
                    </div>
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/foundation/organizational' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <NavLink to='/build/personality/character' className='btn_green m-0'>NEXT</NavLink>
                    </div>
                </form>
                <Popup show={show} hide={this.handleClose}/>
            </div>
        );
    }
}

export default personality;