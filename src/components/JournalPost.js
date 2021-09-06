import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sanityClient from '../client'
// import imageUrlBuilder from '@sanity/image-url';
import BlockContent from "@sanity/block-content-to-react"

// const builder = imageUrlBuilder(sanityClient);
// function urlFor(source) {
//   return builder.image(source)
// }

export default function JournalPost() {
  const [singlePost, setSinglePost] = useState(null)
  const { slug } = useParams();

  useEffect(() => {
    sanityClient.fetch(`*[slug.current == '${slug}']{
      title,
      _id,
      slug,
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
      <section>
        <div className="container-left page-left">
          <img src={singlePost.headerImage.asset.url} alt="" />
          <div className="content-block">
            <BlockContent 
              blocks={singlePost.body}
              projectID="2echsd1t"
              dataset="production"
            />
          </div>
        </div>
        <div className="container-right">
          <div className="text-container">
            <h1 className="hero-title light-title">{singlePost.title}<span className="hero-post-number">/{singlePost.postNumber}</span></h1>
            <h1 className="hero-title before light-title">{singlePost.title}<span className="hero-post-number">/{singlePost.postNumber}</span></h1>
          </div>

        </div>
      </section>
    </main>
  )
}
