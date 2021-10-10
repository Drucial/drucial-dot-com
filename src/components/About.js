import React, { useEffect, useState } from 'react';
import sanityClient from '../client'
import SocialNav from './SocialNav'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from "@sanity/block-content-to-react"

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
  return builder.image(source)
}

export default function About({ isMobile }) {
    const [singlePage, setSinglePage] = useState(null)
    const [author, setAuthor] = useState(null)
// 
// Content Import
// 
    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "about"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                _id,
                url
                }
            },
            subImage{
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
// 
// Author Import
// 
    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "drew-white"]{
            name,
            _id,
            slug,
            profileImage{
                asset->{
                _id,
                url
                }
            },
            profileAlt,
            description,
            details,
            bio,
        }`
        )
        .then((data) => setAuthor(data[0]))
        .catch(console.error)
    }, []);
    
    if (!singlePage) return ""
    if (!author) return ""

    return (
        <main>
            <section>
                <div className="container-full">
                    <div className="header-image" style={isMobile === false ? { backgroundImage: 'url(' + urlFor(singlePage.mainImage).width(1920).auto('format') + ')'} : { backgroundImage: 'url(' + urlFor(singlePage.mainImage).width(860).auto('format') + ')'}} alt={singlePage.title}>
                        <div className="title-container">
                            <h1 className="single-post-title">{singlePage.title}</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        <BlockContent 
                            className='block-content'
                            blocks={singlePage.body}
                            projectID="2echsd1t"
                            dataset="production"
                        />
                    </div>
                    <div className="header-image" style={isMobile === false ? { backgroundImage: 'url(' + urlFor(singlePage.subImage).width(1920).auto('format') + ')'} : { backgroundImage: 'url(' + urlFor(singlePage.subImage).width(860).auto('format') + ')'}} alt={singlePage.title}>
                        <div className="profile-container">
                            <div className="profile">
                                <img className="profile-pic" src={isMobile === false ? urlFor(author.profileImage).width(500).auto('format') : urlFor(author.profileImage).width(250).auto('format')} alt={author.profileAlt}/>
                                <div className="profile-details">
                                    <h2>{author.name}</h2>
                                    <p>{author.description}</p>
                                    <SocialNav  position={'static'} invert={'invert(100%)'} row={'row'} transform={'none'} margin={0} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-container about">
                        <BlockContent 
                            className='block-content'
                            blocks={author.bio}
                            projectID="2echsd1t"
                            dataset="production"
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}