import React from 'react';
import Tags from './Tags';

const SideBarTags = ({ tags, handleSetTags, children, title }) => {
  return (
    <div className='tags-container'>
      <Tags tags={tags ? tags : ''} handleSetTags={handleSetTags} />
      {children}
    </div>
  );
};

export default SideBarTags;
