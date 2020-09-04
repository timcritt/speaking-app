import React from 'react';
import Tags from './Tags';

const SideBarTags = ({ tags, handleSetTags, children, title }) => {
  return (
    <div className='tags-container'>
      <h2 className='tags-title'>{title}</h2>
      <Tags tags={tags} handleSetTags={handleSetTags} />
      {children}
    </div>
  );
};

export default SideBarTags;
