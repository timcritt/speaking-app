import { firebaseconfig } from './firebaseIndex';
import firebase from 'firebase';

export const authMethods = {
  signup: (email, password, setErrors, setToken, setUser, setUserEmail) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      //make res asynchronous so that we can make grab the token before saving it.
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b;
        const user = res.user;
        //set token to localStorage
        await localStorage.setItem('token', token);
        setToken(window.localStorage.token);
        await localStorage.setItem('userId', JSON.stringify(user));
        setUserEmail(user.email);
        //grab token from local storage and set to state.
        setUser(window.localStorage.user);
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
      });
  },
  signin: (email, password, setErrors, setToken, setUser, setUserEmail) => {
    //change from create users to...
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      //everything is almost exactly the same as the function above
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b;

        const userId = res.user.uid;

        //set token to localStorage
        await localStorage.setItem('token', token);
        setToken(window.localStorage.token);
        await localStorage.setItem('user', userId);
        setUser(window.localStorage.user);
        setUserEmail(res.user.email);
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
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
        setErrors((prev) => [...prev, err.message]);
        //whether firebase does the trick or not i want my user to do there thing.
        localStorage.removeItem('token');
        setToken(null);
        localStorage.removeItem('user');
        setUser(null);
        console.error(err.message);
      });
  },
};
