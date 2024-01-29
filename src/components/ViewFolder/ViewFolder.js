import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getFolder from "../../APIHandlers/getFolder";
import getTestsById from "../../APIHandlers/getTestsById";
import TestPreview from "components/TestPreview/TestPreview";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import CreatorInfo from "../common/CreatorInfo";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import ShareButton from "../common/ShareButton";
import {
	FCEPart2,
	FCEPart3,
	CAEPart2,
	CAEPart3,
} from "APIHandlers/firebaseConsts";
import Part3TestPreviewContent from "components/Part3Common/Part3TestPreviewContent";
import FCEPart2TestPreviewContent from "components/FCEPart2/FCEPart2TestPreviewContent/FCEPart2TestPreviewContent";
import CAEPart2TestPreviewContent from "components/CAEPart2/CAEPart2TestPreviewContent";
import LinearProgress from "@mui/material/LinearProgress";
import getFolderTestsJunctions from "APIHandlers/getFolderTestsJunctions";

const ViewFolder = () => {
	const [FCEPart2Tests, setFCEPart2Tests] = useState(null);
	const [FCEPart3Tests, setFCEPart3Tests] = useState(null);
	const [CAEPart2Tests, setCAEPart2Tests] = useState(null);
	const [CAEPart3Tests, setCAEPart3Tests] = useState(null);

	const [folderTitle, setFolderTitle] = useState(null);
	const [creatorId, setCreatorId] = useState(null);
	const [hasFetched, setHasFetched] = useState(false);
	//get folder id from params
	const params = useParams();

	//get the folder from firestore

	useEffect(() => {
		var isMounted = true;
		if (params) {
			const fetchTests = async () => {
				//returns an array of the testIds in the folder
				const folderContent = await getFolderTestsJunctions(params.folderId);

				const folder = await getFolder(params.folderId);
				const newFCEPart2Tests = await getTestsById(folderContent, FCEPart2);
				const newFCEPart3Tests = await getTestsById(folderContent, FCEPart3);
				const newCAEPart2Tests = await getTestsById(folderContent, CAEPart2);
				const newCAEPart3Tests = await getTestsById(folderContent, CAEPart3);

				if (isMounted) {
					setFolderTitle(folder.title);
					setCreatorId(folder.userId);

					setFCEPart2Tests(newFCEPart2Tests);
					setFCEPart3Tests(newFCEPart3Tests);
					setCAEPart2Tests(newCAEPart2Tests);
					setCAEPart3Tests(newCAEPart3Tests);
					setHasFetched(true);
				}
			};
			fetchTests();
		}
		return () => {
			isMounted = false;
		};
	}, [params]);
	if (hasFetched) {
		return (
			<Fragment>
				<div className="view-folder-header">
					<FolderOutlinedIcon className="folder-summary-icon" />
					<span className="dashboard-user-name">{folderTitle}</span>
					<span className="close-folder-button">
						<Link className="nav-link" to={"/tests"}>
							<CloseIcon />
						</Link>
					</span>
				</div>

				{FCEPart2Tests &&
					FCEPart2Tests.map((test) => {
						return (
							<Link
								className="test-preview-link"
								to={`/FCEPart2/${test.id}`}
								key={`fce2` + test.id}
							>
								<TestPreview
									key={test.id}
									testId={test.id}
									question={test.question}
									testType={FCEPart2}
									testTags={test.tags}
								>
									<FCEPart2TestPreviewContent test={test} />
								</TestPreview>
							</Link>
						);
					})}
				{FCEPart3Tests &&
					FCEPart3Tests.map((test) => {
						return (
							<Link
								className="test-preview-link"
								to={`/FCEPart3/${test.id}`}
								key={test.id}
							>
								<TestPreview
									testId={test.id}
									question={test.question}
									testType={FCEPart3}
									testTags={test.tags}
								>
									<Part3TestPreviewContent
										test={test}
										bottomLabel="FCE Part 3"
									/>
								</TestPreview>
							</Link>
						);
					})}
				{CAEPart2Tests &&
					CAEPart2Tests.map((test) => {
						return (
							<Link
								className="test-preview-link"
								to={`/CAEPart2/${test.id}`}
								key={test.id}
							>
								<TestPreview
									testId={test.id}
									question={test.questionOne}
									testType={CAEPart2}
									testTags={test.tags}
								>
									<CAEPart2TestPreviewContent test={test} />
								</TestPreview>
							</Link>
						);
					})}
				{CAEPart3Tests &&
					CAEPart3Tests.map((test) => {
						return (
							<Link
								className="test-preview-link"
								to={`/CAEPart2/${test.id}`}
								key={test.id}
							>
								<TestPreview
									testId={test.id}
									question={test.questionOne}
									testType={CAEPart3}
									testTags={test.tags}
								>
									<Part3TestPreviewContent
										test={test}
										bottomLabel={"FCE Part 3"}
									/>
								</TestPreview>
							</Link>
						);
					})}

				<div className="tool-bar-row">
					{creatorId && <CreatorInfo creatorId={creatorId} />}

					<div className="tool-btn-container">
						<ShareButton className="tool-bar-btn"></ShareButton>
					</div>
				</div>
			</Fragment>
		);
	} else {
		return (
			<div className={"full-width"}>
				<LinearProgress />
			</div>
		);
	}
};

export default ViewFolder;
