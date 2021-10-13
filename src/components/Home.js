import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import SocialNav from './SocialNav'
import ScrollNav from './ScrollNav'
import sanityClient from '../client';
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from "@sanity/block-content-to-react"

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
  return builder.image(source)
}

export default function Home({ isMobile, screenBreak }) {
  const [allPostsData, setAllPosts] = useState(null);
  const [home, setHome] = useState(null);
  const mainRef = useRef();
// 
// Set Title Color Offset
// 
  useLayoutEffect(() => {
    function setTitleColorOffset() {
      if (!mainRef.current) return;
      if(isMobile === true) {
        return
      } else {
        let descriptions = mainRef.current.querySelectorAll(".container-right");
        for (let i = 0; i < descriptions.length; i++) {
          const title = descriptions[i].querySelector('.post-title');
          const descWidth = descriptions[i].offsetWidth
          const titleOffset = title.offsetWidth - descWidth + 30;
  
          title.style.backgroundImage = `linear-gradient(90deg, var(--color-light)${titleOffset}px, var(--color-dark)${titleOffset}px)`;
        }
      }
    };
    setTitleColorOffset();
    window.addEventListener('resize', setTitleColorOffset);
    return function cleanupListener() {
      window.removeEventListener('resize', setTitleColorOffset)
    };
  }, [allPostsData, home, isMobile]);
// 
// Fetch Client Data
// 
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(postNumber desc)
        {
          title,
          postNumber,
          excerpt,
          slug,
          publishedOn,
          imageAlt,
          mainImage{
            asset->{
            _id,
            url
            },
            attribution,
          }
        }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    sanityClient.fetch(`*[slug.current == "welcome"]{
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
    .then((data) => setHome(data[0]))
    .catch(console.error)
  }, []);

  if (!allPostsData) return ""
  if (!home) return ""

  return (
    <>
    <Helmet>
      <meta
        name="description"
        content="A digital journal covering the verities of my life, experiences, hobbies and passions."
      />
      <meta property="og:title" content="Drucial | Verities of Life" />
      <meta
        property="og:description"
        content="A digital journal covering the verities of my life, experiences, hobbies and passions."
      />
      <meta
        property="og:image"
        content="https://www.drucial.com/thumbnail.jpg"
      />
      <meta
        property="og:url"
        content="https://www.drucial.com/"
      />
      <title>Drucial | Verities of Life</title>
    </Helmet>
    {isMobile === false ? <><ScrollNav /><SocialNav /></> : <></>}
    <main ref={mainRef}>
      <section className="home-section" style={{ backgroundImage: 'url(' + urlFor(home.mainImage).width(screenBreak).auto('format').fit('min') + ')'}}>
        <div className="container-full home-container">
          <div className="flex-container flex-center flex-full flex-column">
            <BlockContent
              className='home-block'
              blocks={home.body}
              projectID="2echsd1t"
              dataset="production"
            />
          </div>
        </div>
      </section>
      {allPostsData &&
      allPostsData.map((post, index) => (
        <section 
          className="home-section" 
          key={index} 
          style={isMobile === false ? { backgroundImage: 'url(' + urlFor(post.mainImage).width(1920).auto('format').fit('min') + ')'} : { backgroundImage: "none"}}
          aria-label={isMobile === false ? post.mainImage.attribution : ""}
          role={isMobile === false ? 'img' : ''}
        >
          <div className="container-left">
            <Link to={'/' + post.slug.current} key={post.slug.current} className="post-image-link">
            {isMobile === false ? <></> : <img className="main-image" src={urlFor(post.mainImage).width(860).auto('format').fit('min').url()} alt={post.mainImage.attribution}/>}
            </Link>
          </div>
          <div className="container-right">
            <div className="post-preview">
              <p className="post-date">{(() => {
              const dateArr = post.publishedOn.split('-');
              return(`${dateArr[1]}.${dateArr[2]}.${dateArr[0]}`)
            })()}</p>
              <p className='post-desc'>{post.excerpt}</p>
              <Link to={'/' + post.slug.current} key={post.slug.current} className="post-link">
                Keep Reading &gt;&gt;
                </Link>
              <h2 className="post-title">{post.title}<span className="post-number">/{post.postNumber}</span></h2>
            </div>
          </div>
        </section>
      ))}
    </main>
    </>
  );
}