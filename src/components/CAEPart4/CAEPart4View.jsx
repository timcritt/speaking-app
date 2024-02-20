import React, { useContext } from "react";

//custom components
import Part4 from "components/Part4/Part4";

//API Constants
import { CAEPart4 } from "APIHandlers/firebaseConsts";

//context
import { Part4Context } from "context/Part4Context";

const CAEPart4View = (props) => {
	const context = useContext(Part4Context);
	return <Part4 {...context} {...props} time={24000} testType={CAEPart4} />;
};

export default CAEPart4View;
