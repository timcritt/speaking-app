import { projectFirestore } from '../firebase/firebaseIndex';
import { CAEPart2 } from './firebaseConsts';

const updateCAEPart2 = async (
  imageOneUrl,
  imageTwoUrl,
  imageThreeUrl,
  questionOne,
  questionTwo,
  shortTurnQuestion,
  tags,
  id,
  createdAt,
  imageOneRef,
  imageTwoRef,
  imageThreeRef
) => {
  var objectRef = projectFirestore.collection(CAEPart2).doc(id);
  await objectRef.update({
    imageOneUrl,
    imageTwoUrl,
    imageThreeUrl,
    questionOne,
    questionTwo,
    shortTurnQuestion,
    tags,
    id,
    createdAt,
    imageOneRef,
    imageTwoRef,
    imageThreeRef,
  });
};

export default updateCAEPart2;
