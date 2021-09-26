import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { animated } from "react-spring"
import sanityClient from "../client";

export default function Journal({ toggle, style }) {
  const [allPostsData, setAllPosts] = useState(null);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(postNumber desc){
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
    <animated.div className="journal-container" style={style}>
      {allPostsData &&
        allPostsData.map((post, index) => (
          <div key={index} className='journal-preview' style={{ backgroundImage: 'url(' + post.mainImage.asset.url + ')'}}>
              <Link to={"/" + post.slug.current} key={post.slug.current} onClick={toggle}>
                <div className="journal-link">
                  <p className='post-date'>{(() => {
              const dateArr = post.publishedOn.split('-');
              return(`${dateArr[1]}.${dateArr[2]}.${dateArr[0]}`)
            })()}</p>
                  <h3 className="post-preview-title"><span className='post-number'>{post.postNumber}\</span>{post.title}</h3>
                  <h3 className='post-link'>Read >></h3>
                </div>
              </Link>
            </div>
        ))}
        <div className='close-cont'></div>
        <button className="close-btn">X</button>
    </animated.div>
  );
}
