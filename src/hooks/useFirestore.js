import { useState, useEffect } from "react";
import { projectFirestore } from "../firebaseStuff/firebaseIndex";

const useFirestore = (collection, userId) => {
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		var results = projectFirestore.collection(collection);

		if (userId) {
			results = results.where("creatorId", "==", userId);
		}
		if (collection !== "users") {
			results = results.orderBy("createdAt", "desc");
		}
		const unsub = results.onSnapshot((snap) => {
			let documents = [];
			snap.forEach((doc) => {
				documents.push({ ...doc.data(), id: doc.id });
			});
			setDocs(documents);
		});
		//equivalent of componentDidUnmount => unsubscribe()
		return () => unsub();
	}, [collection, userId]);

	return { docs, userId, collection };
};

export default useFirestore;
