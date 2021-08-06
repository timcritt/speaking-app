import { projectFirestore } from '../firebase/firebaseIndex';

const addCAEPart2 = async (
  imageOneUrl,
  imageTwoUrl,
  imageThreeUrl,
  questionOne,
  questionTwo,
  shortTurnQuestion,
  createdAt,
  tags,
  imageOneRef,
  imageTwoRef,
  imageThreeRef,
  creatorId
) => {
  return projectFirestore.collection('CAEPart2').add({
    imageOneUrl,
    imageTwoUrl,
    imageThreeUrl,
    questionOne,
    questionTwo,
    shortTurnQuestion,
    createdAt,
    tags,
    imageOneRef,
    imageTwoRef,
    imageThreeRef,
    creatorId,
  });
};

export default addCAEPart2;
