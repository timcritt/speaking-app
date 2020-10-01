import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from '../firebase/firebaseConsts';

const updateTest = async (
  imageOneUrl,
  imageTwoUrl,
  question,
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
    updatedAt: createdAt,
    tags,
    imageOneRef,
    imageTwoRef,
  });

  return Promise.resolve();
};

export default updateTest;
