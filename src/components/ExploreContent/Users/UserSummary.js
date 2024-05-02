import React from "react";
import profilePlaceHolder from "img/profile-placeholder.png";
import { useHistory } from "react-router-dom";

//Styles
import styles from "./UserSummary.module.css";

const UserSummary = ({ user }) => {
	const history = useHistory();

	return (
		<div
			className={styles.container}
			onClick={() => history.push(`/userContent/${user.id}/tests`)}
		>
			<div className={styles.content_container}>
				<img
					className="profile-picture"
					alt="could not load"
					src={user.profilePicture ? user.profilePicture : profilePlaceHolder}
				/>
				<h3 className={styles.createdBy_text_container}>{user.userName}</h3>
			</div>
		</div>
	);
};

export default UserSummary;
