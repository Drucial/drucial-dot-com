import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Journal from './Journal';

const Nav = () => {
    const [showJournal, setShowJournal] = useState(false)

    const handleJournal = () => {
        if(showJournal === false) {
            setShowJournal(true);
            setTimeout(() => {
                const journal = document.querySelector('.journal-container')
                journal.classList.add('show')
            }, 50)
        } else {
            const journal = document.querySelector('.journal-container')
            journal.classList.remove('show');
            setTimeout(() => {
                setShowJournal(false)
            }, 300)
        }

    }
    // const toggleJournal = () => {
    //     showJournal === false ? setShowJournal(true): setTimeout(() => {
    //         setShowJournal(false)
    //     }, 200)
    // }
    const closeJournal = () => {
        if(showJournal === true) {
            const journal = document.querySelector('.journal-container')
            journal.classList.remove('show');
            setTimeout(() => {
                setShowJournal(false)
            }, 300)
        }
    }
    return (
        <nav>
            <div className="logo-container">
                <Link to='/' className='logo-link' onClick={closeJournal}>
                    <h3 className="logo">DRUCIAL</h3>
                </Link>
            </div>
            <ul className="nav-links">
                <button className='link-button' onClick={handleJournal}>
                    <li className="nav-link">Journal</li></button>
                <Link to='/about' >
                    <li className="nav-link" onClick={closeJournal}>About</li>
                </Link>
                <Link to='/contact'>
                    <li className="nav-link" onClick={closeJournal}>Contact</li>
                </Link>
                {showJournal === true ? <Journal journal={showJournal} onToggle={handleJournal}/> : null}
            </ul>
        </nav>
    )
}

export default Nav
