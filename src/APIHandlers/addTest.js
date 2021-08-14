import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from './firebaseConsts';

const addTest = async (
  imageOneUrl,
  imageTwoUrl,
  question,
  shortTurnQuestion,
  tags,
  imageOneRef,
  imageTwoRef,
  creatorId
) => {
  return projectFirestore.collection(FCEPart2).add({
    imageOneUrl,
    imageTwoUrl,
    question,
    shortTurnQuestion,
    createdAt: projectFirestore.database.ServerValue.TIMESTAMP,
    tags,
    imageOneRef,
    imageTwoRef,
    creatorId,
  });
};

export default addTest;
