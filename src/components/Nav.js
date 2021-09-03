import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ onToggle }) => {
    return (
        <nav>
            <div className="logo-container">
                <Link to='/' className='logo-link'>
                    <h3 className="logo">DRUCIAL</h3>
                </Link>
            </div>
            <ul className="nav-links">
                    <li className="nav-link"><button className='link-button' onClick={onToggle}>Journal</button></li>
                <Link to='/about'>
                    <li className="nav-link">About</li>
                </Link>
                <Link to='/contact'>
                    <li className="nav-link">Contact</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav
