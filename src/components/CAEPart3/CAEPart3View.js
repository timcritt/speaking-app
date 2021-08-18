import React from 'react';
import { CAEPart3Context } from 'context/CAEPart3Context';
import Part3 from 'components/Part3Common/Part3';
import { CAEPart3 } from 'APIHandlers/firebaseConsts';

const CAEPart3View = (props) => {
  return <Part3 context={CAEPart3Context} {...props} testType={CAEPart3} />;
};

export default CAEPart3View;
