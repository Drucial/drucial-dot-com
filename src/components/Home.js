import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SocialNav from './SocialNav'
import sanityClient from '../client';

export default function Home() {
  const [allPostsData, setAllPosts] = useState(null);
  const mainRef = useRef();  
  useEffect(() => {
    function setTitleColorOffset() {
      if (!mainRef.current) return;

      let descriptions = mainRef.current.querySelectorAll(".container-right");

      for (let i = 0; i < descriptions.length; i++) {
        const title = descriptions[i].querySelector('.post-title');
        const descWidth = descriptions[i].offsetWidth
        const titleOffset = title.offsetWidth - descWidth + 30;

        title.style.backgroundImage = `linear-gradient(90deg, var(--color-light)${titleOffset}px, var(--color-dark)${titleOffset}px)`;
      }
    }

    setTitleColorOffset()
    window.addEventListener('resize', setTitleColorOffset)
  }, [allPostsData])

  useEffect(() => {
    if (!mainRef.current) return;
    
    const scrollNav = document.querySelector(".scroll-nav");
    const main = document.querySelector("main");
    const sections = document.querySelectorAll("section");
    const scrollText = document.querySelector(".scroll-text");
    let isScrolling;

    function mainScroll() {
      let scrollPos = main.scrollHeight - main.scrollTop - main.clientHeight;
      if (scrollPos >= main.scrollHeight / sections.length) {
        main.scrollBy(0, 200);
      } else {
        main.scrollTo(0, 0);
      }
    }

    scrollNav.addEventListener("click", () => {
      mainScroll();
    });

    main.addEventListener("scroll",(event) => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          let scrollPos = main.scrollHeight - main.scrollTop - main.clientHeight;
          if (scrollPos >= main.scrollHeight / sections.length) {
            scrollText.innerText = "Next";
            document.querySelector(".chevron").classList.remove("top");
          } else {
            scrollText.innerText = "Top";
            document.querySelector(".chevron").classList.add("top");
          }
        }, 100);
      },
      false
    );
  }, [allPostsData])

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
      <div className="scroll-nav">
				<p className="scroll-text">Next</p>
				<div className="chevron"></div>
			</div>
      {allPostsData &&
      allPostsData.map((post, index) => (
        <section key={index} style={{ backgroundImage: 'url(' + post.mainImage.asset.url + ')'}}>
          <div className="container-left">
            <Link to={'/' + post.slug.current} key={post.slug.current} className="post-image-link">
              <img className="mobile-image" src={post.mainImage.asset.url} alt={post.imageAlt}/>
            </Link>
          </div>
          <div className="container-right">
            <div className="post-preview">
              <p className="post-date">{post.publishedOn}</p>
              <p className='post-desc'>{post.excerpt}</p>
              <Link to={'/' + post.slug.current} key={post.slug.current} className="post-link">
                Keep Reading >>
                </Link>
              <h2 className="post-title">{post.title}<span className="post-number">/{post.postNumber}</span></h2>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}