import React, { Fragment, useState } from 'react';
import Users from './Users';
import useGetDocsInfiniteScroll from 'hooks/useGetDocsInfiniteScroll';

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [docs, setDocs] = useState();
  const { fetchMorePosts, nextDocs_loading } = useGetDocsInfiniteScroll(searchTerm, setDocs, docs);

  const handleChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <Fragment>
      <div className='user-search-bar'>
        <input
          defaultValue={searchTerm}
          className='user-search-input'
          placeholder='enter the name of a user'
          onChange={handleChange}
        ></input>
        <button className='user-search-button'>search</button>
      </div>
      <Users users={docs} />
      {nextDocs_loading && 'loading'}
      <button onClick={fetchMorePosts}>get more posts</button>
    </Fragment>
  );
};

export default SearchUsers;
