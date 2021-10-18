import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import sanityClient from "../client";
import SocialNav from "./SocialNav";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
	return builder.image(source);
}

export default function About({ isMobile, screenBreak }) {
	const [singlePage, setSinglePage] = useState(null);
	const [author, setAuthor] = useState(null);
	//
	// Content Import
	//
	useEffect(() => {
		sanityClient
			.fetch(
				`*[slug.current == "about"]{
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
			.then((data) => setSinglePage(data[0]))
			.catch(console.error);
	}, []);
	//
	// Author Import
	//
	useEffect(() => {
		sanityClient
			.fetch(
				`*[slug.current == "drew-white"]{
            name,
            _id,
            slug,
            profileImage{
                asset->{
                _id,
                url
                },
                attribution
            },
            profileAlt,
            description,
            details,
            bio,
        }`
			)
			.then((data) => setAuthor(data[0]))
			.catch(console.error);
	}, []);

	if (!singlePage) return "";
	if (!author) return "";

	return (
		<main>
			<Helmet>
				<meta
					name="description"
					content="Drucial.com is my personal digital journal. Serving as a brain dump for me, I cover a wide range of topics from education to riding bicycles."
				/>
				<meta property="og:title" content="Drucial | About" />
				<meta
					property="og:description"
					content="Drucial.com is my personal digital journal. Serving as a brain dump for me, I cover a wide range of topics from education to riding bicycles."
				/>
				<meta
					property="og:image"
					content={urlFor(singlePage.mainImage).width(512)}
				/>
				<meta property="og:url" content="https://www.drucial.com/about" />
				<title>Drucial | About</title>
			</Helmet>
			<section>
				<div className="container-full">
					<div
						className="header-image"
						style={{
							backgroundImage:
								"url(" +
								urlFor(singlePage.mainImage).width(screenBreak).auto("format") +
								")",
						}}
					>
						<div className="title-container">
							<h1 className="single-post-title">{singlePage.title}</h1>
						</div>
					</div>
					<div className="content-container">
						<BlockContent
							className="block-content"
							blocks={singlePage.body}
							projectID="2echsd1t"
							dataset="production"
						/>
					</div>
					<div
						className="header-image"
						style={{
							backgroundImage:
								"url(" +
								urlFor(singlePage.subImage).width(screenBreak).auto("format") +
								")",
						}}
					>
						<div className="profile-container">
							<div className="profile">
								<img
									className="profile-pic"
									src={urlFor(author.profileImage).width(150).auto("format")}
									alt={author.profileImage.attribution}
								/>
								<div className="profile-details">
									<h2>{author.name}</h2>
									<p>{author.description}</p>
									<SocialNav
										position={"static"}
										invert={"invert(100%)"}
										row={"row"}
										transform={"none"}
										margin={0}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="content-container about">
						<BlockContent
							className="block-content"
							blocks={author.bio}
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
