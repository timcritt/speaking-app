import React, { Fragment } from "react";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import EasyCrop from "../EasyCrop/EasyCrop";

const getModalStyle = () => {
	const top = 50;
	const left = 50;

	return {
		top: `50%`,
		left: `50%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
};

const StyledModal = styled(Modal)(({ theme }) => ({
	position: "absolute",
	display: "inline-block",
	backgroundColor: theme.palette.background.paper,
	border: "2px solid #000",
	boxShadow: theme.shadows[5],
	padding: theme.spacing(2, 4, 3),
	zIndex: "9",
}));

const SimpleModal = ({ modalButtonText, setImageUrl, modalButton }) => {
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const ClickToOpenModal = () => {
		if (modalButton) {
			return React.cloneElement(modalButton, { onClick: handleOpen });
		}

		return (
			<button className="btn upload-btn" onClick={handleOpen}>
				upload
			</button>
		);
	};

	const body = (
		<div style={modalStyle}>
			<EasyCrop setImageUrl={setImageUrl} handleOpen={handleOpen} />
		</div>
	);

	return (
		<Fragment>
			<ClickToOpenModal />
			<StyledModal
				open={open}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				onClose={handleClose}
			>
				{body}
			</StyledModal>
		</Fragment>
	);
};

export default SimpleModal;
