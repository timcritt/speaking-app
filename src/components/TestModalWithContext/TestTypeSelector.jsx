import React from "react";

//custom components
import FCEPart2ModeSelector from "components/FCEPart2/FCEPart2ModeSelector";
import FCEPart3ModeSelector from "components/FCEPart3/FCEPart3ModeSelector";
import FCEPart4ModeSelector from "components/FCEPart4ModeSelector";
import CAEPart2ModeSelector from "components/CAEPart2/CAEPart2ModeSelector";
import CAEPart3ModeSelector from "components/CAEPart3/CAEPart3ModeSelector";
import CAEPart4ModeSelector from "components/CAEPart4/CAEPart4ModeSelector";

//API Constants
import {
	FCEPart2,
	FCEPart3,
	FCEPart4,
	CAEPart2,
	CAEPart3,
	CAEPart4,
} from "APIHandlers/firebaseConsts";

const TestTypeSelector = ({
	testType,
	docToFetchRef,
	editMode,
	setEditMode,
}) => {
	switch (testType) {
		case FCEPart2:
			return (
				<FCEPart2ModeSelector
					docToFetchRef={docToFetchRef}
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			);
		case FCEPart3:
			return (
				<FCEPart3ModeSelector
					docToFetchRef={docToFetchRef}
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			);
		case FCEPart4:
			return (
				<FCEPart4ModeSelector
					docToFetchRef={docToFetchRef}
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			);
		case CAEPart2:
			return (
				<CAEPart2ModeSelector
					docToFetchRef={docToFetchRef}
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			);
		case CAEPart3:
			return (
				<CAEPart3ModeSelector
					docToFetchRef={docToFetchRef}
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			);
		case CAEPart4:
			return (
				<CAEPart4ModeSelector
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
