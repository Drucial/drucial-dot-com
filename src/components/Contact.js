import React, { useEffect, useState } from 'react';
import Form from './ContactForm';
import sanityClient from '../client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
  return builder.image(source)
}

export default function Contact({ isMobile, screenBreak }) {
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
            <section style={{ backgroundImage: 'url(' + urlFor(singlePage.mainImage).width(screenBreak).auto('format') + ')'}}>
                <div className="container-full flex-container flex-center">
                    <Form />
                </div>
            </section>
        </main>
    )
}

