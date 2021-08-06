import React from 'react';
import { CAEPart3Context } from 'context/CAEPart3Context';
import Part3 from 'components/FCEPart3/Part3';

const CAEPart3View = (props) => {
  return <Part3 context={CAEPart3Context} {...props} testType={'CAEPart3'} />;
};

export default CAEPart3View;
