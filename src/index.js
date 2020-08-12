import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';

import './fonts/digital-7.ttf';

import './styles/index.css';
import App from './components/App';
import { NavBar } from './components/NavBar';

ReactDOM.render(
  <div className='HolyGrail'>
    <Router>
      <header className='header-container'></header>
      <NavBar />
      <div className='HolyGrail-body'>
        <App />
      </div>
      <Footer />
    </Router>
  </div>,
  document.getElementById('root')
);
