import React, { useEffect, useState, useRef } from 'react';
import SocialNav from './SocialNav'
import sanityClient from '../client'
import BlockContent from "@sanity/block-content-to-react"

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

export default function Form() {
    const [singlePage, setSinglePage] = useState(null);
    const [newForm, setNewForm] = useState(null);
    const [success, setSuccess] = useState(false)
    const { Name, Email, Message } = {}
    const nameRef = useRef();
    const mailRef = useRef();
    const messageRef = useRef();
// 
// Form Validation
// 
    const valName = () => {
        if( document.contactForm.Name.value === "" ) {
            nameRef.current.innerHTML = "Name <em style='color: #a1210d'>* Please provide your name</em>"
            document.contactForm.Name.focus() ;
            return false;
         } else {
            nameRef.current.innerHTML = 'Name'
         }
         return( true )
    } 
    const valEmail = () => {
        if( document.contactForm.Email.value === "" ) {
            mailRef.current.innerHTML = "Email <em style='color: #a1210d'>* Please provide your email</em>"
            document.contactForm.Email.focus() ;
            return false;
        } else {
            mailRef.current.innerHTML = 'Email'
        }
        return( true )
    }
    const valMessage = () => {
        if( document.contactForm.Message.value === "" ) {
            messageRef.current.innerHTML = "Message <em style='color: #a1210d'>* Please include a message</em>"
            document.contactForm.Message.focus() ;
            return false;
        } else {
            messageRef.current.innerHTML = 'Message'
        }
        return( true )
    }
// 
//  Submission Handler
// 

    const validate = () => {
        if( valName() === false ) {
            return;
        } 
        else if( valEmail() === false ) {
            return;
        }
        else if( valMessage() === false ) {
            return;
        }
        handleSubmit()
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setNewForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "Contact Form", ...newForm })
        })
          .then(() => setSuccess(true))
          .catch(error => alert(error));
    };
    
    useEffect(() => {
        sanityClient.fetch(`*[slug.current == 'contact']{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                _id,
                url
                }
            },
            body,
            sideHeading,
            sideBar,
        }`
        )
        .then((data) => setSinglePage(data[0]))
        .catch(console.error)
    }, []);
    
    if (!singlePage) return ""

    return (
        <>
        {success === false ?
            <form  className="contact-form" name="contactForm" method="POST" action="/thanks">
                <h2>{singlePage.sideHeading}</h2>
                <BlockContent
                    className="contact-block"
                    blocks={singlePage.sideBar}
                    projectID="2echsd1t"
                    dataset="production"
                />
                <SocialNav  position={'static'} invert={'invert(100%)'} row={'row'} transform={'none'} margin={0} justify={'space-around'}/>
                <input type="hidden" name="form-name" value="Contact Form" />
                <label ref={nameRef} htmlFor="Name">Name</label>
                <input type="text" name="Name" value={Name} onChange={handleChange}/>
                <label ref={mailRef}htmlFor="Email">Email</label>
                <input type="email" name="Email" value={Email} onChange={handleChange}/>
                <label ref={messageRef}htmlFor="Message">Message</label>
                <textarea type="text" name="Message" rows="6" value={Message} onChange={handleChange}/>
                <div className="btn-container">
                    <button type="button" className="submit-button" onClick={validate}>Send</button>
                </div>
                <div className="contact-title">
                    <h1 className="vertical-title">{singlePage.title}</h1>
                </div>
            </form> 
            : 
            <div className="confirmation">
                <h2>Thanks for Writing Me!</h2>
                <p>I'll be in touch</p>
            </div>
        }
        </>
    )
}

