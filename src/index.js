import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import './fonts/digital-7.ttf';

import './styles/index.css';
import App from './components/App';
import { NavBar } from './components/NavBar/NavBar';

ReactDOM.render(
  <div className='holy-grail'>
    <Router>
      <AuthProvider>
        <header>
          <NavBar />
        </header>
        <div className='holy-grail-body'>
          <App />
        </div>
        {/*<Footer />*/}
      </AuthProvider>
    </Router>
  </div>,
  document.getElementById('root')
);
