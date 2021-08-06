import { projectFirestore } from '../firebase/firebaseIndex';

//gets an array of tests based on an array of test ids
const getFilteredTests = async (userId, filterTerm, testPart) => {
  var tests = [];
  var results = projectFirestore.collection(testPart);

  if (userId) {
    results = results.where('creatorId', '==', userId);
  }

  await results.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      tests.push({ ...doc.data(), id: doc.id });
    });
  });

  return tests;
};

export default getFilteredTests;
