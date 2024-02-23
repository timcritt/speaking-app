//Renders conditionally the FCE Part 4 view/edit components

import React, { useContext, useState } from "react";

//3rd party components
import EditCAEPart4 from "components/CAEPart4/EditCAEPart4";
import CAEPart4View from "components/CAEPart4/CAEPart4View";
import { Part4Context } from "context/Part4Context";
import { TestModalContext } from "context/TestModalContext";

const CAEPart4ModeSelector = ({ docToFetchRef }) => {
	const context = useContext(Part4Context);

	const { setEditMode, editMode, setIsOpen } = useContext(TestModalContext);

	if (editMode) {
		return (
			<EditCAEPart4
				docToFetchRef={docToFetchRef}
				setEditMode={setEditMode}
				context={context}
				handleCloseModal={setIsOpen}
			/>
		);
	}

	return (
		<CAEPart4View
			docToFetchRef={docToFetchRef}
			setEditMode={setEditMode}
			context={context}
		/>
	);
};

export default CAEPart4ModeSelector;
