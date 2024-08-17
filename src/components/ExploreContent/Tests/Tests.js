import React from "react";

//Custom components
import TestPreviewFactory from "components/TestPreview/TestPreviewFactory";

//This component is used to display all the tests in the explore content page by mapping over the results array and creating a TestPreview component for each test of the correct type
const Tests = React.memo(({ results = [], testType }) => {
	return (
		<main>
			<div className="explore-content-main">
				<div className="all-tests-container">
					{results && results.length > 0 ? (
						results.map((doc) => TestPreviewFactory(testType, doc))
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
