
import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import JournalPost from './components/JournalPost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const screenRef = useRef()
  const [isMobile, setIsMobile] = useState(null)

  useEffect(() => {
    if (!screenRef.current) return;
    function mobileCheck() {
      window.innerWidth <= 860 ? setIsMobile(true) : setIsMobile(false)
    };
    mobileCheck();
    window.addEventListener('resize', mobileCheck);
    return function cleanupListener() {
      window.removeEventListener('resize', mobileCheck)
    };
  }, [isMobile])
  return (
    <Router>
      <div ref={screenRef} className="screen">
        <Nav isMobile={isMobile}/>
        <Switch>
          <Route path='/' exact ><Home isMobile={isMobile}/></Route>
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route path="/:slug" component={JournalPost} />
        </Switch>
      </div>
    </Router>
  )
}

function setViewPortHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setViewPortHeight()
window.addEventListener('resize', setViewPortHeight);

export default App