import React, { useState } from 'react';
import ExamImageContainer from './ExamImageContainer';
import ImagePickerContainer from './ImagePickerContainer';
import ImageContext from '../context/ImageContext';
import placeholder from '../img/placeholder-landscape.jpg';

const EditFCEPart2 = () => {
  const [question, setQuestion] = useState();
  const [imageOne, setImageOne] = useState(placeholder);
  const [imageTwo, setImageTwo] = useState(placeholder);

  function handleSetImageOne(image) {
    setImageOne(image);
  }
  function handleSetImageTwo(image) {
    setImageTwo(image);
  }

  console.log('setImage one at source (editfcepart2)', handleSetImageOne);
  return (
    <main className='HolyGrail-content'>
      <div className='part2-main-row'>
        <div className='question-container'>
          <input
            className='question-input'
            placeholder='question'
            defaultValue={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className='part2-image-row'>
          <div>
            <ExamImageContainer imageSrc={imageOne} />
            <ImageContext.Provider value={handleSetImageOne}>
              <ImagePickerContainer />
            </ImageContext.Provider>
          </div>
          <div>
            <ExamImageContainer imageSrc={imageTwo} />
            <ImageContext.Provider value={handleSetImageTwo}>
              <ImagePickerContainer />
            </ImageContext.Provider>
          </div>
        </div>
        <div className='timer-row'></div>
      </div>
    </main>
  );
};

export default EditFCEPart2;
