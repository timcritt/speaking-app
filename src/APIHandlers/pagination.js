import { projectFirestore, fieldPath } from 'firebase/firebaseIndex';

const pagination = {
  /**
   * this function will be fired when you first time run the app,
   * and it will fetch first 5 posts, here I retrieve them in descending order, until the last added post appears first.
   */
  postsFirstBatch: async function (filterBy, searchTerm, collection, tagFilterTerm) {
    try {
      let data = projectFirestore.collection(collection);

      if (filterBy && searchTerm) {
        data = data.where(filterBy, '==', searchTerm);
      }

      if (tagFilterTerm) {
        data = data.where('tags', 'array-contains', tagFilterTerm);
      }

      data = await data.orderBy(fieldPath.documentId()).limit(2).get();
      console.log(data);
      let results = [];
      let lastKey = '';
      data.forEach((doc) => {
        results.push({
          ...doc.data(),
          id: doc.id,
        });
        lastKey = doc.ref.id;
        console.log(doc.ref.id);
      });
      return { results, lastKey };
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * this function will be fired each time the user click on 'More Posts' button,
   * it receive key of last post in previous batch, then fetch next 5 posts
   * starting after last fetched post.
   */
  postsNextBatch: async (key, filterBy, searchTerm, collection, tagFilterTerm) => {
    try {
      var data = projectFirestore.collection(collection);
      // if (filterBy && searchTerm) {
      //   data = data.where('userName', '==', 'Chonk');
      // }

      if (tagFilterTerm) {
        data = data.where('tags', 'array-contains', tagFilterTerm);
      }

      data = await data.orderBy(fieldPath.documentId()).startAfter(key).limit(2).get();

      let results = [];
      let lastKey = '';
      data.forEach((doc) => {
        results.push({
          ...doc.data(),
          id: doc.id,
        });
        lastKey = doc.ref.id;
        console.log(doc.ref.id);
      });
      return { results, lastKey };
    } catch (e) {
      console.log(e);
    }
  },
};

export default pagination;
