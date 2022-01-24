import React, { Fragment, useState } from 'react';
import Users from './Users';
import useGetDocsInfiniteScroll from 'hooks/useGetDocsInfiniteScroll';
import pagination from 'APIHandlers/pagination.js';

const SearchUsers = () => {
  const filterBy = 'userName';
  const [searchTerm, setSearchTerm] = useState('');
  const [docs, setDocs] = useState([]);
  const { fetchMorePosts, nextDocs_loading, setLastKey } = useGetDocsInfiniteScroll(
    searchTerm,
    setDocs,
    filterBy,
    searchTerm
  );

  const handleChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };
  const handleClickSearch = async () => {
    const { results, lastKey } = await pagination.postsFirstBatch(filterBy, searchTerm);
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
      <button onClick={fetchMorePosts}>get more posts</button>
    </Fragment>
  );
};

export default SearchUsers;
