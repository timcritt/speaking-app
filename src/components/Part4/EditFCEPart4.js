import React, { useContext } from "react";

//custom components
import EditPart4 from "components/Part4/EditPart4";

//context
import { Part4Context } from "context/Part4Context";

const EditFCEPart4 = ({ setEditMode, docToFetchRef, handleCloseModal }) => {
	const context = useContext(Part4Context);
	console.log(context);
	return (
		<EditPart4
			{...context}
			setEditMode={setEditMode}
			docToFetchRef={docToFetchRef}
			testType={"FCEPart4"}
			handleCloseModal={handleCloseModal}
		/>
	);
};

export default EditFCEPart4;
