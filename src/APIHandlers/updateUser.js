import { projectFirestore } from '../firebase/firebaseIndex';
import { users } from '../firebase/firebaseConsts';

export const updateUserProfilePicture = async (profilePictureUrl, userId) => {
  var objectRef = projectFirestore.collection(users).doc(userId);

  await objectRef.update({
    profilePicture: profilePictureUrl,
  });

  return Promise.resolve();
};

export const updateUserName = async (userId, userName) => {
  var objectRef = projectFirestore.collection(users).doc(userId);

  await objectRef.update({
    userName: userName,
  });

  return Promise.resolve();
};
