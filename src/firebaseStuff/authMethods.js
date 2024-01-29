// compat packages are API compatible with namespaced code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import getUserDetails from "../APIHandlers/getUserDetails";
import { projectFirestore } from "./firebaseIndex";

export const authMethods = {
	signup: async function (
		email,
		password,
		setErrors,
		setToken,
		setUserId,
		setUserEmail,
		setUserDetails,
		userName,
		imageLocalUrl
	) {
		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async (userCredential) => {
				//create a record to store new user information
				return await projectFirestore
					.collection("users")
					.doc(userCredential.user.uid)
					.set({
						userId: userCredential.user.uid,
						userName,
					})
					.then(async () => {
						//upload profile pic and grab url and reference
						//const { url, reference } = await uploadImage(imageLocalUrl);
						//

						//update user record with new profile pic
						// await projectFirestore.collection('users').doc(userCredential.user.uid).update({
						//   profilePicture: url,
						//   profilePictureReference: reference,
						// });
						//

						const token = await userCredential.user.getIdToken();
						const userId = userCredential.user.uid;

						const userDetails = await getUserDetails(userId);
						//set token to localStorage
						await localStorage.setItem("token", token);
						setToken(window.localStorage.token);
						await localStorage.setItem("user", userId);
						setUserId(window.localStorage.user);
						await localStorage.setItem(
							"userDetails",
							JSON.stringify(userDetails)
						);
						setUserDetails(userDetails);
						return userId;
					})
					.catch((message) => {
						return Promise.reject("something went wrong while signing up user");
					});
			})
			.catch((err) => {
				setErrors([err.message]);

				return Promise.reject("FAIL");
			});
	},
	checkIfEmailVerified: async () => {
		return await firebase.auth.currentUser.emailVerified;
	},
	signin: async function (
		email,
		password,
		setErrors,
		setToken,
		setUser,
		setUserEmail,
		setUserDetails,
		setEmailVerified
	) {
		//change from create users to...
		return (
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				//everything is almost exactly the same as the function above
				.then(async (userCredential) => {
					const token = await userCredential.user.getIdToken();
					const userId = userCredential.user.uid;

					const userDetails = await getUserDetails(userId);
					//set token to localStorage
					await localStorage.setItem("token", token);
					setToken(window.localStorage.token);
					await localStorage.setItem("user", userId);
					setUser(window.localStorage.user);
					await localStorage.setItem(
						"userDetails",
						JSON.stringify(userDetails)
					);
					setUserDetails(userDetails);
					//check if user has verified their account via link in email
					const emailVerified = userCredential.user.emailVerified;

					return { token, emailVerified, userId };
				})
				.catch((err) => {
					setErrors([err.message]);
				})
		);
	},
	signout: (setErrors, setToken, setUser) => {
		// signOut is a no argument function
		firebase
			.auth()
			.signOut()
			.then((res) => {
				//remove the token
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				//set the token back to original state
				setToken(null);
				setUser(null);
			})
			.catch((err) => {
				//there shouldn't every be an error from firebase but just in case
				setErrors([err.message]);
				//whether firebase does the trick or not i want my user to do there thing.
				localStorage.removeItem("token");
				setToken(null);
				localStorage.removeItem("user");
				setUser(null);
			});
	},

	verifyEmailExistsInDatabase: async (email, setErrors) => {
		const emailExists = await firebase
			.auth()
			.fetchSignInMethodsForEmail(email)
			.then((result) => {
				return result.length > 0;
			})
			.catch((error) => {
				setErrors([error.message]);
			});
		return emailExists;
	},
	sendPasswordResetEmail: async (email, setErrors) => {
		firebase
			.auth()
			.sendPasswordResetEmail(email, null)
			.catch((error) => {
				setErrors([error.message]);
			});
	},
	sendVerificationEmail: async () => {
		firebase.auth().currentUser.sendEmailVerification();
	},
};
