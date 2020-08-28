import { useEffect } from 'react';
import { projectFirestore } from '../firebase/firebaseIndex';

const deleteRecordFirestore = (testId) => {
  projectFirestore
    .collection('FCE Part 2')
    .doc(testId)
    .delete()
    .then(function () {
      console.log('Document successfully deleted!');
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
    });
};

export default deleteRecordFirestore;
