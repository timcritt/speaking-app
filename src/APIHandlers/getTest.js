import { projectFirestore } from '../firebase/firebaseIndex';

const getTest = async (collectionName, testId) => {
  var test;
  console.log('in get test');
  console.log(testId);
  await projectFirestore
    .collection(collectionName)
    .doc(testId)
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
  console.log(test);
  return test;
};

export default getTest;
