import { projectFirestore, fieldPath } from 'firebase/firebaseIndex';

const pagination = {
  /**
   * this function will be fired when you first time run the app,
   * and it will fetch first 5 posts, here I retrieve them in descending order, until the last added post appears first.
   */
  postsFirstBatch: async function (collection, tagFilterTerm, direction) {
    try {
      let data = projectFirestore.collection(collection);
      console.log('postFirstBatch', direction);
      // if (filterBy && searchTerm) {
      //   data = data.where(filterBy, '==', searchTerm);
      // }

      if (tagFilterTerm) {
        data = data.where('tags', 'array-contains', tagFilterTerm);
      }

      data = await data.orderBy('createdAt', direction).limit(4).get();

      let results = [];
      let lastKey = '';
      data.forEach((doc) => {
        results.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      lastKey = data.docs[data.docs.length - 1];
      return { results, lastKey };
    } catch (e) {
      console.log('ERROR: ', e);
    }
  },

  /**
   * this function will be fired each time the user click on 'More Posts' button,
   * it receive key of last post in previous batch, then fetch next 5 posts
   * starting after last fetched post.
   */
  postsNextBatch: async function (key, collection, tagFilterTerm, direction) {
    try {
      console.log('postNextBatch', direction);
      let data = projectFirestore.collection(collection);
      // if (filterBy && searchTerm) {
      //   data = data.where('userName', '==', 'Chonk');
      // }

      if (tagFilterTerm) {
        data = data.where('tags', 'array-contains', tagFilterTerm);
      }

      data = await data.orderBy('createdAt', direction).startAfter(key).limit(4).get();

      let results = [];
      let lastKey = '';
      data.forEach((doc) => {
        results.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      lastKey = await data.docs[data.docs.length - 1];
      return { results, lastKey };
    } catch (e) {
      console.log(e);
    }
  },
};

export default pagination;
