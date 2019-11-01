import React from 'react'
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    return (
        <div className='sidebar sidebar_list'>
            <ul>
                <li><NavLink to={'/build'}>Brand Assessment</NavLink ></li>
                <li><NavLink to={'/brand'}>Our Brand</NavLink ></li>
            </ul>
        </div>
    )
}

export default Sidebar;