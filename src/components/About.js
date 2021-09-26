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
            <SocialNav />
            <main>
                <section style={{ backgroundImage: 'url(' + singlePage.mainImage.asset.url + ')'}}>
                    <div className="container-left page-left">
                        <div className="about-content">
                            <BlockContent 
                                className='block-content about-block'
                                blocks={singlePage.body}
                                projectID="2echsd1t"
                                dataset="production"
                            />
                        </div>
                    </div>
                    <div className="container-right">
                        <div className="profile">
                            <img className='profile-pic'src={singlePage.subImage.asset.url} alt={singlePage.imageAlt} />
                            <div className="info">
                                <h2>Drew White</h2>
                                <p>Developer \ Marketer \ Learner</p>
                            </div>
                            <div className="bio">
                            </div>
                        </div>
                        <h1 className="page-title">{singlePage.title}</h1>
                    </div>
                </section>
            </main>
        </>
    )
}
