import sanityClient from "@sanity/client";

export default sanityClient({
	projectId: "2echsd1t", 
	dataset: "production", 
	apiVersion: 'v2021-06-07',
	useCdn: true,
});