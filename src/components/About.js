import React, { useEffect, useState } from 'react';
import sanityClient from '../client'
import SocialNav from './SocialNav'
import BlockContent from "@sanity/block-content-to-react"

export default function About() {
    const [singlePage, setSinglePage] = useState(null)

    const readMore = () => {
        const bio = document.querySelector('.fixed-container')
        const more = document.querySelector('#bio-more')
        if(bio.classList.contains('minimized')) {
            bio.classList.remove('minimized')
            more.innerHTML = 'Done Reading &uarr;'
        } else {
            bio.classList.add('minimized')
            more.innerHTML = 'Keep Reading &darr;'
        }
    }
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
        <section className="page-section">
            <div className="container-left page-left">
                <div className="content-block nav-margin">
                    <BlockContent 
                        className='blockContent about-block'
                        blocks={singlePage.body}
                        projectID="2echsd1t"
                        dataset="production"
                    />
                <h1 className="page-title">{singlePage.title}</h1>
                </div>
            </div>
            <div className="container-right">
                <SocialNav />
                <div className="page-right">
                    <div className="profile-block">
                        <img className='profile-pic'src={singlePage.mainImage.asset.url} alt={singlePage.imageAlt} />
                        <div className="info">
                            <h2>Drew White</h2>
                            <p>Developer \ Marketer \ Learner</p>
                        </div>
                    </div>
                    <div className="bio">
                        <h2>{singlePage.sideHeading}</h2>
                        <div className="fixed-container minimized">
                            <BlockContent 
                                blocks={singlePage.sideBar}
                                projectID="2echsd1t"
                                dataset="production"
                            />
                            </div>
                        <button className="more-button" id="bio-more" onClick={readMore}>Keep Reading &darr;</button>
                    </div>
                </div>
            </div>
        </section>
        </main>
    )
}
