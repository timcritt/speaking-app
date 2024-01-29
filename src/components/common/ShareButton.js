import React, { Fragment, useState } from "react";
import Modal from "./Modal";
import ShareModalContent from "./ShareModalContent";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

//place this component anywhere in the project and it will add a "share current page" ability with a modal that opens on button click.

const ShareButton = ({
	styles,
	sharedItemType = "",
	iconColour = "black",
	location,
}) => {
	const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

	return (
		<Fragment>
			{shareModalIsOpen && (
				<Modal
					className="open-add-folder-modal-btn"
					modalOpen={shareModalIsOpen}
					heading={`Share ${sharedItemType}`}
					setModalOpen={setShareModalIsOpen}
				>
					<ShareModalContent location={location} />
				</Modal>
			)}

			<button
				className={`${
					styles ? styles.btn : ""
				} tool-bar-btn hide-on-fullscreen`}
				onClick={() => setShareModalIsOpen(true)}
			>
				<ShareOutlinedIcon style={{ color: `${iconColour}` }} />
			</button>
		</Fragment>
	);
};

export default ShareButton;
