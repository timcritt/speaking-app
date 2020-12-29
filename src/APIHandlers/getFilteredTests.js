import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from '../firebase/firebaseConsts';
import firebase from 'firebase';

//gets an array of tests based on an array of test ids
const getFilteredTests = async (userId, filterTerm) => {
  var tests = [];
  var results = projectFirestore.collection(FCEPart2);

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
  console.log(tests);
  return tests;
};

export default getFilteredTests;
