import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sanityClient from '../client'
import BlockContent from "@sanity/block-content-to-react"
// import imageUrlBuilder from '@sanity/image-url'

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
      postNumber,
      publishedOn,
      imageAlt,
      headerAlt,
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
      body[]{
        ...,
        asset->{
          ...,
          "_key": _id
        }
      }
    }`
    )
    .then((data) => setSinglePost(data[0]))
    .catch(console.error)
  }, [slug]);
  

  if (!singlePost) return <div>loading....</div>

  return (
    <main>
      <section className='post-section'>
        <div className="container-full">
          <div className='header-image' style={{ backgroundImage: 'url(' + singlePost.headerImage.asset.url + ')'}} alt={singlePost.title}>
            <div className="title-container">
              <h1 className="single-post-title">{singlePost.title}<span className="post-number">/{singlePost.postNumber}</span></h1>
              <p className='post-date'>{(() => {
              const dateArr = singlePost.publishedOn.split('-');
              return(`${dateArr[1]}.${dateArr[2]}.${dateArr[0]}`)
            })()}</p>
            </div>
          </div>
          <div className="content-container">
            <BlockContent
              className='block-content'
              blocks={singlePost.body}
              projectID="2echsd1t"
              dataset="production"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
