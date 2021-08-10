import React, { Fragment } from 'react';
import Tag from './Tag';

let tagList = [
  'hobbies',
  'fitness',
  'sport',
  'health',
  'family',
  'friends',
  'holidays',
  'education',
  'home',
  'relationships',
];

// tagList.sort((a, b) => {
//   if (a < b) {
//     return -1;
//   } else return 1;
// });

const Tags = ({ tags, handleSetTags }) => {
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
