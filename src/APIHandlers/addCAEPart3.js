import { projectFirestore, timestamp } from '../firebase/firebaseIndex';

const addCAEPart3 = async (
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
  const collection = projectFirestore.collection('FCEPart3');

  const result = await collection.add({
    bottomCentre,
    bottomLeft,
    bottomRight,
    creatorId,
    question,
    questionTwo,
    topLeft,
    topRight,
    tags,
    createdAt: timestamp(),
  });

  return result;
};

export default addCAEPart3;
