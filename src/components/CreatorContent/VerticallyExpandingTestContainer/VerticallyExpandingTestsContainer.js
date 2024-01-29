import React, { useState, cloneElement } from "react";

//icons-material
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import getFilteredTests from "APIHandlers/getFilteredTests";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

//custom hooks
import useFilterTests from "./useFilterTests";

//custom components
import LoadingBar from "components/LoadingBar/LoadingBar";

const VerticallyExpandingTestsContainer = ({
	creatorId,
	testType,
	buttonLabel,
	tagFilterTerm,
	sortBy,
	questionFilterTerm,
	children,
}) => {
	const [testContainerExpanded, setTestContainerExpanded] = useState(false);
	const [tests, setTests] = useState(null);
	const [filteredTests, setFilteredTests] = useState(null);
	const [fetching, setFetching] = useState(false);

	const toggleExpandContainer = () => {
		//only makes API call on first time container is expanded
		if (!tests) {
			const fetchTests = async () => {
				setFetching(true);
				let userTests = await getFilteredTests(creatorId, null, testType);
				//stores a copy of ALL tests to allow for all tests to be displayed after removing filters without another API call
				setTests(userTests);
				//stores the tests to be displayed
				setFilteredTests(userTests);
				setFetching(false);
				setTestContainerExpanded(true);
			};

			fetchTests();
		} else {
			setTestContainerExpanded((prevState) => !prevState);
		}
	};

	useFilterTests(
		tests,
		tagFilterTerm,
		sortBy,
		questionFilterTerm,
		setFilteredTests
	);

	return (
		<div
			className={`tests-container-header ${
				testContainerExpanded ? "test-container-header-expanded" : ""
			} `}
		>
			<LoadingBar fetching={fetching}>
				<div
					className="tests-container-heading"
					onClick={(e) => toggleExpandContainer(e)}
				>
					<h2>{buttonLabel}</h2>
					<div className="tests-container-button">
						{testContainerExpanded ? (
							<RemoveRoundedIcon />
						) : (
							<ArrowDropDownIcon />
						)}
					</div>
				</div>
				<div
					className={
						"user-tests-container " +
						(testContainerExpanded ? "user-tests-container-expanded" : "")
					}
				>
					{cloneElement(children, { tests: filteredTests })}
				</div>{" "}
			</LoadingBar>
		</div>
	);
};

export default VerticallyExpandingTestsContainer;
