// compat packages are API compatible with namespaced code
import firebase from "firebase/compat/app";

export const setStayLoggedIn = async () => {
	return await firebase
		.auth()
		.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		});
};
