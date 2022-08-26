import { useState, useEffect, useCallback, useRef } from 'react';

import pagination from 'APIHandlers/pagination.js';

// PROBLEM: it's currently impossible with firebase to check if a string in the database contains another.
// Only exact mathches will return results.
const useGetDocsInfiniteScroll = (setDocs, collection, tagFilterTerm, direction, orderBy) => {
  const [lastKey, setLastKey] = useState('');
  const [nextDocs_loading, setNextPostsLoading] = useState(false);

  const fetchMorePosts = useCallback(() => {
    return new Promise((resolve, reject) => {
      try {
        if (lastKey) {
          setNextPostsLoading(true);
          pagination
            .postsNextBatch(lastKey, collection, tagFilterTerm, direction, orderBy)
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

          resolve('succes');
        }
      } catch {
        reject('oops');
      }
    });
  }, [collection, direction, lastKey, orderBy, setDocs, tagFilterTerm]);

  const containerRef = useRef();

  //load initial docs on mount
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      pagination
        .postsFirstBatch(collection, tagFilterTerm, direction, orderBy)
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
  }, [collection, direction, orderBy, setDocs, tagFilterTerm]);

  //apply observer to the target html item and load next posts when item is on screen
  useEffect(() => {
    let current = containerRef.current;

    let observer = new IntersectionObserver(handleIntersection);

    observer.observe(current);

    function handleIntersection(entries, observer) {
      const entry = entries[0];

      if (entry.isIntersecting && lastKey) {
        observer.unobserve(entry.target);
        (async () => {
          await fetchMorePosts();
        })();
      }
    }

    return () => {
      observer?.unobserve(current);
    };
  }, [fetchMorePosts, lastKey]);

  //const [containerRef] = useIsVisiblecopy(fetchMorePosts, lastKey);

  return { fetchMorePosts, nextDocs_loading, setLastKey, lastKey, containerRef };
};

export default useGetDocsInfiniteScroll;
