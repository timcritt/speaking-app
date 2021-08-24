import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from './firebaseConsts';

const updateTest = async (
  imageOneUrl,
  imageTwoUrl,
  questionOne,
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
    questionOne,
    shortTurnQuestion,
    updatedAt: createdAt,
    tags,
    imageOneRef,
    imageTwoRef,
  });
};

export default updateTest;
