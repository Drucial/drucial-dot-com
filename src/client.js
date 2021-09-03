import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "2echsd1t", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  apiVersion: 'v2021-06-07',
  useCdn: true,
});