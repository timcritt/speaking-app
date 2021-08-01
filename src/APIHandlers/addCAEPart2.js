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
  userId
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
    userId,
  });
};

export default addCAEPart2;
