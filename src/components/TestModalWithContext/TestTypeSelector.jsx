import React from "react";

//custom components
import FCEPart2ModeSelector from "components/FCEPart2/FCEPart2ModeSelector";
import FCEPart3ModeSelector from "components/FCEPart3/FCEPart3ModeSelector";
import FCEPart4ModeSelector from "components/FCEPart4ModeSelector";
import CAEPart2ModeSelector from "components/CAEPart2/CAEPart2ModeSelector";
import CAEPart3ModeSelector from "components/CAEPart3/CAEPart3ModeSelector";
import CAEPart4ModeSelector from "components/CAEPart4/CAEPart4ModeSelector";

//Context Providers
import { CAEPart2ContextProvider } from "context/CAEPart2Context";
import { CAEPart3ContextProvider } from "context/CAEPart3Context";
import { Part4ContextProvider } from "context/Part4Context";
import { FCEPart2ContextProvider } from "context/FCEPart2Context";
import { FCEPart3ContextProvider } from "context/FCEPart3Context";

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
				<FCEPart2ContextProvider>
					<FCEPart2ModeSelector
						docToFetchRef={docToFetchRef}
						editMode={editMode}
						setEditMode={setEditMode}
					/>
				</FCEPart2ContextProvider>
			);
		case FCEPart3:
			return (
				<FCEPart3ContextProvider>
					<FCEPart3ModeSelector
						docToFetchRef={docToFetchRef}
						editMode={editMode}
						setEditMode={setEditMode}
					/>
				</FCEPart3ContextProvider>
			);
		case FCEPart4:
			return (
				<Part4ContextProvider>
					<FCEPart4ModeSelector
						docToFetchRef={docToFetchRef}
						editMode={editMode}
						setEditMode={setEditMode}
					/>
				</Part4ContextProvider>
			);
		case CAEPart2:
			return (
				<CAEPart2ContextProvider>
					<CAEPart2ModeSelector
						docToFetchRef={docToFetchRef}
						editMode={editMode}
						setEditMode={setEditMode}
					/>
				</CAEPart2ContextProvider>
			);
		case CAEPart3:
			return (
				<CAEPart3ContextProvider>
					<CAEPart3ModeSelector
						docToFetchRef={docToFetchRef}
						editMode={editMode}
						setEditMode={setEditMode}
					/>
				</CAEPart3ContextProvider>
			);
		case CAEPart4:
			return (
				<Part4ContextProvider>
					<CAEPart4ModeSelector
						docToFetchRef={docToFetchRef}
						editMode={editMode}
						setEditMode={setEditMode}
					/>
				</Part4ContextProvider>
			);
		default:
			return "default";
	}
};

export default TestTypeSelector;
