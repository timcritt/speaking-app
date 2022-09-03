import React, { Fragment, useState } from 'react';

import useGetDocsInfiniteScroll from 'hooks/useGetDocsInfiniteScroll';

const PaginatedSearch = ({ filterBy, collection, resultsPresentation, orderBy }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [docs, setDocs] = useState([]);

  const { fetchMorePosts, nextDocs_loading, setLastKey, pagination } = useGetDocsInfiniteScroll(
    setDocs,
    filterBy,
    searchTerm,
    collection
  );

  const handleChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  const handleClickSearch = async () => {
    const { results, lastKey } = await pagination.postsFirstBatch(
      filterBy,
      searchTerm,
      collection,
      orderBy
    );
    setLastKey(lastKey);
    setDocs(results);
  };

  return (
    <Fragment>
      <div className='user-search-bar'>
        <input
          defaultValue={searchTerm}
          className='user-search-input'
          placeholder='enter the name of a user'
          onChange={handleChange}
        />
        <button className='user-search-button' onClick={handleClickSearch}>
          search
        </button>
      </div>
      {resultsPresentation(docs)}
      {nextDocs_loading && 'loading'}
      <button onClick={fetchMorePosts}>get more posts</button>
    </Fragment>
  );
};

export default PaginatedSearch;
