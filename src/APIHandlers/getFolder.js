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
      }
    })
    .catch((error) => {});

  return folder;
};

export default getFolder;
