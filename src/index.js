import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import ForkMe from './components/ForkMe';
import './fonts/digital-7.ttf';

import './styles/index.css';
import App from './components/App';
import { NavBar } from './components/NavBar';

ReactDOM.render(
  <div className='holy-grail'>
    <ForkMe></ForkMe>
    <Router>
      <header></header>
      <NavBar />
      <div className='holy-grail-body'>
        <App />
      </div>
      <Footer />
    </Router>
  </div>,
  document.getElementById('root')
);
