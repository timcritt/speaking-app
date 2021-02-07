import { projectFirestore } from '../firebase/firebaseIndex';
import { folders } from './firebaseConsts';

const addFolder = async (title, description, tests, createdAt, userId) => {
  try {
    await projectFirestore.collection(folders).add({
      title,
      description,
      tests,
      createdAt,
      userId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default addFolder;
