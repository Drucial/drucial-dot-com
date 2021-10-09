import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition, animated } from 'react-spring'
import Journal from './Journal';

const Nav = ({ isMobile }) => {
    const [showJournal, setShowJournal] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const menuToggle = () => {
        showNav === false ? setShowNav(true) : setShowNav(false)
    };
    const closeNav = () => {
        if(showNav === false) {
            return
        } else {
            setShowNav(false)
        }
    };
    const journalToggle = () => {
        showJournal === false ? setShowJournal(true) : setShowJournal(false);
    };
    const closeJournal = () => {
        if(showJournal === false){
            return
        } else {
            setShowJournal(false)
        }
    };

    return (
        <nav onClick={closeJournal}>
            <div className="logo-container">
                <Link to='/' className='logo-link' onClick={closeNav}>
                    <h3 className="logo">DRUCIAL</h3>
                </Link>
                {isMobile === true ? 
                    <div className="hamburger" onClick={menuToggle}></div>
                : <></>}
            </div>
            {isMobile === true ?
                <Transition
                    items={showNav}
                    from={{ transform: 'translateY(-100%)' }}
                    enter={{ transform: 'translateY(0%)' }}
                    leave={{ transform: 'translateY(-100%)' }}
                >
                    {(styles, item) =>
                    item && 
                    <animated.ul className="nav-links" style={styles}>
                        <button className='link-button' onClick={journalToggle}>
                            <li className="nav-link">Journal</li></button>
                        <Link to='/about' onClick={closeNav}>
                            <li className="nav-link">About</li>
                        </Link>
                        <Link to='/contact' onClick={closeNav}>
                            <li className="nav-link">Contact</li>
                        </Link>
                        <Transition
                            items={showJournal}
                            from={{ opacity: 1, transform: 'translateX(100%)' }}
                            enter={{ opacity: 1, transform: 'translateX(0%)' }}
                            leave={{ opacity: 1, transform: 'translateX(100%)' }}
                        >
                            {(styles, item) =>
                            item && <Journal style={styles} toggle={closeNav}/>
                            }
                        </Transition>
                    </animated.ul>
                    }
                </Transition>
            :
                <ul className="nav-links">
                    <button className='link-button' onClick={journalToggle}>
                        <li className="nav-link">Journal</li></button>
                    <Link to='/about'>
                        <li className="nav-link">About</li>
                    </Link>
                    <Link to='/contact'>
                        <li className="nav-link">Contact</li>
                    </Link>
                    <Transition
                        items={showJournal}
                        from={{ opacity: 0, transform: 'translateX(100%)' }}
                        enter={{ opacity: 1, transform: 'translateX(0%)' }}
                        leave={{ opacity: 0, transform: 'translateX(100%)' }}
                    >
                        {(styles, item) =>
                        item && <Journal style={styles}/>
                        }
                    </Transition>
                </ul>
            }
        </nav>
    )
}

export default Nav
