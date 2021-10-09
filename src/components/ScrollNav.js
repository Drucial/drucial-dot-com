import React, { useLayoutEffect } from 'react'

const ScrollNav = () => {
  useLayoutEffect(() => {

    const scrollNav = document.querySelector(".scroll-nav");
    const main = document.querySelector("main");
    const sections = document.querySelectorAll("section");
    const scrollText = document.querySelector(".scroll-text");
    let isScrolling;

    function mainScroll() {
      let scrollPos = main.scrollHeight - main.scrollTop - main.clientHeight;
      if (scrollPos >= main.scrollHeight / sections.length) {
        main.scrollBy(0, 200);
      } else {
        main.scrollTo(0, 0);
      }
    };

    function scrollTextUpdate() {
      isScrolling = setTimeout(() => {
        let scrollPos = main.scrollHeight - main.scrollTop - main.clientHeight;
        if(main.scrollTop === 0){
          scrollNav.classList.add("scroll-middle")
          scrollText.innerText = "Journals";
          document.querySelector(".chevron").classList.remove("top");
        }else if (scrollPos >= main.scrollHeight / sections.length) {
          scrollNav.classList.remove("scroll-middle")
          scrollText.innerText = "Next";
          document.querySelector(".chevron").classList.remove("top");
        } else {
          scrollText.innerText = "Top";
          document.querySelector(".chevron").classList.add("top");
        }
      }, 10);
    };

    function clearTimeout() {
      window.clearTimeout(isScrolling);
      scrollTextUpdate()
    }

    scrollNav.addEventListener("click", mainScroll);
    main.addEventListener("scroll", clearTimeout, false);

    return function cleanupListener() {
      scrollNav.removeEventListener("click", mainScroll);
      main.removeEventListener("scroll", clearTimeout);
    };
  }, [])

  return (
      <div className="scroll-nav scroll-middle">
          <p className="scroll-text">Journals</p>
          <div className="chevron"></div>
      </div>
  )
}

export default ScrollNav
