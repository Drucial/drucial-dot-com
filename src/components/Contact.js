import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Form from "./ContactForm";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
	return builder.image(source);
}

export default function Contact({ isMobile, screenBreak }) {
	const [singlePage, setSinglePage] = useState(null);
	useEffect(() => {
		sanityClient
			.fetch(
				`*[slug.current == 'contact']{
            title,
            _id,
            slug,
            mainImage{
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

	if (!singlePage) return "";

	return (
		<main>
			<Helmet>
				<meta
					name="description"
					content="Feel free to write me or follow me on social! Send me a note, leave me a comment or troll me, whatever floats your boat."
				/>
				<meta property="og:title" content="Drucial | Contact" />
				<meta
					property="og:description"
					content="Feel free to write me or follow me on social! Send me a note, leave me a comment or troll me, whatever floats your boat."
				/>
				<meta
					property="og:image"
					content={urlFor(singlePage.mainImage).width(512)}
				/>
				<meta property="og:url" content="https://www.drucial.com/contact" />
				<title>Drucial | Contact</title>
			</Helmet>
			<section
				style={
					isMobile === false
						? {
								backgroundImage:
									"url(" +
									urlFor(singlePage.mainImage)
										.width(screenBreak)
										.auto("format") +
									")",
						  }
						: { backgroundImage: "none", background: "var(--color-light)" }
				}
			>
				<div className="container-full flex-container flex-center">
					<Form />
				</div>
			</section>
		</main>
	);
}
