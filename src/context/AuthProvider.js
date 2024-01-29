import React, { useState, useEffect } from "react";
import getUserDetails from "../APIHandlers/getUserDetails";
import { authMethods } from "../firebaseStuff/authMethods";
import { app } from "../firebaseStuff/firebaseIndex";

const AuthProvider = (props) => {
	const [inputs, setInputs] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState([]);
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [userDetails, setUserDetails] = useState(null);
	const [emailVerified, setEmailVerified] = useState(false);

	function handleSetUserId(newId) {
		setUserId(newId);
	}

	useEffect(() => {
		//listens to state change. Persists login even after refresh
		app.auth().onAuthStateChanged(async (user) => {
			if (user) {
				setToken(window.localStorage.token);
				setUserEmail(user.email);
				setUserId(user.uid);
				setEmailVerified(user.emailVerified);

				const newDetails = await getUserDetails(user.uid);
				setUserDetails(newDetails);

				setErrors([]);
			}
		});
	}, []);

	const handleSignup = async (userName, imageLocalUrl) => {
		return await authMethods.signup(
			inputs.email,
			inputs.password,
			setErrors,
			setToken,
			handleSetUserId,
			setUserEmail,
			setUserDetails,
			userName,
			imageLocalUrl
		);
	};
	const handleSignin = async (email, password) => {
		return await authMethods.signin(
			inputs.email,
			inputs.password,
			setErrors,
			setToken,
			setUserId,
			setUserEmail,
			setUserDetails,
			setEmailVerified
		);
	};
	const handleSignout = () => {
		authMethods.signout(setErrors, setToken, setUserId);
	};
	const handleResetPassword = () => {
		authMethods.sendPasswordResetEmail(inputs.email, setUserEmail, setErrors);
	};
	//checks if the email address is registered to a user in the database
	const handleVerifyEmailExists = async (email, setErrors) => {
		return await authMethods.verifyEmailExistsInDatabase(email, setErrors);
	};

	const handleSendEmailVerification = async () => {
		return await authMethods.sendVerificationEmail();
	};

	return (
		<firebaseAuth.Provider
			value={{
				handleSignup,
				handleSignin,
				inputs,
				setInputs,
				setErrors,
				errors,
				handleSignout,
				handleVerifyEmailExists,
				token,
				setToken,
				userId,
				setUserId,
				userDetails,
				setUserDetails,
				userEmail,
				handleResetPassword,
				emailVerified,
				setEmailVerified,
				handleSendEmailVerification,
			}}
		>
			{props.children}
		</firebaseAuth.Provider>
	);
};

export default AuthProvider;

export const firebaseAuth = React.createContext();
