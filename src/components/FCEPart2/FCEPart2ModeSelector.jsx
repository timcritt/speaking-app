//Renders conditionally the FCE Part 2 view/edit components

import React, { useContext, useState } from "react";

//3rd party components
import FCEPart2View from "./FCEPart2View";
import EditFCEPart2 from "./EditFCEPart2";
import { FCEPart2Context } from "context/FCEPart2Context";
import { TestModalContext } from "context/TestModalContext";

const FCEPart2ModeSelector = ({ docToFetchRef }) => {
	const context = useContext(FCEPart2Context);
	const { setEditMode, editMode } = useContext(TestModalContext);

	if (editMode) {
		return (
			<EditFCEPart2
				docToFetchRef={docToFetchRef}
				setEditMode={setEditMode}
				context={context}
			/>
		);
	}

	return (
		<FCEPart2View
			docToFetchRef={docToFetchRef}
			setEditMode={setEditMode}
			context={context}
		/>
	);
};

export default FCEPart2ModeSelector;
