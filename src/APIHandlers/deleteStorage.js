import { projectStorage, projectFirestore } from '../firebase/firebaseIndex';

const deleteStorage = (itemUrl) => {
  // Create a reference to the file to delete
  var storageRef = projectStorage.refFromURL(itemUrl);

  storageRef
    .delete()
    .then(() => {
      // File deleted successfully
      console.log('file deleted from storage successfully!');
    })
    .catch(function (error) {
      // Uh-oh, an error occurred!
      console.log(
        'an error occured while deleting from storage: ' + error.message
      );
    });
};

export default deleteStorage;
