import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from '../firebase/firebaseConsts';
import firebase from 'firebase';

//gets an array of tests based on an array of test ids
const getSomeTests = async (testIds) => {
  var tests = [];

  if (testIds.length > 0) {
    await projectFirestore
      .collection(FCEPart2)
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

export default getSomeTests;
