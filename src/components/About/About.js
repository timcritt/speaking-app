import React from 'react';

import createThumbsForExistingPartFce from 'auxFunctions/createThumbsForExistingPart2Fce';

export const About = () => {
  const callCloud = async () => {
    try {
      await createThumbsForExistingPartFce();
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
