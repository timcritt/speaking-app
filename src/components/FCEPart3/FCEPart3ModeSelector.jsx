import React, { useContext, useState } from "react";

//3rd party components
import FCEPart3View from "./FCEPart3View";
import EditFCEPart3 from "./EditFCEPart3";
import { FCEPart3Context } from "context/FCEPart3Context";
import { TestModalContext } from "context/TestModalContext";

const FCEPart3ModeSelector = ({ docToFetchRef }) => {
	const context = useContext(FCEPart3Context);
	const { setEditMode, editMode, setIsOpen } = useContext(TestModalContext);

	if (editMode) {
		return (
			<EditFCEPart3
				docToFetchRef={docToFetchRef}
				setEditMode={setEditMode}
				context={context}
				handleShowModal={setIsOpen}
			/>
		);
	}

	return (
		<FCEPart3View
			docToFetchRef={docToFetchRef}
			setEditMode={setEditMode}
			context={context}
		/>
	);
};

export default FCEPart3ModeSelector;
