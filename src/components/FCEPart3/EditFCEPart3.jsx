import React, { useContext } from "react";

import EditPart3 from "components/Part3Common/EditPart3";

const EditFCEPart3 = ({ setEditMode, docToFetchRef, context }) => {
	return (
		<EditPart3
			{...context}
			setEditMode={setEditMode}
			docToFetchRef={docToFetchRef}
		/>
	);
};

export default EditFCEPart3;
