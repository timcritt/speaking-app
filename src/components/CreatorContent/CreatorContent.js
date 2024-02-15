import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import ContentRoutes from "routers/ContentRoutes";
import DashBoardButton from "components/common/DashBoardButton";
import getUserDetails from "APIHandlers/getUserDetails";
import profilePlaceHolder from "img/profile-placeholder.png";
import { firebaseAuth } from "context/AuthProvider";

//React Query
import { useQuery } from "@tanstack/react-query";

const CreatorContent = () => {
	const creatorId = useParams().userId;

	const { userId } = useContext(firebaseAuth);

	const creatorDetailsQuery = useQuery({
		queryKey: ["user_details"],
		queryFn: async () => await getUserDetails(creatorId),
	});

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
										creatorDetailsQuery.isFetched
											? creatorDetailsQuery.data.profilePicture
											: profilePlaceHolder
									}
								/>
								<span className="content-title dashboard-user-name">
									{/*shows user name if viewing other users content.  */}
									{creatorDetailsQuery.isFetched &&
										(creatorDetailsQuery.data.userId === userId
											? "My Content"
											: creatorDetailsQuery.data.userName)}
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
					{creatorDetailsQuery.isFetched && (
						<ContentRoutes
							url={url}
							creatorId={creatorDetailsQuery.data.userId}
						/>
					)}
				</div>
			</div>
		</main>
	);
};

export default CreatorContent;
