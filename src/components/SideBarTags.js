import React from 'react';
import Tags from './Tags';

const SideBarTags = ({ tags, handleSetTags }) => {
  return (
    <div className='side-bar-left-tags hg-sidebar '>
      <div className='tags-container'>
        <h2 className='tags-title'>topic tags</h2>
        <Tags tags={tags} handleSetTags={handleSetTags} />
        <p className='advice-text tag-advice'>
          Adding the correct tags will help others find your test
        </p>
      </div>
    </div>
  );
};

export default SideBarTags;
