import React from 'react';

import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const iconSize = 64;
const ShareModalContent = ({ location }) => {
  //if no location is passed, component shows the url of the route location.
  //Share button on a thumnail cannot get the url from window.location, so it is constructed from test type and test ID, both of which are passed down as props.
  const url = location ? location : window.location.href;

  const copyURLtoClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <React.Fragment>
      <div className='shareButtonContainer '>
        <FacebookShareButton
          url={''}
          quote={'CampersTribe - World is yours to explore'}
          hashtag='#camperstribe'
        >
          <FacebookIcon size={iconSize} />
        </FacebookShareButton>
        <EmailShareButton
          url={'http://www.camperstribe.com'}
          quote={'CampersTribe - World is yours to explore'}
          hashtag='#camperstribe'
        >
          <EmailIcon size={iconSize} />
        </EmailShareButton>
        <WhatsappShareButton
          url={'http://www.camperstribe.com'}
          quote={'CampersTribe - World is yours to explore'}
          hashtag='#camperstribe'
        >
          <WhatsappIcon size={iconSize} />
        </WhatsappShareButton>
        <TwitterShareButton
          url={'http://www.camperstribe.com'}
          quote={'CampersTribe - World is yours to explore'}
          hashtag='#camperstribe'
        >
          <TwitterIcon size={iconSize} />
        </TwitterShareButton>
      </div>
      <div className='copy-link-container'>
        <input className='copy-link-input' value={url} readOnly={true}></input>
        <button onClick={copyURLtoClipboard}>copy URL</button>
      </div>
    </React.Fragment>
  );
};

export default ShareModalContent;
