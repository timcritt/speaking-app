//Renders conditionally the FCE Part 4 view/edit components

import React, { useContext, useState } from "react";

//3rd party components
import EditFCEPart4 from "./Part4/EditFCEPart4";
import FCEPart4View from "./Part4/FCEPart4View";
import { Part4Context } from "context/Part4Context";
import { TestModalContext } from "context/TestModalContext";

const FCEPart4ModeSelector = ({ docToFetchRef }) => {
	const context = useContext(Part4Context);
	const { setEditMode, editMode, setIsOpen } = useContext(TestModalContext);

	if (editMode) {
		return (
			<EditFCEPart4
				docToFetchRef={docToFetchRef}
				setEditMode={setEditMode}
				context={context}
				handleCloseModal={setIsOpen}
			/>
		);
	}

	return (
		<FCEPart4View
			docToFetchRef={docToFetchRef}
			setEditMode={setEditMode}
			context={context}
		/>
	);
};

export default FCEPart4ModeSelector;
