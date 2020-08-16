import React, { useState, Fragment } from 'react';
import ExamImageContainer from './ExamImageContainer';
import ImageContext from '../context/ImageContext';
import placeholder from '../img/placeholder-landscape.jpg';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EasyCrop from './EasyCrop';
import SimpleModal from './SimpleModal';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBarTags from './SideBarTags';

const mockTags = ['home', 'fitness'];

const EditFCEPart2 = () => {
  const [question, setQuestion] = useState();
  const [imageOne, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();
  const [testTags, setTags] = useState(mockTags);

  function handleSetImageOne(image) {
    setImageOne(image);
  }
  function handleSetImageTwo(image) {
    setImageTwo(image);
  }
  function handleSetTags(tag, selected) {
    if (!selected) {
      //adds tag to the state
      setTags((prevTags) => {
        return [...prevTags, tag];
      });
    } else {
      //removes the tag from the state
      setTags((prevTags) => {
        return [...prevTags.filter((currentTag) => currentTag !== tag)];
      });
    }
  }

  return (
    <Fragment>
      <SideBarTags tags={testTags} handleSetTags={handleSetTags} />
      <main className='holy-grail-content'>
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
              <ExamImageContainer
                imageSrc={imageOne ? imageOne : placeholder}
              />
              <ImageContext.Provider value={handleSetImageOne}>
                <div className='exam-image-container'>
                  {imageOne ? (
                    <Button
                      variant='contained'
                      color='secondary'
                      size='small'
                      startIcon={<DeleteIcon />}
                      onClick={() => setImageOne()}
                    >
                      delete
                    </Button>
                  ) : (
                    <SimpleModal modalButtonText={'Add Image'}>
                      <EasyCrop></EasyCrop>
                    </SimpleModal>
                  )}
                </div>
              </ImageContext.Provider>
            </div>

            <div>
              <ExamImageContainer
                imageSrc={imageTwo ? imageTwo : placeholder}
              />
              <ImageContext.Provider value={handleSetImageTwo}>
                <div className='exam-image-container'>
                  {imageTwo ? (
                    <Button
                      variant='contained'
                      color='secondary'
                      size='small'
                      startIcon={<DeleteIcon />}
                      onClick={() => setImageTwo()}
                    >
                      delete
                    </Button>
                  ) : (
                    <SimpleModal modalButtonText={'Add Image'}>
                      <EasyCrop></EasyCrop>
                    </SimpleModal>
                  )}
                </div>
              </ImageContext.Provider>
            </div>
          </div>
          <div className='timer-row'>
            <Button
              variant='contained'
              color='primary'
              startIcon={<SaveIcon />}
              disabled={!(imageOne && imageTwo && question)}
            >
              save
            </Button>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default EditFCEPart2;
