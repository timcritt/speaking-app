import React, { useContext } from "react";

//custom components
import Part4 from "components/Part4/Part4";

//API Constants
import { FCEPart4 } from "APIHandlers/firebaseConsts";

//Custom hooks
import useLoadTestIntoComponent from "hooks/useLoadTestIntoComponent";

const FCEPart4View = ({ context, setEditMode, docToFetchRef }) => {
	//fetch the test
	useLoadTestIntoComponent(
		FCEPart4,
		docToFetchRef,
		context.resetState,
		context.updateTest,
		context.updateHasFetched,
		context.docRef
	);

	return (
		<Part4
			time={24000}
			testType={FCEPart4}
			docToFetchRef
			setEditMode={setEditMode}
			docRef={context.docRef}
			questionOne={context.questionOne}
			questionTwo={context.questionTwo}
			questionThree={context.questionThree}
			questionFour={context.questionFour}
			questionFive={context.questionFive}
			questionSix={context.questionSix}
			creatorId={context.creatorId}
			testTags={context.testTags}
			updateTest
			resetState={context.resetState}
			updateHasFetched={context.updateHasFetched}
		/>
	);
};

export default FCEPart4View;
