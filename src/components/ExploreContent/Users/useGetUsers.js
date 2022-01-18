import { useState, useEffect } from 'react';
import { projectFirestore } from 'firebase/firebaseIndex';

// PROBLEM: it's currently impossible with firebase to check if a string in the database contains another.
// Only exact mathches will return results.
const useGetUsers = (userName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    var results = projectFirestore.collection('users');
    console.log('in useGetUsers');
    if (userName) {
      results = results.where('userName', '==', userName);
    }
    console.log(results);
    //results = results.orderBy('createdAt', 'desc');

    const unsub = results.onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });
    //equivalent of componentDidUnmount => unsubscribe()
    return () => unsub();
  }, [userName]);

  return { docs };
};

export default useGetUsers;
