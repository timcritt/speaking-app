import React from "react";

//Custom components
import TestPreview from "./TestPreview";
import FCEPart2TestPreviewContent from "../FCEPart2/FCEPart2TestPreviewContent/FCEPart2TestPreviewContent";
import Part3TestPreviewContent from "../Part3Common/Part3TestPreviewContent";
import CAEPart2TestPreviewContent from "../CAEPart2/CAEPart2TestPreviewContent";
import Part4TestPreviewContent from "../Part4/Part4TestPreviewContent";

//API Constants
import {
	FCEPart2,
	FCEPart3,
	FCEPart4,
	CAEPart2,
	CAEPart3,
	CAEPart4,
} from "APIHandlers/firebaseConsts";

//This component is used to create a TestPreview component with the correct content based on the testType
const TestPreviewFactory = (testType, doc) => {
	switch (testType) {
		case FCEPart2:
			return (
				<TestPreview
					testId={doc.id}
					questionOne={doc.questionOne}
					testType={testType}
					key={doc.id}
					testTags={doc.tags}
				>
					<FCEPart2TestPreviewContent test={doc} />
				</TestPreview>
			);
		case FCEPart3:
			return (
				<TestPreview
					testId={doc.id}
					questionOne={doc.questionOne}
					key={doc.id}
					testType={testType}
					testTags={doc.tags}
				>
					<Part3TestPreviewContent test={doc} />
				</TestPreview>
			);
		case CAEPart2:
			return (
				<TestPreview
					testId={doc.id}
					questionOne={doc.questionOne}
					key={doc.id}
					testType={testType}
					testTags={doc.tags}
				>
					<CAEPart2TestPreviewContent test={doc} />
				</TestPreview>
			);
		case CAEPart3:
			return (
				<TestPreview
					testId={doc.id}
					questionOne={doc.questionOne}
					key={doc.id}
					testType={testType}
					testTags={doc.tags}
				>
					<Part3TestPreviewContent test={doc} />
				</TestPreview>
			);
		case FCEPart4:
			return (
				<TestPreview
					testId={doc.id}
					key={doc.id}
					testType={testType}
					testTags={doc.tags}
				>
					<Part4TestPreviewContent test={doc} />
				</TestPreview>
			);
		case CAEPart4:
			return (
				<TestPreview
					testId={doc.id}
					key={doc.id}
					testType={testType}
					testTags={doc.tags}
				>
					<Part4TestPreviewContent test={doc} />
				</TestPreview>
			);
		default:
			console.log("Tests: error in TestPreviewFactory. Default case reached");
			return <h1>fail</h1>;
	}
};

export default TestPreviewFactory;
