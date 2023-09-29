import React from "react";

//constants
import {
	FCEPart2,
	FCEPart3,
	CAEPart2,
	CAEPart3,
} from "APIHandlers/firebaseConsts";

//custom components
import TestPreview from "components/TestPreview/TestPreview";
import FCEPart2TestPreviewContent from "../../FCEPart2/FCEPart2TestPreviewContent/FCEPart2TestPreviewContent";
import CAEPart2TestPreviewContent from "components/CAEPart2/CAEPart2TestPreviewContent";
import Part3TestPreviewContent from "components/Part3Common/Part3TestPreviewContent";
import Part4TestPreviewContent from "components/Part4/Part4TestPreviewContent";

const Tests = React.memo(({ results = [], testType }) => {
	return (
		<main>
			<div className="explore-content-main">
				<div className="all-tests-container">
					{results && results.length > 0 ? (
						results.map((doc) => {
							switch (testType) {
								case FCEPart2:
									return (
										<TestPreview
											testId={doc.id}
											questionOne={doc.questionOne}
											testType={testType}
											key={doc.id}
											testLabel={"test"}
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
								case CAEPart3: {
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
								}
								case "FCEPart4":
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

								default: {
									console.log(
										"Tests: error in switch statement. Default case reached"
									);
								}
							}
							return <h1>fail</h1>;
						})
					) : (
						<div>
							<span>no results!</span>
						</div>
					)}
				</div>
			</div>
		</main>
	);
});

export default Tests;
