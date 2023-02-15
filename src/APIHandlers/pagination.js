import { projectFirestore } from 'firebase/firebaseIndex';

const pagination = {
  postsFirstBatch: async function (collection, tagFilterTerm, direction, orderBy) {
    try {
      let data = projectFirestore.collection(collection);

      if (tagFilterTerm) {
        data = data.where('tags', 'array-contains', tagFilterTerm);
      }

      data = await data.orderBy(orderBy, direction).limit(8).get();

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
    } catch (e) {}
  },

  postsNextBatch: async function (key, collection, tagFilterTerm, direction, orderBy) {
    try {
      let data = projectFirestore.collection(collection);

      if (tagFilterTerm) {
        data = data.where('tags', 'array-contains', tagFilterTerm);
      }

      data = await data.orderBy(orderBy, direction).startAfter(key).limit(4).get();

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
    } catch (e) {}
  },
};

export default pagination;
