import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Journal from './Journal';

const Nav = () => {
    const [showJournal, setShowJournal] = useState(false)
    
    const toggleJournal = () => {
        const journalCont = document.querySelector('.journal-container')
        if(showJournal === false) {
            setShowJournal(true)
            journalCont.classList.add('show')
        } else {
            setShowJournal(false)
            journalCont.classList.remove('show')
        }
    }

    const closeJournal = ()=> {
        const journalCont = document.querySelector('.journal-container')
        if(showJournal === false) {
            return
        } else {
            setShowJournal(false)
            journalCont.classList.remove('show')
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
                    <li className="nav-link"><button className='link-button' onClick={toggleJournal}>Journal</button></li>
                <Link to='/about' onClick={closeJournal}>
                    <li className="nav-link">About</li>
                </Link>
                <Link to='/contact' onClick={closeJournal}>
                    <li className="nav-link">Contact</li>
                </Link>
            <Journal journal={showJournal} onToggle={toggleJournal}/>
            </ul>
        </nav>
    )
}

export default Nav
