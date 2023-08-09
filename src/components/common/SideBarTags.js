import React from 'react';
import Tags from './Tags';

const SideBarTags = ({ tags, handleSetTags, children}) => {
  return (
    <>
      <Tags tags={tags ? tags : ''} handleSetTags={handleSetTags} />
      {children && children}
    </>
  );
};

export default SideBarTags;
