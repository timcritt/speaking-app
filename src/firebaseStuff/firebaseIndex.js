import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"; // Import storage separately
import "firebase/compat/functions"; // Import storage separately

var firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_BASEURL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const firebaseAuth = firebase.auth();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const fieldPath = firebase.firestore.FieldPath;
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const increment = firebase.firestore.FieldValue.increment;
const fieldValue = firebase.firestore.FieldValue;

const functions = firebase.functions();

export {
	firebaseAuth,
	projectStorage,
	projectFirestore,
	app,
	timestamp,
	increment,
	fieldPath,
	functions,
	fieldValue,
};
