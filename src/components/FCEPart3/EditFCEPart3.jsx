import React, { useContext } from "react";

import EditPart3 from "components/Part3Common/EditPart3";
import { FCEPart3 } from "APIHandlers/firebaseConsts";

const EditFCEPart3 = ({
	setEditMode,
	docToFetchRef,
	context,
	handleShowModal,
}) => {
	return (
		<EditPart3
			{...context}
			setEditMode={setEditMode}
			docToFetchRef={docToFetchRef}
			testType={FCEPart3}
			handleShowModal={handleShowModal}
		/>
	);
};

export default EditFCEPart3;
