import React from "react";

import Part3ViewOverlay from "components/Part3Common/Part3ViewOverlay";
import { FCEPart3 } from "APIHandlers/firebaseConsts";

const FCEPart3View = ({ setEditMode, docToFetchRef, context }) => {
	return (
		<Part3ViewOverlay
			context={context}
			testType={FCEPart3}
			docToFetchRef={docToFetchRef}
			setEditMode={setEditMode}
		/>
	);
};

export default FCEPart3View;
