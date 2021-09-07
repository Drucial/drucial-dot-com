import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SocialNav from './SocialNav'
import sanityClient from '../client';

export default function Home() {
  const [allPostsData, setAllPosts] = useState(null);
  // const [dimensions, setDimensions] = useState(null)
  const mainRef = useRef();  
  useEffect(() => {
    function update() {
      if (!mainRef.current) return;
      
      let descriptions = mainRef.current.querySelectorAll('.container-right');
      
      for (let i = 0; i < descriptions.length; i++) {
        const before = descriptions[i].querySelector('.before');
        const beforeWidth = before.offsetWidth
        const descWidth = descriptions[i].offsetWidth
        let width = 1 - (descWidth / beforeWidth)
        before.style.width = width * 100 + '%'
      }
    }
    update();
  }, [allPostsData]);

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
            }
          }
        }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);
  return (
    <main ref={mainRef}>
      <SocialNav />
      {allPostsData &&
      allPostsData.map((post, index) => (
        <section key={index} style={{ backgroundImage: 'url(' + post.mainImage.asset.url + ')'}}>
          <div className="container-left">
            <Link to={'/' + post.slug.current} key={post.slug.current} className="hero-image-link">
              <img className="hero-image" src={post.mainImage.asset.url} alt={post.imageAlt} />
              <div className="mobile-title">
                <h1 className="hero-title header-title">{post.title}<span className="hero-post-number">/{post.postNumber}</span></h1>
            </div>
            </Link>
          </div>
          <div className="container-right">
            <div className="post-description">
              <p className="post-date">{post.publishedOn}</p>
              <p className='post-excerpt'>{post.excerpt}</p>
              <Link to={'/' + post.slug.current} key={post.slug.current} className="post-link">
                <p>Keep Reading >></p>
                </Link>
            </div>
            <div className="text-container">
              <h1 className="hero-title">{post.title}<span className="hero-post-number">/{post.postNumber}</span></h1>
              <h1 className="hero-title before">{post.title}<span className="hero-post-number">/{post.postNumber}</span>
              </h1>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}