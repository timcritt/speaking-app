import React from 'react';
import { FCEPart3Context } from 'context/FCEPart3Context';
import Part3 from 'components/FCEPart3/Part3';
import { FCEPart3 } from 'APIHandlers/firebaseConsts';

const FCEPart3View = (props) => {
  return <Part3 context={FCEPart3Context} {...props} testType={FCEPart3} />;
};

export default FCEPart3View;
