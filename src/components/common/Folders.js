import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

const Folders = ({ folders, testId, children }) => {
	if (folders) {
		return (
			<div className="folders-container">
				{folders &&
					folders.map((folder) => {
						return React.cloneElement(children, {
							key: folder.id,
							folder: folder,
							testId: testId,
						});
					})}
			</div>
		);
	} else {
		return (
			<div className="folders-container">
				<LinearProgress />
			</div>
		);
	}
};

export default Folders;
