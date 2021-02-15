import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from './firebaseConsts';

const updateTest = async (
  imageOneUrl,
  imageTwoUrl,
  question,
  shortTurnQuestion,
  tags,
  id,
  createdAt,
  imageOneRef,
  imageTwoRef
) => {
  var objectRef = projectFirestore.collection(FCEPart2).doc(id);
  await objectRef.update({
    imageOneUrl,
    imageTwoUrl,
    question,
    shortTurnQuestion,
    updatedAt: createdAt,
    tags,
    imageOneRef,
    imageTwoRef,
  });

  return Promise.resolve();
};

export default updateTest;
