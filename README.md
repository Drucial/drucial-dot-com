# Drucial.com | A Dev Journal <a href="https://www.drucial.com" ><img src="build/logo192.png" width="60" align="left"></a>
\
<a href="https://www.drucial.com">This website</a> serves as a personal journal for me asd I dive into the world of web and software development. It also serves as a sort of thesis project for my first year of self education into web development. The journal covers a wide range of topics all related at their core to general web and eventually software development.


## The Build
The site design is my own and no css libraries were used in the construction of Drucial. This was an intentional choice as it forced me to push my css knowledge and form my own design systems taht worked across multiple use cases. Drucial was built with `create-react-app` as a single page application (SPA) and is also a progressive web application (PWA) to make it available for offline use. I used a handful of additional packages/technologies for added functionality. Notably:


- `react-router-dom` for routing and url managment
- `react-snap` to prerender content for seo purposes
- `react-helmet` to manage `<head>` data such as meta tags, titles, descriptions and previews
- `react-spring` for some simple animations of the menus

The content is managed by a headless <a href="https://www.sanity.io/">Sanity</a> content managment system implementation that was a truly wonderful learning experience. The studio and schema were very easy to set up, fetching data using GROQ or GraphQL is a breeze and hosting the studio on my own site was equally simple to accomplish. Some additional tools from sanity were used for added functionality and customization.

- `sanity-block-content-to-react` for managing/ virtually all long form content on each page
- `sanity-image-url` for fetching appropriate images for pages and posts and using their imageURLBuilder tool to ensure properly sized, attributed, and optimized images are delieverd no matter the device.
- Custom serializers were also used for post images and block-content for added optimization and SEO purposes

The site is obviously version controlled with GIT and this repo is used for continuous deployment via Netlify.

## The Experience

With my first 12 months of webdevelopment education under my belt, I really wanted to test the knowledge in a real world project and Drucial proved to be the perfect choice. It gave me a chance to dive into React for the first time, and it provided me with a scalable and managable platform to document my progress and experiences in this world.

### Working With React

Coming off less than a year of pure vanilla JavaScript education, it took me a few hours to wrap my head around React. While it is a JavaScript library, the methodology was change for me as you can't reaslly rely on modifying or interacting with the dom very easily as I had been doing on previous projects. That being said, I actually grew to find the workflow very intuitive and easy to use. I was able to get familiar with several valuable hooks including:
- `useState`
- `useContext`
- `useEffect`

On the journey I did find the limitations of building a project with `create-react-app` and likely wont use it for the next project. The necessity for additional dependencies for what I think should be core functionality was a bit frustrating. I have been researching other options and have decided to build my next project using <a href="https://nextjs.org/">NEXT.js</a>. This new project is already underway and I am very happy with the decision.

If you'd like to learn a bit more about this project, be sure to <a href="https://www.drucial.com/webdev">check out my journal covering this experience.</a>
