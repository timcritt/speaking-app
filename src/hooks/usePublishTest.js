import { useEffect } from 'react';
import { projectFirestore, timestamp } from '../firebase/firebaseIndex';

const usePublishTest = (imageOneUrl, imageTwoUrl, question, tags, imageOneRef, imageTwoRef) => {
  useEffect(() => {
    //references
    const collectionRef = projectFirestore.collection('images');
    const createdAt = timestamp();

    collectionRef.add({
      imageOneUrl,
      imageTwoUrl,
      question,
      createdAt,
      tags,
      imageOneRef,
      imageTwoRef,
    });
  });
};

export default usePublishTest;
