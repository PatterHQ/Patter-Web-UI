import React, { Component } from 'react';
import './home.css'

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home_page">
                <h1>Welcome to <span className='line_through'>Rainbow Finder</span> Patter</h1>
            </div>
        )
    }
}

export default Home;
