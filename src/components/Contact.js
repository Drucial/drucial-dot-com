import React, { useEffect, useState } from 'react';
import Form from './Form';
import sanityClient from '../client'


export default function Contact() {
    const [singlePage, setSinglePage] = useState(null)
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
        <main>
            <section style={{ backgroundImage: 'url(' + singlePage.mainImage.asset.url + ')'}}>
                <div className="container-full flex-container flex-center">
                    {window.location.pathname === '/contact/thanks' ? 
                        <div className="confirmation">
                            <h2>Thanks for Writing Me!</h2>
                            <p>I'll be in touch</p>
                        </div>
                        : <Form />
                    }
                </div>
            </section>
        </main>
    )
}

