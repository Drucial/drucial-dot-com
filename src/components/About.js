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
                            {/* <img className='profile-pic'src={singlePage.mainImage.asset.url} alt={singlePage.imageAlt} /> */}
                            <div className="info">
                                <h2>Drew White</h2>
                                <p>Developer \ Marketer \ Learner</p>
                            </div>
                            <div className="bio">
                                <h2>{singlePage.sideHeading}</h2>
                                {/* <div className="fixed-container minimized">
                                    <BlockContent 
                                        blocks={singlePage.sideBar}
                                        projectID="2echsd1t"
                                        dataset="production"
                                    />
                                </div> */}
                                <button id="bio-more" onClick={readMore}>Keep Reading &darr;</button>
                            </div>
                        </div>
                        <h1 className="page-title">{singlePage.title}</h1>
                    </div>
                </section>
            </main>
        </>
    )
}
