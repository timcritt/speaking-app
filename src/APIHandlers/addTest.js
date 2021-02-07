import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from './firebaseConsts';

const addTest = async (
  imageOneUrl,
  imageTwoUrl,
  question,
  createdAt,
  tags,
  imageOneRef,
  imageTwoRef,
  userId
) => {
  return projectFirestore.collection(FCEPart2).add({
    imageOneUrl,
    imageTwoUrl,
    question,
    createdAt,
    tags,
    imageOneRef,
    imageTwoRef,
    userId,
  });
};

export default addTest;
