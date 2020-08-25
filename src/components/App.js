import React, { useContext } from 'react';
import { firebaseAuth } from '../context/AuthProvider';
import '../styles/App.css';
import Routes from '../views/Routes';

function App() {
  return <Routes />;
}

export default App;
