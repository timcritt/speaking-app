import React, { Fragment } from 'react';

const Modal = ({ modalOpen, setModalOpen, children, heading }) => {
  console.log(modalOpen);
  return (
    <Fragment>
      <div className='modal-overlay'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div className='modal-header-text'>
              <span>{heading}</span>
              <button
                className='modal-close-btn'
                onClick={() => setModalOpen(false)}
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
