import { projectFirestore } from '../firebase/firebaseIndex';
import firebase from 'firebase';
import { folders } from './firebaseConsts';

const addFolder = async (title, description, creatorId) => {
  const testCount = 0;
  const createdAt = firebase.firestore.FieldValue.serverTimestamp();
  try {
    await projectFirestore.collection(folders).add({
      title,
      description,
      createdAt,
      creatorId,
      testCount,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default addFolder;
