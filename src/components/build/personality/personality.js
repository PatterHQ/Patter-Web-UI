import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../shared/modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

class personality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            brandData: '',
            score0: 0,
            score1: 0,
            score2: 0,
            score3: 0,
            score4: 0,
            score5: 0,
            score6: 0,
            score7: 0,
            url: 'http://ec2-34-198-96-172.compute-1.amazonaws.com//PatterService1/getCompanyBrandElement?'
        }
    }

    componentDidMount = async () => {
        try {
            await Axios.get(this.state.url + `companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=9`).then(res => {
                console.log(res)
                // let vals=[]
                res.data.CompanyBrandElementPersonalityAssessments.forEach((v, i) => {
                    let vars = `score${i}`
                    this.setState({
                        [vars]: v.PersonalityAssessment.Score
                    })
                })
                this.setState({
                    brandData: res.data,
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

    handleChange = (event) => {
        console.log(event.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data={
            score0:this.state.score0,
            score1:this.state.score1,
            score2:this.state.score2,
            score3:this.state.score3,
            score4:this.state.score4,
            score5:this.state.score5,
            score6:this.state.score6,
            score7:this.state.score7,
        }
        console.log(data)
        toast.success('successful')
        //on success '/build/personality/character'
    }


    render() {
        const { show, scores } = this.state;
        return (
            <div className=''>
                <ToastContainer />
                <h2 className='heading bold mb-3'>Part 2: Our Personality</h2>
                <h4 className='mb-3'>Congratulations! You’ve completed the first section of the Brand Assessment. Hopefully it wasn’t too diffcult.</h4>
                <h4 className='mb-5'>This next section will focus on the actions that your organization will take on a day to day basis. This is essentially the personality of your company. In good times and bad, how will you interact with your customers and stakeholders.</h4>
                <h4 className='bold mb-3 px-3'>Personality Assessment <GoLightBulb onClick={this.handleShow} className='float-right pointer' /></h4>
                <h4 className='mb-3'>This exercise is to help you think through how your company is represented. Remember that there are no wrong answers. </h4>
                <h4 className='mb-5'>(Slide the marker to the appropriate location on the spectrum)</h4>
                <form className='form' onSubmit={($event) => this.handleSubmit($event)} noValidate>
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
                    <div className='mt-3 mb-5 text-right'>
                        <NavLink to='/build/foundation/organizational' className='float-left primary back_btn'> <FaAngleLeft /> Back</NavLink>
                        <button type='submit' className='btn_green m-0'>NEXT</button>
                    </div>
                </form>
                <Popup show={show} hide={this.handleClose} />
            </div>
        );
    }
}

export default personality;