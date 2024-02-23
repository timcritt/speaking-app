import React, { Fragment, useState, useContext } from "react";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import getTestsById from "../../../APIHandlers/getTestsById";
import TestPreview from "components/TestPreview/TestPreview";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import {
	FCEPart2,
	FCEPart3,
	FCEPart4,
	CAEPart2,
	CAEPart3,
	CAEPart4,
} from "APIHandlers/firebaseConsts";
import Part3TestPreviewContent from "components/Part3Common/Part3TestPreviewContent";
import FCEPart2TestPreviewContent from "components/FCEPart2/FCEPart2TestPreviewContent/FCEPart2TestPreviewContent";
import CAEPart2TestPreviewContent from "components/CAEPart2/CAEPart2TestPreviewContent";
import getFolderTestsJunctions from "APIHandlers/getFolderTestsJunctions";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteButton from "components/common/DeleteButton";
import { firebaseAuth } from "../../../context/AuthProvider";

import LoadingBar from "components/LoadingBar/LoadingBar";
import Part4TestPreviewContent from "components/Part4/Part4TestPreviewContent";

const VerticallyExpandingFolder = ({ folder }) => {
	const [FCEPart2Tests, setFCEPart2Tests] = useState(null);
	const [FCEPart3Tests, setFCEPart3Tests] = useState(null);
	const [FCEPart4Tests, setFCEPart4Tests] = useState(null);
	const [CAEPart2Tests, setCAEPart2Tests] = useState(null);
	const [CAEPart3Tests, setCAEPart3Tests] = useState(null);
	const [CAEPart4Tests, setCAEPart4Tests] = useState(null);

	const [fetching, setFetching] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [testContainerExpanded, setTestContainerExpanded] = useState(false);

	//context
	const { userId } = useContext(firebaseAuth);

	const toggleExpandContainer = () => {
		if (folder.testCount > 0) {
			if (!fetched) {
				const fetchTests = async () => {
					setFetching(true);
					//returns an array of the testIds in the folder
					const folderContent = await getFolderTestsJunctions(folder.id);

					// Fetch all test types concurrently
					const [
						newFCEPart2Tests,
						newFCEPart3Tests,
						newFCEPart4Tests,
						newCAEPart2Tests,
						newCAEPart3Tests,
						newCAEPart4Tests,
					] = await Promise.all([
						getTestsById(folderContent, FCEPart2),
						getTestsById(folderContent, FCEPart3),
						getTestsById(folderContent, FCEPart4),
						getTestsById(folderContent, CAEPart2),
						getTestsById(folderContent, CAEPart3),
						getTestsById(folderContent, CAEPart4),
					]);

					// Set all states after all fetches are done
					setFCEPart2Tests(newFCEPart2Tests);
					setFCEPart3Tests(newFCEPart3Tests);
					setFCEPart4Tests(newFCEPart4Tests);
					setCAEPart2Tests(newCAEPart2Tests);
					setCAEPart3Tests(newCAEPart3Tests);
					setCAEPart4Tests(newCAEPart4Tests);

					setFetching(false);
					setTestContainerExpanded((prevState) => !prevState);
				};

				fetchTests();
				setFetched(true);
			} else {
				setTestContainerExpanded((prevState) => !prevState);
			}
		} else {
			setTestContainerExpanded(false);
		}
	};

	return (
		<Fragment>
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
						<div className="folder-info-container">
							<FolderOutlinedIcon className="folder-summary-icon" />
							<div className="folder-icon-title-container">
								<span className="folder-title">{folder.title}</span>
								<span>({folder.testCount})</span>
							</div>
						</div>
						<div className="tests-container-button">
							{testContainerExpanded ? (
								<RemoveRoundedIcon />
							) : (
								<ArrowDropDownIcon />
							)}
						</div>
						<div className="tests-container-button">
							<span className="delete-folder-button-container">
								{userId === folder.creatorId && (
									<DeleteButton
										deleteItemType="folder"
										iconColour="inherit"
										itemId={folder.id}
										firestoreCollection={"folders"}
									/>
								)}
							</span>
						</div>
					</div>

					<div
						className={
							"user-tests-container " +
							(testContainerExpanded ? "user-tests-container-expanded" : "")
						}
					>
						<div className="all-tests-container">
							{FCEPart2Tests &&
								FCEPart2Tests.map((test) => {
									return (
										<TestPreview
											key={test.id}
											testId={test.id}
											questionOne={test.questionOne}
											testType={FCEPart2}
											testTags={test.tags}
										>
											<FCEPart2TestPreviewContent test={test} />
										</TestPreview>
									);
								})}
							{FCEPart3Tests &&
								FCEPart3Tests.map((test) => {
									return (
										<TestPreview
											key={test.id}
											testId={test.id}
											questionOne={test.questionOne}
											testType={FCEPart3}
											testTags={test.tags}
										>
											<Part3TestPreviewContent test={test} />
										</TestPreview>
									);
								})}
							{FCEPart4Tests &&
								FCEPart4Tests.map((test) => {
									return (
										<TestPreview
											key={test.id}
											testId={test.id}
											testType={FCEPart4}
											testTags={test.tags}
										>
											<Part4TestPreviewContent test={test} />
										</TestPreview>
									);
								})}
							{CAEPart2Tests &&
								CAEPart2Tests.map((test) => {
									return (
										<TestPreview
											key={test.id}
											testId={test.id}
											questionOne={test.questionOne}
											testType={CAEPart2}
											testTags={test.tags}
										>
											<CAEPart2TestPreviewContent test={test} />
										</TestPreview>
									);
								})}
							{CAEPart3Tests &&
								CAEPart3Tests.map((test) => {
									return (
										<TestPreview
											key={test.id}
											testId={test.id}
											questionOne={test.questionOne}
											testType={CAEPart3}
											testTags={test.tags}
										>
											<Part3TestPreviewContent
												test={test}
												bottomLabel={"CAE Part 3"}
											/>
										</TestPreview>
									);
								})}
							{CAEPart4Tests &&
								CAEPart4Tests.map((test) => {
									return (
										<TestPreview
											key={test.id}
											testId={test.id}
											testType={CAEPart4}
											testTags={test.tags}
										>
											<Part4TestPreviewContent
												test={test}
												bottomLabel={"CAE Part 4"}
											/>
										</TestPreview>
									);
								})}
						</div>
					</div>
				</LoadingBar>
			</div>
		</Fragment>
	);
};

export default VerticallyExpandingFolder;
