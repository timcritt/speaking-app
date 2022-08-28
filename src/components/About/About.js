import React from 'react';

import firebase from 'firebase';

export const About = () => {
  const callCloud = async () => {
    try {
      const addUser = firebase.functions().httpsCallable('createProfileTwo');
      await addUser({
        name: 'tim',
      }).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='holy-grail-content'>
      <button onClick={callCloud}></button>
    </section>
  );
};
