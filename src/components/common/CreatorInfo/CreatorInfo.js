import React, { useState, useEffect } from "react";
import defaultProfilePicture from "img/profile-placeholder.png";
import { Link } from "react-router-dom";
import getUserDetails from "APIHandlers/getUserDetails";

//CSS Modules
import styles from "./CreatorInfo.module.css";

const CreatorInfo = ({ creatorId }) => {
	const [authorName, setAuthorName] = useState(null);
	const [creatorProfilePicture, setCreatorProfilePicture] = useState(null);

	useEffect(() => {
		var unmounted = false;

		if (creatorId) {
			(async () => {
				const creatorDetails = await getUserDetails(creatorId);
				if (!unmounted && creatorDetails) {
					setAuthorName(creatorDetails.userName);
					setCreatorProfilePicture(creatorDetails.profilePicture);
				}
			})();
		}
		return () => {
			unmounted = true;
		};
	}, [creatorId]);

	const addDefaultSrc = (e) => {
		e.target.src = defaultProfilePicture;
	};

	return (
		<div className={styles.test_creator_info + " hide-on-fullscreen"}>
			<img
				onError={addDefaultSrc}
				alt="could not load"
				className="profile-picture"
				src={
					creatorProfilePicture ? creatorProfilePicture : defaultProfilePicture
				}
			/>
			<div className={styles.created_by_text}>
				{<Link to={`/userContent/${creatorId}/tests`}>{authorName}</Link>}
			</div>
		</div>
	);
};

export default CreatorInfo;
