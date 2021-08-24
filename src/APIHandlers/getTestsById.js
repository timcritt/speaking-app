import { projectFirestore } from '../firebase/firebaseIndex';
import firebase from 'firebase';

//gets an array of tests of a particular type from an array of test ids
const getTestsById = async (testIds, testType) => {
  const promises = [];
  const tests = [];

  testIds.forEach((testId) => {
    promises.push(
      projectFirestore
        .collection(testType)
        .doc(testId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            tests.push({ ...doc.data(), id: doc.id });
          }
        })
    );
  });

  await Promise.all(promises);

  return tests;
};

export default getTestsById;
