import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import defaultProfilePicture from "img/profile-placeholder.png";

//API constants
import {
	FCEPart2,
	FCEPart3,
	FCEPart4,
	CAEPart2,
	CAEPart3,
	CAEPart4,
} from "APIHandlers/firebaseConsts";

import { firebaseAuth } from "context/AuthProvider";
import { useHistory } from "react-router";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { TestModalContext } from "context/TestModalContext";

export const NavBar = () => {
	const { token, handleSignout, userId, userDetails } =
		useContext(firebaseAuth);
	const [mobileNavVisible, setMobileNavVisible] = useState(false);

	const { setIsOpen, setEditMode, setDocToFetchRef, setTestType } =
		useContext(TestModalContext);

	let history = useHistory();

	const logoutAndRedirect = async () => {
		await handleSignout();
		history.push("/");
	};

	const handleCreateTestClick = (testType) => {
		setDocToFetchRef("new");
		setTestType(testType);
		setEditMode(true);
		setIsOpen(true);
	};

	return (
		<div className="nav-container">
			<div className={"burger-btn"} onClick={() => setMobileNavVisible(true)}>
				<MenuIcon fontSize="large" />
			</div>

			<div
				className={`nav-content-container ${
					mobileNavVisible ? "isVisible" : "isHidden"
				}`}
			>
				<div
					className="close-nav-mobile-btn"
					onClick={() => setMobileNavVisible(false)}
				>
					<CloseIcon fontSize="large" />
				</div>
				<Link className="nav-link navItem nav-logo " to="/home">
					Orzilla
				</Link>
				<div className="nav-buttons">
					{token && (
						<Fragment>
							<div className="dropdown-m">
								<span className={"dropdown nav-link navItem"}>Create</span>
								<div className={"dropdown-content"}>
									<li onClick={() => handleCreateTestClick(FCEPart2)}>
										FCE Part 2
									</li>
									<li onClick={() => handleCreateTestClick(FCEPart3)}>
										FCE Part 3
									</li>
									<li onClick={() => handleCreateTestClick(FCEPart4)}>
										FCE Part 4
									</li>
									<li onClick={() => handleCreateTestClick(CAEPart2)}>
										CAE Part 2
									</li>
									<li onClick={() => handleCreateTestClick(CAEPart3)}>
										CAE Part 3
									</li>
									<li onClick={() => handleCreateTestClick(CAEPart4)}>
										CAE Part 4
									</li>
								</div>
							</div>
							<Link className="nav-link" to={`/userContent/${userId}/tests`}>
								My content
							</Link>
						</Fragment>
					)}
					<Link className="nav-link navItem" to="/about">
						About
					</Link>
					<Link className="nav-link navItem" to="/about">
						Help
					</Link>
					<Link className="nav-link navItem" to="/exploreContent/tests">
						Explore content
					</Link>
				</div>
			</div>
			{token ? (
				<div className="dropdown-m">
					<img
						className="profile-picture dropdown "
						alt="could not load"
						src={
							userDetails && userDetails.profilePicture
								? userDetails.profilePicture
								: defaultProfilePicture
						}
					></img>
					<div className="dropdown-content">
						<Link to={`/profile/${userId}`}>
							<p className="nav-dropdown-link">Profile</p>
						</Link>

						<p className="nav-dropdown-link" onClick={logoutAndRedirect}>
							Log out
						</p>
					</div>
				</div>
			) : (
				<Fragment>
					<Link className="nav-link" to="/signin">
						Log in
					</Link>
					<Link className="nav-link" to="/signup">
						Sign up
					</Link>
				</Fragment>
			)}
		</div>
	);
};
