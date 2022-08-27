import { useState, useEffect } from 'react';

import pagination from 'APIHandlers/pagination.js';

// PROBLEM: it's currently impossible with firebase to check if a string in the database contains another.
// Only exact mathches will return results.
const useGetDocsInfiniteScroll = (setDocs, collection, tagFilterTerm, direction) => {
  const [lastKey, setLastKey] = useState('');
  const [nextDocs_loading, setNextPostsLoading] = useState(false);

  const fetchMorePosts = () => {
    if (lastKey) {
      setNextPostsLoading(true);
      pagination
        .postsNextBatch(lastKey, collection, tagFilterTerm, direction)
        .then((res) => {
          setLastKey(() => res.lastKey);
          // add new posts to old posts
          setDocs((prevDocs) => prevDocs.concat(res.results));
          setNextPostsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setNextPostsLoading(false);
        });
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      pagination
        .postsFirstBatch(collection, tagFilterTerm, direction)
        .then((res) => {
          setDocs(res.results);
          setLastKey(res.lastKey);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      mounted = false;
    };
  }, [collection, direction, setDocs, tagFilterTerm]);

  return { fetchMorePosts, nextDocs_loading, setLastKey, lastKey };
};

export default useGetDocsInfiniteScroll;
