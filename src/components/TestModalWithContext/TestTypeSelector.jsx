import React from "react";

import FCEPart2ModeSelector from "components/FCEPart2/FCEPart2ModeSelector";
import FCEPart3ModeSelector from "components/FCEPart3/FCEPart3ModeSelector";
import FCEPart4ModeSelector from "components/FCEPart4ModeSelector";

const TestTypeSelector = ({
	testType,
	docToFetchRef,
	editMode,
	setEditMode,
}) => {
	switch (testType) {
		case "FCEPart2":
			return (
				<FCEPart2ModeSelector
					docToFetchRef={docToFetchRef}
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			);
		case "FCEPart3":
			return (
				<FCEPart3ModeSelector
					docToFetchRef={docToFetchRef}
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			);
		case "FCEPart4":
			return (
				<FCEPart4ModeSelector
					docToFetchRef={docToFetchRef}
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			);
		default:
			return "default";
	}
};

export default TestTypeSelector;
