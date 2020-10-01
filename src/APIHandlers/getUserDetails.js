import { projectFirestore } from '../firebase/firebaseIndex';

const getUserDetails = async (userId) => {
  var userDetails;

  await projectFirestore
    .collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userDetails = doc.data();
      } else {
        console.log('no such user');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(userDetails);
  return userDetails;
};

export default getUserDetails;
