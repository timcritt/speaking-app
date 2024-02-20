import React, { useContext } from "react";

//custom components
import EditPart4 from "components/Part4/EditPart4";

//API Constants
import { CAEPart4 } from "APIHandlers/firebaseConsts";

//context
import { Part4Context } from "context/Part4Context";

const EditCAEPart4 = ({ setEditMode, docToFetchRef, handleCloseModal }) => {
	const context = useContext(Part4Context);
	return (
		<EditPart4
			{...context}
			setEditMode={setEditMode}
			docToFetchRef={docToFetchRef}
			testType={CAEPart4}
			handleCloseModal={handleCloseModal}
		/>
	);
};

export default EditCAEPart4;
