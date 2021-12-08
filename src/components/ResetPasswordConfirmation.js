import React from 'react';

function ResetPasswordConfirmation({ history }) {
  const handleClick = () => {
    history.push('/signin');
  };

  return (
    <div className='auth-container'>
      <form className='auth-form'>
        <div className='auth-help-container'>
          An email with instructions on how to reset your password has been sent.
        </div>

        <button className='auth-button' onClick={handleClick}>
          back to login page
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordConfirmation;
