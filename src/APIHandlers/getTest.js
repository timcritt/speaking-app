import { projectFirestore } from '../firebase/firebaseIndex';

const getTest = async (collectionName, testId) => {
  var test;
  var results = projectFirestore.collection(collectionName).doc(testId);

  await results
    .get()
    .then((doc) => {
      if (doc.exists) {
        test = { ...doc.data(), id: doc.id };
      } else {
        console.log('no such document');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return test;
};

export default getTest;
