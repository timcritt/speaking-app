import { projectFirestore } from "../firebaseStuff/firebaseIndex";

export const removeTagsFromAllEntries = (collection) =>
	projectFirestore
		.collection(collection)
		.get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				doc.ref.update({
					tags: [],
				});
			});
		});
