import React from 'react';
import gitHubLogo from '../img/github-logo.png';

const Footer = () => {
  return (
    <div className='footer-container'>
      <span>© Timothy Crittenden</span>
      <img className='gitHub-logo' src={gitHubLogo}></img>
    </div>
  );
};

export default Footer;
