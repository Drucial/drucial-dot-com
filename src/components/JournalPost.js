import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sanityClient from '../client'
import SocialNav from './SocialNav'
import BlockContent from "@sanity/block-content-to-react"

export default function JournalPost() {
  const [singlePost, setSinglePost] = useState(null)
  const { slug } = useParams();

  useEffect(() => {
    sanityClient.fetch(`*[slug.current == '${slug}']{
      title,
      _id,
      slug,
      postNumber,
      headerImage{
        asset->{
          _id,
          url
        }
      },
      mainImage{
        asset->{
          _id,
          url
        }
      },
      body
    }`
    )
    .then((data) => setSinglePost(data[0]))
    .catch(console.error)
  }, [slug]);

  if (!singlePost) return <div>loading....</div>

  return (
    <main>
      <section className='post-section'>
        <div className="container-left post-content">
          <div className="header-container">
            <img className='header-image' src={singlePost.headerImage.asset.url} alt={singlePost.title} />
            <div className="mobile-title">
              <h1 className="hero-title header-title">{singlePost.title}<span className="hero-post-number">/{singlePost.postNumber}</span></h1>
            </div>
          </div>
          <div className="content-container post-margin">
            <div className="content-block">
              <BlockContent
                className='blockContent'
                blocks={singlePost.body}
                projectID="2echsd1t"
                dataset="production"
              />
            </div>
          </div>
        </div>
        <div className="container-right post-right">
          <SocialNav />
          <div className="text-container light-title post-title-mobile">
            <h1 className="hero-title vertical">{singlePost.title}<span className="hero-post-number">/{singlePost.postNumber}</span></h1>
          </div>
        </div>
      </section>
    </main>
  )
}
