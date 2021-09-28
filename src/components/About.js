import React, { useEffect, useState } from 'react';
import sanityClient from '../client'
import SocialNav from './SocialNav'
import BlockContent from "@sanity/block-content-to-react"

export default function About() {
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
        <>
            <main>
                <section>
                    <div className="container-full">
                        <div className="header-image" style={{ backgroundImage: 'url(' + singlePage.mainImage.asset.url + ')'}} alt={singlePage.title}>
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
                        <div className="header-image" style={{ backgroundImage: 'url(' + singlePage.subImage.asset.url + ')'}} alt={singlePage.title}>
                            <div className="profile-container">
                                <div className="profile">
                                    <img className="profile-pic" src={author.profileImage.asset.url} alt={author.profileAlt}/>
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
        </>
    )
}