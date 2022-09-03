import { projectStorage } from '../firebase/firebaseIndex';

const deleteStorage = (itemUrl) => {
  // Create a reference to the file to delete
  var storageRef = projectStorage.refFromURL(itemUrl);

  storageRef
    .delete()
    .then(() => {
      // File deleted successfully
    })
    .catch(function (error) {
      // Uh-oh, an error occurred!
    });
};

export default deleteStorage;
