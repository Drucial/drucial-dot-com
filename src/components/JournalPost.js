import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
	return builder.image(source);
}

export default function JournalPost({ screenBreak }) {
	const [singlePost, setSinglePost] = useState(null);
	const { slug } = useParams();

	function blockImageRenderer({ node }) {
		return (
			<img
				className="block-image"
				src={urlFor(node.asset.url).width(screenBreak).auto("format")}
				alt={node.attribution}
			/>
		);
	}
	const serializer = {
		types: {
			image: blockImageRenderer,
		},
	};

	useEffect(() => {
		sanityClient
			.fetch(
				`*[slug.current == '${slug}']{
      title,
      _id,
      slug,
      postNumber,
      publishedOn,
      excerpt,
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
        },
        attribution,
      },
      body[]{
        ...,
        asset->{
          ...,
          "_key": _id,
          attribution,
          caption,
        }
      }
    }`
			)
			.then((data) => setSinglePost(data[0]))
			.catch(console.error);
	}, [slug]);

	if (!singlePost) return "";

	return (
		<main>
			<Helmet>
				<meta name="description" content={singlePost.excerpt} />
				<meta property="og:title" content={"Drucial | " + singlePost.title} />
				<meta property="og:description" content={singlePost.excerpt} />
				<meta
					property="og:image"
					content={urlFor(singlePost.mainImage).width(512)}
				/>
				<meta property="og:url" content={"https://www.drucial.com/" + slug} />
				<title>Drucial | {singlePost.title}</title>
			</Helmet>
			<section className="post-section">
				<div className="container-full">
					<div
						className="header-image"
						style={{
							backgroundImage:
								"url(" +
								urlFor(singlePost.headerImage)
									.width(screenBreak)
									.auto("format") +
								")",
						}}
						aria-label={singlePost.mainImage.attribution}
						role="img"
					>
						<div className="title-container">
							<h1 className="single-post-title">
								{singlePost.title}
								<span className="post-number">/{singlePost.postNumber}</span>
							</h1>
							<p className="post-date">
								{(() => {
									const dateArr = singlePost.publishedOn.split("-");
									return `${dateArr[1]}.${dateArr[2]}.${dateArr[0]}`;
								})()}
							</p>
						</div>
					</div>
					<div className="content-container">
						<BlockContent
							className="block-content"
							blocks={singlePost.body}
							serializers={serializer}
							projectID="2echsd1t"
							dataset="production"
						/>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	);
}
