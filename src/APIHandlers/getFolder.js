import { projectFirestore } from '../firebase/firebaseIndex';
import { folders } from '../firebase/firebaseConsts';

const getFolder = async (folderId) => {
  var folder;

  await projectFirestore
    .collection(folders)
    .doc(folderId)
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
