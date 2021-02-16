import { projectFirestore } from '../firebase/firebaseIndex';
import firebase from 'firebase';

//gets an array of tests based on an array of test ids
const getTestsById = async (testIds, testType) => {
  var tests = [];

  if (testIds.length > 0) {
    await projectFirestore
      .collection(testType)
      .where(firebase.firestore.FieldPath.documentId(), 'in', testIds)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tests.push({ ...doc.data(), id: doc.id });
        });
      });
  }

  return tests;
};

export default getTestsById;
