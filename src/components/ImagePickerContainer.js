import React from 'react';
import EasyCrop from './EasyCrop';
import Modal from '@material-ui/core/Modal';
import SimpleModal from './SimpleModal';

const ImagePickerContainer = () => {
  return (
    <div className='exam-image-container'>
      <SimpleModal modalButtonText={'Add Image'}>
        <EasyCrop></EasyCrop>
      </SimpleModal>
    </div>
  );
};

export default ImagePickerContainer;
