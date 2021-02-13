import { projectFirestore } from '../firebase/firebaseIndex';

//gets an array of tests based on an array of test ids
const getFilteredTests = async (userId, filterTerm, TestPart) => {
  var tests = [];
  var results = projectFirestore.collection(TestPart);

  if (userId) {
    results = results.where('userId', '==', userId);
  }
  // if (filterTerm) {
  //   results = results.orderBy('question');
  // }

  results = await results.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      tests.push({ ...doc.data(), id: doc.id });
    });
  });

  return tests;
};

export default getFilteredTests;
