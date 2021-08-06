import { projectFirestore } from '../firebase/firebaseIndex';

const addPart3 =
  (testType) =>
  async (
    bottomCentre,
    bottomLeft,
    bottomRight,
    creatorId,
    question,
    questionTwo,
    topLeft,
    topRight,
    tags
  ) => {
    return projectFirestore.collection('Part3').add({
      bottomCentre,
      bottomLeft,
      bottomRight,
      creatorId,
      question,
      questionTwo,
      topLeft,
      topRight,
      tags,
    });
  };

export default addPart3;
