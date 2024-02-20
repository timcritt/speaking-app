//Renders conditionally the FCE Part 4 view/edit components

import React, { useContext, useState } from "react";

//Custom Components
import CAEPart2View from "./CAEPart2View";
import { Part4Context } from "context/Part4Context";
import { TestModalContext } from "context/TestModalContext";
import EditCAEPart2 from "./EditCAEPart2";

const CAEPart2ModeSelector = ({ docToFetchRef }) => {
	const context = useContext(Part4Context);
	const { setEditMode, editMode, setIsOpen } = useContext(TestModalContext);

	if (editMode) {
		return (
			<EditCAEPart2
				docToFetchRef={docToFetchRef}
				setEditMode={setEditMode}
				context={context}
				handleShowModal={setIsOpen}
			/>
		);
	}

	return (
		<CAEPart2View
			docToFetchRef={docToFetchRef}
			setEditMode={setEditMode}
			context={context}
		/>
	);
};

export default CAEPart2ModeSelector;
