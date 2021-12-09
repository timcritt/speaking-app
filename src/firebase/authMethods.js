import firebase from 'firebase';
import getUserDetails from '../APIHandlers/getUserDetails';
import { projectFirestore } from '../firebase/firebaseIndex';
import { uploadImage } from 'APIHandlers/uploadImage';

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
        console.log('user signed up with email and password in firestore');
        //create a record to store new user information
        return await projectFirestore
          .collection('users')
          .doc(userCredential.user.uid)
          .set({
            userId: userCredential.user.uid,
            userName,
          })
          .then(async () => {
            console.log('associated user record created in firestore');
            //upload profile pic and grab url and reference
            const { url, reference } = await uploadImage(imageLocalUrl);
            console.log('image uploaded');

            //update user record with new profile pic
            await projectFirestore.collection('users').doc(userCredential.user.uid).update({
              profilePicture: url,
              profilePictureReference: reference,
            });
            console.log('image reference updated on user record');

            const token = await Object.entries(userCredential.user)[5][1].b;
            const userId = userCredential.user.uid;
            console.log(userCredential.user);
            const userDetails = await getUserDetails(userId);
            //set token to localStorage
            await localStorage.setItem('token', token);
            setToken(window.localStorage.token);
            await localStorage.setItem('user', userId);
            setUserId(window.localStorage.user);
            await localStorage.setItem('userDetails', JSON.stringify(userDetails));
            setUserDetails(userDetails);
            return userId;
          })
          .catch((message) => {
            console.log(message, 'error');
            return Promise.reject('something went wrong while signing up user');
          });
      })
      .catch((err) => {
        setErrors([err.message]);
        console.log(err.message);
        return Promise.reject('FAIL');
      });
  },
  signin: (email, password, setErrors, setToken, setUser, setUserEmail, setUserDetails) => {
    //change from create users to...
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      //everything is almost exactly the same as the function above
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b;
        const userId = res.user.uid;
        console.log(res.user);
        const userDetails = await getUserDetails(userId);
        //set token to localStorage
        await localStorage.setItem('token', token);
        setToken(window.localStorage.token);
        await localStorage.setItem('user', userId);
        setUser(window.localStorage.user);
        await localStorage.setItem('userDetails', JSON.stringify(userDetails));
        setUserDetails(userDetails);
      })
      .catch((err) => {
        setErrors([err.message]);
        console.log('could not sign up');
      });
  },
  signout: (setErrors, setToken, setUser) => {
    // signOut is a no argument function
    firebase
      .auth()
      .signOut()
      .then((res) => {
        //remove the token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        //set the token back to original state
        setToken(null);
        setUser(null);
      })
      .catch((err) => {
        //there shouldn't every be an error from firebase but just in case
        setErrors([err.message]);
        //whether firebase does the trick or not i want my user to do there thing.
        localStorage.removeItem('token');
        setToken(null);
        localStorage.removeItem('user');
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
};
