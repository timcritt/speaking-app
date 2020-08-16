import React, { Fragment } from 'react';
import Tag from './Tag';

const tagList = [
  'hobbies',
  'fitness',
  'sport',
  'health',
  'family',
  'friends',
  'holidays',
  'education',
  'home',
];

const Tags = ({ tags, handleSetTags }) => {
  console.log('tags inside Tags: ', tags);
  return (
    <Fragment>
      {tagList.map((tag) => {
        return (
          <Tag
            key={tag}
            tagName={tag}
            selected={tags.includes(tag)}
            handleSetTags={handleSetTags}
          />
        );
      })}
    </Fragment>
  );
};

export default Tags;
