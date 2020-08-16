import React from 'react';
import Tags from './Tags';

const SideBarTags = ({ tags, handleSetTags }) => {
  return (
    <div className='side-bar-left-tags'>
      <div className='tags-container'>
        <h2>tags</h2>
        <Tags tags={tags} handleSetTags={handleSetTags} />
      </div>
    </div>
  );
};

export default SideBarTags;
