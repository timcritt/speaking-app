import React, { Fragment, useState, useEffect, useCallback } from "react";
import Tests from "./Tests/Tests";
import getFilteredTests from "../../APIHandlers/getFilteredTests";
import LinearProgress from "@mui/material/LinearProgress";
import useComponentVisible from "hooks/useComponentVisible";
import FilterMenuMobile from "components/CreatorContent/FilterMenuMobile";
import FilterMenuDesktop from "components/CreatorContent/FilterMenuDesktop";
import ExamTypeMenuItems from "components/ExploreContent/ExamTypeMenuItems";

const AllTests = React.memo(({ creatorId }) => {
	//state
	const [sortBy, setSortBy] = useState(null);
	const [tagFilterTerm, setTagFilterTerm] = useState(null);
	const [questionFilterTerm, setQuestionFilterTerm] = useState("");
	const [results, setResults] = useState(null);
	const [testType, setTestType] = useState("Part2");
	const [searchButtonClicked, setSearchButtonClicked] = useState(false);
	const [hasFetched, setHasFetched] = useState(false);
	const [exam, setExam] = useState("FCE");

	const itemOne = useComponentVisible(false);
	const itemTwo = useComponentVisible(false);
	const itemThree = useComponentVisible(false);
	const itemFour = useComponentVisible(false);
	const itemFive = useComponentVisible(false);

	const [filterMenuVisible, setFilterMenuVisible] = useState(false);

	const handleSetQuestionFilterTerm = (e) => {
		setQuestionFilterTerm(e.currentTarget.value);
	};
	const handleSetRecent = (e, label) => {
		e.stopPropagation();
		setSortBy(label);
		itemTwo.setIsComponentVisible(false);
	};

	const handleSetOld = (e, label) => {
		e.stopPropagation();
		setSortBy(label);
		itemTwo.setIsComponentVisible(false);
	};

	const handleSetTags = (tag, selected) => {
		if (!selected) {
			//adds tag to the state
			setTagFilterTerm(tag);
		} else {
			//removes the tag from the state
			setTagFilterTerm("");
		}
	};

	const handleResetFilters = () => {
		setSortBy(null);
		setTagFilterTerm(null);
		setQuestionFilterTerm("");
		itemThree.setIsComponentVisible(false);
	};

	const handleChangeTestType = (e, testType) => {
		itemFive.setIsComponentVisible(false);
		e.stopPropagation();
		setTestType(testType);
	};

	const handleChangeExam = (e, exam) => {
		itemFour.setIsComponentVisible(false);
		e.stopPropagation();
		setExam(exam);
	};

	const toggleFilterMenuVisible = () => {
		setFilterMenuVisible((prevState) => !prevState);
	};

	const handleSearchClick = useCallback(async () => {
		setHasFetched(false);
		setSearchButtonClicked(true);

		await getFilteredTests(creatorId, questionFilterTerm, exam + testType).then(
			async (data) => {
				var filteredDocs = JSON.parse(JSON.stringify(data));
				//sort by date created
				if (sortBy === "oldest") {
					filteredDocs = await filteredDocs.sort((a, b) => {
						return a.createdAt.seconds - b.createdAt.seconds;
					});
				} else if (sortBy === "newest") {
					filteredDocs = await filteredDocs.sort((a, b) => {
						return b.createdAt.seconds - a.createdAt.seconds;
					});
				}
				//filter by topic tag
				if (tagFilterTerm) {
					filteredDocs = filteredDocs.filter((doc) =>
						doc.tags.includes(tagFilterTerm)
					);
				}

				//sort alphabetically by question

				setResults(filteredDocs);
				setHasFetched(true);
			}
		);
	}, [creatorId, exam, questionFilterTerm, sortBy, tagFilterTerm, testType]);

	const handleSortRadioChange = (e) => {
		setSortBy(e.currentTarget.value);
	};

	useEffect(() => {
		handleSearchClick();
	}, [handleSearchClick, questionFilterTerm]);

	return (
		<Fragment>
			{/* overlay filter menu for small screens - hidden by default and opens on click*/}
			<FilterMenuMobile
				filterMenuVisible={filterMenuVisible}
				toggleFilterMenuVisible={toggleFilterMenuVisible}
				tagFilterTerm={tagFilterTerm}
				handleSetTags={handleSetTags}
				sortBy={sortBy}
				handleSortRadioChange={handleSortRadioChange}
				questionFilterTerm={questionFilterTerm}
				handleSetQuestionFilterTerm={handleSetQuestionFilterTerm}
				handleResetFilters={handleResetFilters}
			/>

			{/* filter menu for large screens. visible only for large screens*/}
			<div className="search-terms-container">
				<FilterMenuDesktop
					toggleFilterMenuVisible={toggleFilterMenuVisible}
					tagFilterTerm={tagFilterTerm}
					itemOne={itemOne}
					itemTwo={itemTwo}
					sortBy={sortBy}
					handleSetRecent={handleSetRecent}
					handleSetOld={handleSetOld}
					questionFilterTerm={questionFilterTerm}
					handleSetQuestionFilterTerm={handleSetQuestionFilterTerm}
					handleResetFilters={handleResetFilters}
					handleSetTags={handleSetTags}
				>
					<ExamTypeMenuItems
						itemFour={itemFour}
						itemFive={itemFive}
						testType={testType}
						exam={exam}
						handleChangeTestType={handleChangeTestType}
						handleChangeExam={handleChangeExam}
					/>
				</FilterMenuDesktop>
			</div>

			{!hasFetched && searchButtonClicked && <LinearProgress />}
			{hasFetched && <Tests testType={exam + testType} results={results} />}
		</Fragment>
	);
});

export default AllTests;
