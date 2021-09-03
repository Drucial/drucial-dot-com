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
      <article>
        <header>
          <div>
            <div>
              <h1>{singlePost.title}</h1>
              {/* <img src="{}" alt="" /> */}
              <p>Drew White</p>
              <BlockContent 
                blocks={singlePost.body}
                projectID="2echsd1t"
                dataset="production"
              />
            </div>
          </div>
        </header>
      </article>
    </main>
  )
}
