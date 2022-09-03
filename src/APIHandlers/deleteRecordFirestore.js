import { projectFirestore } from '../firebase/firebaseIndex';

const deleteRecordFirestore = async (documentId, collectionName) => {
  await projectFirestore
    .collection(collectionName)
    .doc(documentId)
    .delete()
    .then(function () {})
    .catch(function (error) {
      console.error('Error removing document: ', error);
    });
};

export default deleteRecordFirestore;
