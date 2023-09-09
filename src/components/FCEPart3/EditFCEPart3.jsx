import React, { useContext } from "react";

import EditPart3 from "components/Part3Common/EditPart3";
import { FCEPart3 } from "APIHandlers/firebaseConsts";
import { FCEPart3Context } from "context/FCEPart3Context";

const EditFCEPart3 = ({ docRef, setEditMode }) => {
	const context = useContext(FCEPart3Context);
	return (
		<EditPart3
			setEditMode={setEditMode}
			docRef={docRef}
			testType={FCEPart3}
			{...context}
		/>
	);
};

export default EditFCEPart3;
