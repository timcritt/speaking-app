import React from "react";
import { FCEPart3Context } from "context/FCEPart3Context";
import Part3ViewOverlay from "components/Part3Common/Part3ViewOverlay";
import { FCEPart3 } from "APIHandlers/firebaseConsts";

const FCEPart3View = (props) => {
	return (
		<Part3ViewOverlay
			part3Context={FCEPart3Context}
			{...props}
			testType={FCEPart3}
			testId={props.testId}
			setEditMode={props.setEditMode}
		/>
	);
};

export default FCEPart3View;
