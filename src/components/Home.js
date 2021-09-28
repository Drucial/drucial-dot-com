import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import BlockContent from "@sanity/block-content-to-react"
import sanityClient from '../client';
import SocialNav from './SocialNav'
import ScrollNav from './ScrollNav'

export default function Home() {
  const [allPostsData, setAllPosts] = useState(null);
  const [home, setHome] = useState(null);
  const mainRef = useRef();  

//   const fadeDown = useSpring({ 
//     to: { transform: 'translateY(0%)', opacity: 1 }, 
//     from: { transform: 'translateY(-50%)', opacity: 0 } 
//   })
//   const fade = useSpring({ 
//     to: { transform: 'translateY(0%)', opacity: 1 }, 
//     from: { transform: 'translateY(-10%)', opacity: 0 }, 
//     delay: 300, 
//     config: { duration: 400 }
//   })
// // 
// Section Title Offset Color
// 
  useEffect(() => {
    function setTitleColorOffset() {
      if (!mainRef.current) return;
      let descriptions = mainRef.current.querySelectorAll(".container-right");
      if(window.innerWidth <= 860) {
        return
      } else {
        for (let i = 0; i < descriptions.length; i++) {
          const title = descriptions[i].querySelector('.post-title');
          const descWidth = descriptions[i].offsetWidth
          const titleOffset = title.offsetWidth - descWidth + 30;
  
          title.style.backgroundImage = `linear-gradient(90deg, var(--color-light)${titleOffset}px, var(--color-dark)${titleOffset}px)`;
        }
      }
    }

      setTitleColorOffset()
      window.addEventListener('resize', setTitleColorOffset)
    }, [allPostsData, home])
// 
// Scroll Nav Widget Controls
// 
  useEffect(() => {
    if (!mainRef.current) return;

    if(window.innerWidth < 860) {
      return;
    } else {
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
      };

      function scrollTextUpdate() {
        isScrolling = setTimeout(() => {
          let scrollPos = main.scrollHeight - main.scrollTop - main.clientHeight;
          if(main.scrollTop === 0){
            scrollNav.classList.add("scroll-middle")
            scrollText.innerText = "Journals";
            document.querySelector(".chevron").classList.remove("top");
          }else if (scrollPos >= main.scrollHeight / sections.length) {
            scrollNav.classList.remove("scroll-middle")
            scrollText.innerText = "Next";
            document.querySelector(".chevron").classList.remove("top");
          } else {
            scrollText.innerText = "Top";
            document.querySelector(".chevron").classList.add("top");
          }
        }, 10);
      };

      scrollNav.addEventListener("click", mainScroll);
      main.addEventListener("scroll",() => {
          window.clearTimeout(isScrolling);
          scrollTextUpdate()
        },
          false
        );
    }
  }, [allPostsData, home])
// 
// Content Import
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
            }
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
    <Media query="(max-width: 860px)">
      {matches =>
        matches ? (
          <></>
        ) : (
          <>
          <SocialNav />
          <ScrollNav />
          </>
        )
      }
    </Media>
    <main ref={mainRef}>
      <section className="home-section" style={{ backgroundImage: 'url(' + home.mainImage.asset.url + ')'}}>
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
        <section className="home-section" key={index} style={{ backgroundImage: 'url(' + post.mainImage.asset.url + ')'}}>
          <div className="container-left">
            <Link to={'/' + post.slug.current} key={post.slug.current} className="post-image-link">
              <img className="mobile-image" src={post.mainImage.asset.url} alt={post.imageAlt}/>
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