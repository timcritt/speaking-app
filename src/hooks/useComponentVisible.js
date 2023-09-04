import { useState, useEffect, createRef } from "react";

export default function useComponentVisible(initialIsVisible) {
	const [isComponentVisible, setIsComponentVisible] =
		useState(initialIsVisible);
	var ref = createRef(null);

	const handleClickOutside = (event) => {
		console.log("has been clicked", event.target);
		if (ref.current && !ref.current.contains(event.target)) {
			setIsComponentVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	});

	return { ref, isComponentVisible, setIsComponentVisible };
}
