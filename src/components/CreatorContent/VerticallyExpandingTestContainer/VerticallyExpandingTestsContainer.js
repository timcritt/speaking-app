import React, { useState, cloneElement } from "react";

//icons-material
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import getFilteredTests from "APIHandlers/getFilteredTests";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

//custom hooks
import useFilterTests from "./useFilterTests";

//3rd party hooks
import { useQuery } from "@tanstack/react-query";

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
	const [filteredTests, setFilteredTests] = useState(null);

	//react-query is disabled upon mount with this variable to prevent initial API call on mount
	const [hasFetched, setHasFetched] = useState(false);

	const toggleExpandContainer = async () => {
		//Only makes API call on first time container is expanded
		if (!hasFetched) {
			const newTests = await getFilteredTests(creatorId, null, testType);

			//Enbales react-query after fetching

			setTestContainerExpanded((prevState) => !prevState);

			return newTests;
		}
		setTestContainerExpanded((prevState) => !prevState);
		return filteredTests;
	};

	const testQuery = useQuery({
		queryKey: [testType],
		queryFn: toggleExpandContainer,
		enabled: hasFetched,
		refetchOnWindowFocus: false,
	});

	useFilterTests(
		testQuery.data,
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
			<LoadingBar fetching={testQuery.isLoading}>
				<div
					className="tests-container-heading"
					onClick={(e) => {
						testQuery.refetch();
						setHasFetched(true);
					}}
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
				</div>
			</LoadingBar>
		</div>
	);
};

export default VerticallyExpandingTestsContainer;
