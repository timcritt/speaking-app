import React, { Fragment, useState } from 'react';

const VerticallyExpandingTestsContainer = (props) => {
  const [testContainerExpanded, setTestContainerExpanded] = useState(false);

  const toggleExpandContainer = () => {
    setTestContainerExpanded((prevState) => !prevState);
  };

  return (
    <Fragment>
      <button onClick={(e) => toggleExpandContainer(e)}>
        {props.buttonLabel} +
      </button>
      <div
        className={
          'user-tests-container ' +
          (testContainerExpanded ? 'user-tests-container-expanded' : '')
        }
      >
        {props.children}
      </div>
    </Fragment>
  );
};

export default VerticallyExpandingTestsContainer;
