import React from "react";

//
import ReactPortal from "components/common/ReactPortal";
import CancelIcon from "@mui/icons-material/Cancel";

//CSS
import styles from "./TestModal.module.css";

const TestModal = ({ isOpen, handleClose, children }) => {
	if (!isOpen) return;

	return (
		<ReactPortal wrapperId={"react-portal-modal-container"}>
			<div className={styles.modal_overlay}>
				<div className={styles.container} onClick={(e) => e.stopPropagation()}>
					<div className={styles.modal_header}>
						<button className={styles.close_button} onClick={handleClose}>
							<CancelIcon />
						</button>
					</div>
					<div className={styles.modal_content}>{children}</div>
				</div>
			</div>
		</ReactPortal>
	);
};

export default TestModal;
