import { projectFirestore } from 'firebase/firebaseIndex';

const pagination = {
  /**
   * this function will be fired when you first time run the app,
   * and it will fetch first 5 posts, here I retrieve them in descending order, until the last added post appears first.
   */
  postsFirstBatch: async function (filterBy, searchTerm) {
    try {
      let data = projectFirestore.collection('users');

      if (filterBy && searchTerm) {
        data = data.where(filterBy, '==', searchTerm);
      }

      data = await data.orderBy('userId').limit(5).get();
      console.log(data);
      let results = [];
      let lastKey = '';
      data.forEach((doc) => {
        results.push({
          ...doc.data(),
          userId: doc.data().userId,
        });
        lastKey = doc.id;
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
  postsNextBatch: async (key, filterBy, searchTerm) => {
    try {
      var data = projectFirestore.collection('users');
      if (filterBy && searchTerm) {
        data = data.where('userName', '==', 'Chonk');
      }
      data = await data.orderBy('userId').startAfter(key).limit(5).get();

      let results = [];
      let lastKey = '';
      data.forEach((doc) => {
        results.push({
          ...doc.data(),
          userId: doc.data().userId,
        });
        lastKey = doc.id;
      });
      return { results, lastKey };
    } catch (e) {
      console.log(e);
    }
  },
};

export default pagination;
