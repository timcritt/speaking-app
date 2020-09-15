import { useState, useEffect } from 'react';
import { projectStorage } from '../firebase/firebaseIndex';
import { v4 as uuidv4 } from 'uuid';

const uploadImage = (file) => {
  let progress;
  let error;
  let url;
  let storageRef;

  //references

  const ref = projectStorage.ref(uuidv4());

  ref.put(file).on(
    'state_changed',
    (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      progress = percentage;
    },
    (err) => {
      error = err;
    },
    async () => {
      const downloadUrl = await ref.getDownloadURL();
      console.log('use storage', ref.fullPath);
      storageRef = ref.fullPath;
      url = downloadUrl;
    }
  );

  return { progress, url, error, storageRef };
};

export default uploadImage;
