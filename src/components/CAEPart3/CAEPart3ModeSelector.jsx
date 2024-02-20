import React, { useContext, useState } from "react";

//3rd party components
import CAEPart3View from "./CAEPart3View";
import EditCAEPart3 from "./EditCAEPart3";
import { CAEPart3Context } from "context/CAEPart3Context";
import { TestModalContext } from "context/TestModalContext";

const FCEPart3ModeSelector = ({ docToFetchRef }) => {
	const context = useContext(CAEPart3Context);
	const { setEditMode, editMode, setIsOpen } = useContext(TestModalContext);

	if (editMode) {
		return (
			<EditCAEPart3
				docToFetchRef={docToFetchRef}
				setEditMode={setEditMode}
				context={context}
				handleShowModal={setIsOpen}
			/>
		);
	}

	return (
		<CAEPart3View
			docToFetchRef={docToFetchRef}
			setEditMode={setEditMode}
			context={context}
		/>
	);
};

export default FCEPart3ModeSelector;
