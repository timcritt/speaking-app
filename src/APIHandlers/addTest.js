import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from '../firebase/firebaseConsts';

const addTest = (
  imageOneUrl,
  imageTwoUrl,
  question,
  createdAt,
  tags,
  imageOneRef,
  imageTwoRef,
  userId
) =>
  projectFirestore.collection(FCEPart2).add({
    imageOneUrl,
    imageTwoUrl,
    question,
    createdAt,
    tags,
    imageOneRef,
    imageTwoRef,
    userId,
  });

export default addTest;
