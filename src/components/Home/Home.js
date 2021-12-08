import React from 'react';
import mocukup from 'img/mockup3panel.png';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div className='home-content'>
      <div className='mockup-container'>
        <img className='mockup-screenshot' src={mocukup}></img>
      </div>
      <div className='home-page-slogan-container'>
        <h1 className='home-page-slogan'>Teacher-created English oral exam material</h1>
        <div className='home-btn-container'>
          <Link to='/exploreContent/tests'>
            <button className='btn get-started-btn'>Explore</button>
          </Link>
          <Link to='/Create'>
            <button className='btn get-started-btn'>Create</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
