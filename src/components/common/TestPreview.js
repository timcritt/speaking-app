import React from 'react';
import { Fragment } from 'react';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

const TestPreview = ({ question, children }) => {
  return (
    <Fragment>
      <div className='test-preview-overlay'>
        <div className='overlay-bottom-right'>
          <div className='circle-icon-container'>
            <ShareOutlinedIcon />
          </div>
          <div className='circle-icon-container'>
            <VisibilityOutlinedIcon />
          </div>
          <div className='circle-icon-container'>
            <PlaylistAddOutlinedIcon />
          </div>
        </div>
      </div>
      <div className='test-preview-container fade-in'>
        <div className='test-preview-question-container dont-break-out'>
          <span>{question}</span>
        </div>
        {children}
      </div>
    </Fragment>
  );
};

export default TestPreview;
