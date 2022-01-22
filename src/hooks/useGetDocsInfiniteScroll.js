import { useState, useEffect } from 'react';

import pagination from 'APIHandlers/pagination.js';

// PROBLEM: it's currently impossible with firebase to check if a string in the database contains another.
// Only exact mathches will return results.
const useGetDocsInfiniteScroll = (userName, setDocs, docs) => {
  const [lastKey, setLastKey] = useState('');
  const [nextDocs_loading, setNextPostsLoading] = useState(false);

  const fetchMorePosts = () => {
    console.log('in fetch more psots');
    if (lastKey.length > 0) {
      setNextPostsLoading(true);
      pagination
        .postsNextBatch(lastKey)
        .then((res) => {
          setLastKey(res.lastKey);
          // add new posts to old posts
          setDocs(() => docs.concat(res.results));
          setNextPostsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setNextPostsLoading(false);
        });
    }
  };

  useEffect(() => {
    // first 5 posts
    pagination
      .postsFirstBatch()
      .then((res) => {
        setDocs(res.results);
        console.log(res.lastKey);
        setLastKey(res.lastKey);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setDocs]);

  return { fetchMorePosts, nextDocs_loading };

  // useEffect(() => {
  //   var results = projectFirestore.collection('users');
  //   console.log('in useGetUsers');
  //   if (userName) {
  //     results = results.where('userName', '==', userName);
  //   }
  //   console.log(results);
  //   //results = results.orderBy('createdAt', 'desc');

  //   const unsub = results.onSnapshot((snap) => {
  //     let documents = [];
  //     snap.forEach((doc) => {
  //       documents.push({ ...doc.data(), id: doc.id });
  //     });
  //     setDocs(documents);
  //   });
  //   //equivalent of componentDidUnmount => unsubscribe()
  //   return () => unsub();
  // }, [userName]);

  // return { docs };
};

export default useGetDocsInfiniteScroll;
