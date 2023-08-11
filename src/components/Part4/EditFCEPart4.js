import React, { useContext } from "react";

//custom components
import EditPart4 from "components/Part4/EditPart4";

//context
import { Part4Context } from "context/Part4Context";

const EditFCEPart4 = (props) => {
	const context = useContext(Part4Context);
	//console.log(context);
	return <EditPart4 {...context} {...props} testType={"FCEPart4"} />;
};

export default EditFCEPart4;
