import React from 'react';

const Tag = ({ tagName, selected, handleSetTags }) => {
  const handleClick = () => {
    handleSetTags(tagName, selected);
  };

  return (
    <button
      className={`tag-item ${selected ? 'tag-item-selected' : ''}`}
      onClick={handleClick}
    >
      {'#' + tagName}
    </button>
  );
};

export default Tag;
