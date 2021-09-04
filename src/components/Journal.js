import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client";

export default function Journal({ onToggle }) {
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
    <div className="journal-container">
      {allPostsData &&
        allPostsData.map((post, index) => (
          <div key={index} className='post-preview'>
              <Link to={"/" + post.slug.current} key={post.slug.current} className='post-link'>
                <p className='post-date'>{post.publishedOn}</p>
                <h3 className="post-preview-title"><span className='post-number'>{post.postNumber}\</span>{post.title}</h3>
                <h3 className='post-more'>Read >></h3>
              </Link>
            </div>
        ))}
        <div className='close-btn'><button className="link-button" onClick={onToggle}>X</button></div>
    </div>
  );
}
