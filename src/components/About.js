import React, { useEffect, useState } from 'react';
import sanityClient from '../client'
// import imageUrlBuilder from '@sanity/image-url';
import BlockContent from "@sanity/block-content-to-react"

// const builder = imageUrlBuilder(sanityClient);
// function urlFor(source) {
//   return builder.image(source)
// }

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
            body
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
                <div className="content-block">
                    <BlockContent 
                        blocks={singlePage.body}
                        projectID="2echsd1t"
                        dataset="production"
                />
                <h1 className="page-title">{singlePage.title}</h1>
                </div>
            </div>
            <div className="container-right">
                <div className="page-right">
                    <div className="profile-block">
                        <img className='profile-pic'src={singlePage.mainImage.asset.url} alt={singlePage.imageAlt} />
                        <div className="info">
                            <h2>Drew White</h2>
                            <p>Husband \ Father \ Developer \ Learner</p>
                        </div>
                    </div>
                    <div className="bio">
                        <h2>Bio:</h2>
                        <div className="fixed-container minimized">
                            <p>I grew up in the cascade mountains, 30 minutes outside of Seattle Washington in, what was then, a sleepy one traffic light town in the Snoqualmie Valley.</p>
                            <p>As a kid growing up with the outdoors literally at my doorstep, I took every opportunity to get outside and enjoy the incredible wonders of the evergreen forests. I spent an enormous amount of time biking, snowboarding, skateboarding and hiking. What more could a kid ask for?</p>
                            <p>I moved to Charlotte North Carolina in 2010 and pursue much of the same recreations as I did 20 years ago.</p>
                            <p>It is here, in Charlotte, that I developed professionally. Working for the same company for 10 years before striking out on my own, I gained a huge amount of experience in the highly technical field of composites as I rose through the ranks. From shipping coordinator, to production manger, to account manager and eventually to marketing director I received an unparalleled education in every aspect of the business.</p>
                            <p>That experience and trajectory was driven by my unrelenting thirst for knowledge, new skills and hands on experience. It is that drive that led me to start my own digital marketing agency in the middle of a pandemic, gow that business for a year before selling the business one year and one month to the day after starting it.</p>
                            <p>I started my own web dev education in that same year as I was tired of relying on traditional content management systems that always felt so limiting. My ideas always seemed bigger than the platforms allowed and I grew tired of fighting the templates.</p>
                            <p>I've been doing that my whole life out of sheer passion. Teaching myself things. Learning about subjects that maybe they teach in school, but would take you an eternity to completely grasp at the current pace of public and private institutions.</p>   
                            <p>I am at my core a hyper learner. It's who identify as and how i have carried myself thus far. I love to learn and love to do it quickly and thoroughly enough that I know for sure I have what I set out to attain.It took me years to discover this about myself, but today it is my favorite personal trait and one that has served me well through out life, and I am sure will continue to serve me as life goes on.</p>
                        </div>
                        <button className="more-button" id="bio-more" onClick={readMore}>Keep Reading &darr;</button>
                    </div>
                </div>
            </div>
        </section>
        </main>
    )
}
