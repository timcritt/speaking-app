import React, { Fragment } from "react";
import Modal from "./Modal";
import EasyCrop from "../EasyCrop/EasyCrop";

const SimpleModal = ({ modalButtonText, setImageUrl, modalButton }) => {
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
		<div>
			<EasyCrop setImageUrl={setImageUrl} handleOpen={handleOpen} />
		</div>
	);

	return (
		<Fragment>
			<ClickToOpenModal />
			{open && (
				<Modal
					modalOpen={open}
					setModalOpen={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					onClose={handleClose}
				>
					{body}
				</Modal>
			)}
		</Fragment>
	);
};

export default SimpleModal;
