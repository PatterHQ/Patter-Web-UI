import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class introduction extends Component {
    render() {
        return (
            <div className=''>
                <h2 className='heading bold mb-3'>Welcome to the Brand Assessment</h2>
                <h4>This Brand Assessment will guide you thorugh the development of the most critical elements of your brand.</h4>
                <div className='mt-3'>
                    <h4>Step 1:</h4>
                    <h4>Complete the guided assessment to the best of your ability. Keep in mind that this is just a draft so brainstorming is perfectly acceptable. The most important thing is to get your thoughts documented.</h4>
                </div>
                <div className='mt-3'>
                    <h4>Step 2:</h4>
                    <h4>Schedule your 30 minute brand review with a Patter Brand Expert. In this review session, your brand expert will help you focus in on areas that need the most attention and will help you build a plan to continue to build your brand. </h4>
                </div>
                <div className='mt-3'>
                    <h4>Step 3:</h4>
                    <h4>Complete the brand assessment and unlock the entire brand inventory to fully leverage your brand!</h4>
                </div>
                <div className='mt-3 mb-5 text-center'>
                    <h4 className='bold mb-3'>Are you ready?</h4>
                    <NavLink to='/build/foundation' className='btn_green'>GET STARTED</NavLink>
                </div>
            </div>
        );
    }
}

export default introduction;