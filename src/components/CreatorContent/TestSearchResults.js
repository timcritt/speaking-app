import React, { cloneElement } from "react";
import { Link } from "react-router-dom";
import TestPreview from "components/TestPreview/TestPreview";

const TestSearchResults = React.memo(({ tests, testType, children }) => {
	return (
		<div className="all-tests-container">
			{tests && tests.length === 0 && (
				<div>
					no tests! <Link to={`/Edit${testType}/new`}>create one</Link>
				</div>
			)}
			{tests &&
				tests.map((test) => {
					return (
						<TestPreview
							key={test.id}
							testId={test.id}
							testTags={test.tags}
							questionOne={test.questionOne}
							testType={testType}
						>
							{cloneElement(children, { test: test })}
						</TestPreview>
					);
				})}
		</div>
	);
});

export default TestSearchResults;
