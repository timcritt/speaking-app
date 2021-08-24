import { projectFirestore, timestamp } from '../firebase/firebaseIndex';
import { FCEPart2 } from './firebaseConsts';

const addTest = async (
  imageOneUrl,
  imageTwoUrl,
  questionOne,
  shortTurnQuestion,
  tags,
  imageOneRef,
  imageTwoRef,
  creatorId
) => {
  return projectFirestore.collection(FCEPart2).add({
    imageOneUrl,
    imageTwoUrl,
    questionOne,
    shortTurnQuestion,
    createdAt: timestamp(),
    tags,
    imageOneRef,
    imageTwoRef,
    creatorId,
  });
};

export default addTest;
