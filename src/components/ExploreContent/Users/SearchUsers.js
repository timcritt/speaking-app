import React, { Fragment, useState } from 'react';
import Users from './Users';
import useGetDocsInfiniteScroll from 'hooks/useGetDocsInfiniteScroll';
import pagination from 'APIHandlers/pagination.js';

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [docs, setDocs] = useState([]);

  const collection = 'users';
  const orderBy = 'userId';
  const direction = 'asc';

  const { nextDocs_loading, setLastKey, containerRef } = useGetDocsInfiniteScroll(
    setDocs,
    collection,
    null,
    direction,
    orderBy
  );

  const handleChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };
  const handleClickSearch = async () => {
    const { results, lastKey } = await pagination.postsFirstBatch(
      collection,
      null,
      direction,
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
      <Users users={docs} />
      {nextDocs_loading && 'loading'}
      <div ref={containerRef}></div>
    </Fragment>
  );
};

export default SearchUsers;
