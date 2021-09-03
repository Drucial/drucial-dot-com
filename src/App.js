import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import SocialNav from './components/SocialNav'
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Journal from './components/Journal';
import JournalPost from './components/JournalPost';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
  const [showJournal, setShowJournal] = useState(false)

  const toggleJournal = () => {
    const journalCont = document.querySelector('.journal-container')
    if(showJournal === false) {
      setShowJournal(true)
      journalCont.classList.add('show')
    } else {
      setShowJournal(false)
      journalCont.classList.remove('show')
    }
  }

  return (
    <Router>
      <div className="screen">
        <Nav journal={showJournal} onToggle={toggleJournal} />
        <SocialNav />
        <Journal journal={showJournal} onToggle={toggleJournal}/>
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

