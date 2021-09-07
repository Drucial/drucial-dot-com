import React, { useEffect, useState } from 'react';
import sanityClient from '../client'
import SocialNav from './SocialNav'
import BlockContent from "@sanity/block-content-to-react"

export default function About() {
    const [singlePage, setSinglePage] = useState(null)

    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "contact"]{
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
    
    if (!singlePage) return <div>loading....</div>

    return (
        <main>
            <section style={{ backgroundImage: 'url(' + singlePage.mainImage.asset.url + ')'}}>
                <div className="container-left form-wrapper">
                    <form className="contact-form" action="">
                        <div className="form-header">
                            <h2>{singlePage.sideHeading}</h2>
                            <BlockContent
                                blocks={singlePage.sideBar}
                                projectID="2echsd1t"
                                dataset="production"
                            />
                        </div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" />
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" />
                        <label htmlFor="message">Message</label>
                        <textarea type="text" name="message" rows="8" />
                        <div className="btn-container">
                            <button className="submit-button" >Send</button>
                        </div>
                    </form>
                </div>
                <div className="container-right post-right">
                    <SocialNav />
                    <div className="text-container light-title post-title-mobile">
                        <h1 className="hero-title vertical">{singlePage.title}</h1>
                    </div>
                </div>
            </section>
        </main>
    )
}

