import React from 'react';
import './App.css';
import Nav from './components/Nav';
import SocialNav from './components/SocialNav'
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import JournalPost from './components/JournalPost';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="screen">
        <Nav />
        <SocialNav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route path="/:slug" component={JournalPost} />
        </Switch>
      </div>
    </Router>
  )
}

export default App

