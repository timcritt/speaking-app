import React from "react";

//
import ReactPortal from "components/common/ReactPortal";

//CSS
import styles from "./TestModal.module.css";

const TestModal = ({ isOpen, handleClose, children }) => {
	if (!isOpen) return null;

	return (
		<ReactPortal wrapperId={"react-portal-modal-container"}>
			<div className={styles.modal}>
				<button className={styles.close_button} onClick={handleClose}>
					close
				</button>
				<div className={styles.modal_content}>{children}</div>
			</div>
		</ReactPortal>
	);
};

export default TestModal;
