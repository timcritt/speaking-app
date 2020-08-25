import { useEffect } from 'react';
import { projectFirestore, timestamp } from '../firebase/firebaseIndex';

const usePublishTest = (imageOne, imageTwo, question, tags) => {
  useEffect(() => {
    //references
    const collectionRef = projectFirestore.collection('images');
    const createdAt = timestamp();

    collectionRef.add({ imageOne, imageTwo, question, createdAt, tags });
  });
};

export default usePublishTest;
