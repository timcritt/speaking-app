import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import ContentRoutes from "routers/ContentRoutes";
import DashBoardButton from "components/common/DashBoardButton";
import getUserDetails from "APIHandlers/getUserDetails";
import profilePlaceHolder from "img/profile-placeholder.png";
import { firebaseAuth } from "context/AuthProvider";

const CreatorContent = () => {
	const creatorId = useParams().userId;
	const [creatorDetails, setCreatorDetails] = useState(null);
	const { userId } = useContext(firebaseAuth);

	useEffect(() => {
		let isLoaded = true;
		if (isLoaded) {
			if (creatorId) {
				(async () => {
					const details = await getUserDetails(creatorId);
					setCreatorDetails(details);
				})();
			}
		}
		return () => (isLoaded = false);
	}, [creatorId]);

	let { url } = useRouteMatch();

	return (
		<main className="holy-grail-content">
			<div className="my-content-content">
				<div className="dashboard-background-full-width">
					<div className="dashboard-container">
						<div className="dashboard-user-info-container">
							<div className="dashboard-profile-pic-container">
								<img
									className="dashboard-image "
									alt="could not load"
									src={
										creatorDetails && creatorDetails.profilePicture
											? creatorDetails.profilePicture
											: profilePlaceHolder
									}
								/>
								<span className="content-title dashboard-user-name">
									{/*shows user name if viewing other users content.  */}
									{creatorDetails &&
										(creatorDetails.userId === userId
											? "My Content"
											: creatorDetails.userName)}
								</span>
							</div>
						</div>
						<div className="dashboard-button-bar-sm">
							<DashBoardButton
								linkTo={`${url}/tests`}
								label={"tests"}
								id={"tests"}
							/>
							<DashBoardButton
								linkTo={`${url}/folders`}
								label={"folders"}
								id={"folders"}
							/>
						</div>
					</div>
				</div>

				{/* router goes here */}
				<div className="my-content-main">
					{creatorDetails && (
						<ContentRoutes url={url} creatorId={creatorDetails.userId} />
					)}
				</div>
			</div>
		</main>
	);
};

export default CreatorContent;
