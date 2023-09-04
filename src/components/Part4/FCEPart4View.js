import React, { useContext } from "react";

//custom components
import Part4 from "components/Part4/Part4";

//context
import { Part4Context } from "context/Part4Context";

const FCEPart4View = (props) => {
	const context = useContext(Part4Context);
	return <Part4 {...context} {...props} time={24000} testType={"FCEPart4"} />;
};

export default FCEPart4View;
