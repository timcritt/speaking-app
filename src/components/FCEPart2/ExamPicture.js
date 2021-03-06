/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import placeholder from 'img/placeholder-landscape.jpg';

const ExamPicture = ({ image, setImage, children }) => {
  return (
    <div className='exam-image-container upload-image-container fade-in'>
      {/*when loaded within Part2, the placeholder will only display if there is an error
      when loaded in EditPart2, the placeholder will display if image=null i.e., the user 
      is editing or creating a test, or if there is an error */}
      <img
        src={image ? image : placeholder}
        className='part2-image'
        onError={(e) => {
          setImage(placeholder);
        }}
      />
      {children}
    </div>
  );
};

export default ExamPicture;
