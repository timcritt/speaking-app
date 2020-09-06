import firebase from 'firebase';

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
