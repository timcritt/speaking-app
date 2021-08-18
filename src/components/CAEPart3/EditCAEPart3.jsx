import React, { useContext } from 'react';

import EditPart3 from 'components/Part3Common/EditPart3';
import { CAEPart3 } from 'APIHandlers/firebaseConsts';
import { CAEPart3Context } from 'context/CAEPart3Context';

const EditCAEPart3 = (props) => {
  const context = useContext(CAEPart3Context);
  return <EditPart3 context={context} {...props} testType={CAEPart3} />;
};

export default EditCAEPart3;
