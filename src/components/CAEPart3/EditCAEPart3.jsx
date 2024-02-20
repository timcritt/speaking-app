import React, { useContext } from "react";

import EditPart3 from "components/Part3Common/EditPart3";
import { CAEPart3 } from "APIHandlers/firebaseConsts";

const EditCAEPart3 = ({
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
			testType={CAEPart3}
			handleShowModal={handleShowModal}
		/>
	);
};

export default EditCAEPart3;
