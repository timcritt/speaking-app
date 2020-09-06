import React, { Fragment } from 'react';

const Modal = ({ closeModal, children, heading }) => {
  return (
    <Fragment>
      <div className='modal-overlay'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div className='modal-header-text'>
              <span>{heading}</span>
              <button
                className='modal-close-btn'
                onClick={() => closeModal(false)}
              >
                x
              </button>
            </div>
          </div>

          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
