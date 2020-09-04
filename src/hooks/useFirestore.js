import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/firebaseIndex';

const useFirestore = (collection, userId) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection);

    var tests;

    if (userId) {
      tests = unsub.where('userId', '==', userId);
    } else {
      tests = unsub;
    }

    tests
      .orderBy('createdAt', 'desc')
      .get()
      .then((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
  }, [collection, userId]);

  return { docs };
};

export default useFirestore;
