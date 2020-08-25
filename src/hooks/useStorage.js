import { useState, useEffect } from 'react';
import { projectStorage } from '../firebase/firebaseIndex';
import { v4 as uuidv4 } from 'uuid';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //references
    const storageRef = projectStorage.ref(uuidv4());

    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();

        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
