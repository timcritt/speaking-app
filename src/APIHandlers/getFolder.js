import { projectFirestore } from '../firebase/firebaseIndex';
import { folders } from './firebaseConsts';

const getFolder = async (folderId) => {
  var folder;

  var results = projectFirestore.collection(folders).doc(folderId);

  await results
    .get()
    .then((doc) => {
      if (doc.exists) {
        folder = doc.data();
      } else {
        console.log('no such document');
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return folder;
};

export default getFolder;
