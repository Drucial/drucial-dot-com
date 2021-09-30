import React, { useEffect, useState, useRef } from 'react';
import sanityClient from '../client'
import BlockContent from "@sanity/block-content-to-react"


export default function Form( props ) {
    const [singlePage, setSinglePage] = useState(null)
    const formRef = useRef();
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
        if( document.contactForm.eMail.value === "" ) {
            mailRef.current.innerHTML = "Email <em style='color: #a1210d'>* Please provide your email</em>"
            document.contactForm.eMail.focus() ;
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

    const validate = (event) => {
        if( valName() === false ) {
            return;
        } 
        else if( valEmail() === false ) {
            return;
        }
        else if( valMessage() === false ) {
            return;
        } 
        handleSubmit(event)
    }

    
    const handleSubmit = (event) => {
        event.preventDefault()
        let myForm = formRef.current;
        let formData = new FormData(myForm)
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        }).then(() => props.func(true)).catch((error) =>
        alert(error))
    }

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
            <form  className="contact-form" name="contactForm" data-netlify="true">
                <h2>{singlePage.sideHeading}</h2>
                <BlockContent
                    className="contact-block"
                    blocks={singlePage.sideBar}
                    projectID="2echsd1t"
                    dataset="production"
                />
                <label ref={nameRef}htmlFor="Name">Name</label>
                <input type="text" name="Name" />
                <label ref={mailRef}htmlFor="email">Email</label>
                <input type="eMail" name="eMail" />
                <label ref={messageRef}htmlFor="Message">Message</label>
                <textarea type="text" name="Message" rows="8" />
                <div className="btn-container">
                    <button type="button" className="submit-button" onClick={validate}>Send</button>
                </div>
                <div className="contact-title">
                    <h1 className="vertical-title">{singlePage.title}</h1>
                </div>
            </form> 
        </>
    )
}

