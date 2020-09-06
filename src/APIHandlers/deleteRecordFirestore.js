import { projectFirestore } from '../firebase/firebaseIndex';

const deleteRecordFirestore = (documentId, collectionName) => {
  projectFirestore
    .collection(collectionName)
    .doc(documentId)
    .delete()
    .then(function () {
      console.log('Document successfully deleted!');
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
    });
};

export default deleteRecordFirestore;
