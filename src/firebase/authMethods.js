import firebase from 'firebase';
import getUserDetails from '../APIHandlers/getUserDetails';
import { projectFirestore } from '../firebase/firebaseIndex';
import { uploadImage } from 'APIHandlers/uploadImage';

export const authMethods = {
  signup: function (
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
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      //make res asynchronous so that we can grab the token before saving it.
      .then(async (res) => {
        //create a record to store new user information
        projectFirestore
          .collection('users')
          .doc(res.user.uid)
          .set({
            userId: res.user.uid,
            userName,
          })
          .then(async () => {
            //upload profile pic and grab url and reference
            const { url, reference } = await uploadImage(imageLocalUrl);
            //update user record with new profile pic
            return projectFirestore.collection('users').doc(res.user.uid).update({
              profilePicture: url,
              profilePictureReference: reference,
            });
          })
          .then(async () => {
            //grab and set the token and other details to local storage and state
            const token = await Object.entries(res.user)[5][1].b;
            const userId = res.user.uid;
            console.log(res);

            //set token to localStorage
            localStorage.setItem('token', token);
            setToken(window.localStorage.token);
            localStorage.setItem('user', userId);
            setUserId(window.localStorage.user);
            setUserEmail(res.user.email);
          })
          .catch((res) => {
            console.log(res, 'errorrrrrr');
          });
      })
      .then(() => {
        return Promise.resolve('SUCCESS');
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
        setUserEmail(res.user.email);
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
