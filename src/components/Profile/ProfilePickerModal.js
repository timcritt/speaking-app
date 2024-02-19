import React, { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import EasyCrop from "../EasyCrop/EasyCrop";
import ImageContext from "context/ImageContext";

const StyledModal = styled(Modal)(({ theme }) => ({
	position: "absolute",
	display: "inline-block",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "white",
	border: "2px solid #000",
	boxShadow: "",
	padding: "",
}));

const ProfilePickerModal = ({ modalOpen }) => {
	const context = useContext(ImageContext);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSetProfilePicture = (imageUrl) => {
		context.handleSetProfilePicture(imageUrl);
		setOpen(false);
	};

	const body = (
		<div>
			<EasyCrop
				aspect={1}
				setImageUrl={handleSetProfilePicture}
				setOpen={setOpen}
			/>
		</div>
	);

	return (
		<div>
			<span className="btn change-profile-picker-btn" onClick={handleOpen}>
				change profile picture
			</span>
			<StyledModal
				open={open}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				onClose={handleClose}
			>
				{body}
			</StyledModal>
		</div>
	);
};

export default ProfilePickerModal;
