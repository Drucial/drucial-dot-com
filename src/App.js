
import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Thanks from './components/Thanks'
import JournalPost from './components/JournalPost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="screen">
        <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route path='/thanks' component={Thanks} />
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