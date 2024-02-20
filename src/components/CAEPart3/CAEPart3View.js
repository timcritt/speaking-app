import React from "react";

import Part3ViewOverlay from "components/Part3Common/Part3ViewOverlay";
import { CAEPart3 } from "APIHandlers/firebaseConsts";

const CAEPart3View = ({ setEditMode, docToFetchRef, context }) => {
	return (
		<Part3ViewOverlay
			context={context}
			testType={CAEPart3}
			docToFetchRef={docToFetchRef}
			setEditMode={setEditMode}
		/>
	);
};

export default CAEPart3View;
