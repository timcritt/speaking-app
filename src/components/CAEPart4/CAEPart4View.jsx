import React, { useContext } from "react";

//custom components
import Part4 from "components/Part4/Part4";

//API Constants
import { CAEPart4 } from "APIHandlers/firebaseConsts";

//Custom hooks
import useLoadTestIntoComponent from "hooks/useLoadTestIntoComponent";

const CAEPart4View = ({ context, setEditMode, docToFetchRef }) => {
	//Fetch the test
	useLoadTestIntoComponent(
		CAEPart4,
		docToFetchRef,
		context.resetState,
		context.updateTest,
		context.updateHasFetched,
		context.docRef
	);

	return (
		<Part4
			time={24000}
			testType={CAEPart4}
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

export default CAEPart4View;
