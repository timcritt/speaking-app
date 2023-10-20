import { Fragment } from "react";

import AddToMyFolders from "components/common/AddToMyFolders";
import ShareButton from "components/common/ShareButton";

//icons
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import FullscreenExitOutlinedIcon from "@material-ui/icons/FullscreenExitOutlined";
import FullscreenOutlinedIcon from "@material-ui/icons/FullscreenOutlined";

import styles from "./ToolBarButtons.module.css";

const ToolBarButtonsView = ({
	userId,
	creatorId,
	docRef,
	handleFullScreen,
	handleClickEditButton,
}) => {
	const handleClickButton = (e) => {
		console.log("clicked edit");
		e.preventDefault();
		handleClickEditButton(true);
	};

	return (
		<Fragment>
			{creatorId === userId && (
				<button
					className={`${styles.btn} hide-on-fullscreen`}
					onClick={(e) => handleClickButton(e)}
				>
					<EditOutlinedIcon />
				</button>
			)}
			<ShareButton
				styles={styles}
				className={`hide-on-fullscreen`}
				sharedItemType={"test"}
			/>
			<div className="hide-on-fullscreen">
				{userId && <AddToMyFolders styles={styles} testId={docRef} />}
			</div>
			<button
				className={`${styles.btn} open-fullscreen-btn hide-on-fullscreen`}
				onClick={() => handleFullScreen.enter()}
			>
				<FullscreenOutlinedIcon />
			</button>
			<button
				className={`${styles.btn} close-fullscreen-btn show-on-fullscreen`}
				onClick={() => handleFullScreen.exit()}
			>
				<FullscreenExitOutlinedIcon
					fontSize="large"
					style={{ color: "black" }}
				/>
			</button>
		</Fragment>
	);
};

export default ToolBarButtonsView;
