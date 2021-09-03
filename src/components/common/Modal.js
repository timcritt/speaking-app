import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ modalOpen, setModalOpen, children, heading }) => {
  const handleSetOpen = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  return ReactDOM.createPortal(
    <Fragment>
      {/*stopPropagation needed here to prevent bubbling event to the page underneath the modal*/}
      <div className='modal-overlay ' onClick={(e) => e.stopPropagation()}>
        <div className='modal-content'>
          <div className='modal-header'>
            <div className='modal-header-text'>
              <span>{heading}</span>
              <button className='modal-close-btn' onClick={handleSetOpen}>
                x
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </Fragment>,
    document.querySelector('#modal')
  );
};

export default Modal;
