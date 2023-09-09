import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import defaultProfilePicture from "img/profile-placeholder.png";

import { firebaseAuth } from "context/AuthProvider";
import { useHistory } from "react-router";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import TestModal from "components/common/TestModal";
import FCEPart2View from "components/FCEPart2/FCEPart2View";
import FCEPart3View from "components/FCEPart3/FCEPart3View";
import FCEPart4View from "components/Part4/FCEPart4View";
import EditFCEPart2 from "components/FCEPart2/EditFCEPart2";
import EditFCEPart3 from "components/FCEPart3/EditFCEPart3";
import EditFCEPart4 from "components/Part4/EditFCEPart4";

export const NavBar = () => {
	const { token, handleSignout, userId, userDetails } =
		useContext(firebaseAuth);
	const [mobileNavVisible, setMobileNavVisible] = useState(false);

	const [isOpen, setIsOpen] = useState(false);
	const [editMode, setEditMode] = useState(true);
	const [testType, setTestType] = useState("FCEPart2");

	let history = useHistory();

	const logoutAndRedirect = async () => {
		await handleSignout();
		history.push("/");
	};

	const renderTest = (test) => {
		switch (test) {
			case "FCEPart2":
				return (
					<>
						{editMode ? (
							<EditFCEPart2
								docRef={"new"}
								setEditMode={setEditMode}
								handleShowModal={setIsOpen}
							/>
						) : (
							<FCEPart2View docRef={"new"} setEditMode={setEditMode} />
						)}
					</>
				);
			case "FCEPart3":
				return (
					<>
						{editMode ? (
							<EditFCEPart3 docRef={null} setEditMode={setEditMode} />
						) : (
							<FCEPart3View testId={null} setEditMode={setEditMode} />
						)}
					</>
				);

			case "FCEPart4":
				return (
					<>
						{editMode ? (
							<EditFCEPart4 docRef={null} setEditMode={setEditMode} />
						) : (
							<FCEPart4View docRef={null} setEditMode={setEditMode} />
						)}
					</>
				);

			default:
				return "default";
		}
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
									<li
										onClick={() => {
											setEditMode(true);
											setIsOpen(true);
										}}
									>
										FCE Part 2
									</li>
									<li>FCE Part 3</li>
									<li>FCE Part 4</li>
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
			<TestModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
				{renderTest(testType)}
			</TestModal>
		</div>
	);
};
