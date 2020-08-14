import React from 'react';
import gitHubLogo from '../img/github-logo.png';

const Footer = () => {
  return (
    <div className='footer-container'>
      <span>© Timothy Crittenden</span>
      <a href='https://github.com/timcritt/speaking-app' target='_blank'>
        <img className='gitHub-logo' src={gitHubLogo}></img>
      </a>
    </div>
  );
};

export default Footer;
