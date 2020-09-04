import { useEffect } from 'react';
import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from '../firebase/firebaseConsts';

const deleteRecordFirestore = (testId) => {
  projectFirestore
    .collection(FCEPart2)
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
