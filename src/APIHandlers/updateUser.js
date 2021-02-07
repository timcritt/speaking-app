import { projectFirestore } from '../firebase/firebaseIndex';
import { users } from './firebaseConsts';

export const updateUserProfilePicture = async (
  profilePictureUrl,
  profilePictureReference,
  userId
) => {
  var objectRef = projectFirestore.collection(users).doc(userId);

  await objectRef.update({
    profilePicture: profilePictureUrl,
    profilePictureReference,
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
