import React from 'react'
import Instagram from '../images/instagram-icon.png'
import Linkedin from '../images/linkedin-icon.png'
import Github from '../images/github-icon.png'
import Codepen from '../images/codepen-icon.png'

export default function SocialNav({ invert, row, position, transform, margin }) {
    return (
        <div className="social-nav" style={{ filter: invert, flexDirection: row, position: position, transform: transform, margin: margin }}>
            <a className="social-nav-link" href="https://www.instagram.com/drucialwhite/" target="_blank" rel="noreferrer">
                <img src={Instagram} alt='Instagram profile' className="social-nav-img" />
            </a>
            <a className="social-nav-link" href="https://www.linkedin.com/in/drew-white-23315222/" target="_blank" rel="noreferrer">
                <img src={Linkedin} alt="LinkedIn profile" className="social-nav-img" />
            </a>
            <a className="social-nav-link" href="https://github.com/Drucial" target="_blank" rel="noreferrer">
                <img src={Github} alt="GitHub profile"  className="social-nav-img"/>
            </a>
            <a className="social-nav-link" href="https://codepen.io/drucial" target="_blank" rel="noreferrer">
                <img src={Codepen} alt="CodePen profile" className="social-nav-img" />
            </a>
        </div>
    )
};
