import { useState, useEffect } from "react";
import { projectStorage } from "../firebaseStuff/firebaseIndex";
import { v4 as uuidv4 } from "uuid";

const useStorage = (file) => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);
	const [storageRef, setStorageRef] = useState(null);

	useEffect(() => {
		//references

		const ref = projectStorage.ref(uuidv4());

		ref.put(file).on(
			"state_changed",
			(snap) => {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				setProgress(percentage);
			},
			(err) => {
				setError(err);
			},
			async () => {
				const url = await ref.getDownloadURL();
				setStorageRef(ref.fullPath);
				setUrl(url);
			}
		);
	}, [file]);

	return { progress, url, error, storageRef };
};

export default useStorage;
