import React from "react";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { folders } from "../../APIHandlers/firebaseConsts";
import deleteRecordFirestore from "../../APIHandlers/deleteRecordFirestore";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useHistory } from "react-router-dom";

import CreatorInfo from "./CreatorInfo";

const FolderSummary = ({ folder }) => {
	const history = useHistory();

	return (
		<div className="folder-container">
			<div className="folder-info-container">
				<FolderOutlinedIcon
					className="folder-summary-icon"
					onClick={() => history.push(`/folder/${folder.id}`)}
				/>
				<div className="folder-icon-title-container">
					<span className="folder-title">{folder.title}</span>
					<span>({folder.testCount})</span>
				</div>
			</div>
			<div className="folder-summary-toolbar">
				<CreatorInfo creatorId={folder.creatorId} />
				<DeleteForeverOutlinedIcon
					className="delete-folder-btn"
					onClick={() => deleteRecordFirestore(folder.id, folders)}
				/>
			</div>
		</div>
	);
};

export default FolderSummary;
