import React, { useEffect, useState } from 'react';
import sanityClient from '../client'
import SocialNav from './SocialNav'
import BlockContent from "@sanity/block-content-to-react"

export default function About() {
    const [singlePage, setSinglePage] = useState(null)
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
    
    if (!singlePage) return <div>loading....</div>

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
                            <img className='profile-pic'src={singlePage.subImage.asset.url} alt={singlePage.imageAlt} />
                            <div className="info">
                                <h2>Drew White</h2>
                                <p>Developer \ Marketer \ Learner</p>
                            </div>
                            <div className="bio">
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
                    </div>
                </section>
            </main>
        </>
    )
}
