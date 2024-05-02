import React, { useEffect, useState, useRef, useCallback } from "react";
import LineTo from "react-lineto";

const Part3Lines = ({
	top_left,
	top_right,
	bottom_left,
	bottom_centre,
	bottom_right,
	centre,
}) => {
	const [lineClass, setLineClass] = useState("line-hidden");
	//Add event listeners to trigger redrawing of lines
	const [windowDimensions, setWindowDimensions] = useState({
		height: null,
		width: null,
	});

	const timeout = useRef();

	const handleDebounce = () => {
		//Clear the previous timeout.
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			handleResize();
		}, 300);
	};

	const hideLines = () => {
		setLineClass("line-hidden");
	};
	const showLines = () => {
		setLineClass("");
	};

	const handleResize = useCallback(() => {
		setWindowDimensions({
			height: window.innerHeight,
			width: window.innerWidth,
		});
		showLines();
	}, []);

	useEffect(() => {
		//instantly hides the lines on window resize to prevent ugly jumping of lines between positions.
		window.addEventListener("resize", hideLines);
		//listens for window resize and redraws the lines between text areas after a set time. Sets lines to visible when done.
		window.addEventListener("resize", handleDebounce);
		window.addEventListener("fullscreenchange", handleResize);

		//cleanup function - removes listeners on unmount
		return () => {
			window.removeEventListener("resize", hideLines);
			window.removeEventListener("resize", handleDebounce);
			window.removeEventListener("fullscreenchange", handleResize);
		};
	}, [handleResize]);

	const handleEndAnimation = (e) => {
		if (e.target !== e.currentTarget) {
			return;
		}
		console.log("animation ended");
		handleDebounce();
	};

	useEffect(() => {
		const animated = document.getElementsByClassName("animated");
		console.log("in use effect anatiom");
		if (animated.length > 0) {
			animated[0].addEventListener("animationend", (e) =>
				handleEndAnimation(e)
			);
		}

		return () => {
			if (animated.length > 0) {
				animated[0].removeEventListener("animationend", function (e) {
					handleEndAnimation(e);
				});
			}
		};
	}, []);

	return (
		<div key={Date.now()} className={"fadeIn"}>
			<LineTo
				borderColor={"#dbdbdb"}
				zIndex={0}
				within={"part3-grid-container"}
				innerState={windowDimensions}
				from={top_left}
				to={centre}
				className={`line ${lineClass}`}
			/>
			<LineTo
				borderColor={"#dbdbdb"}
				within={"part3-grid-container"}
				innerState={windowDimensions}
				from={top_right}
				to={centre}
				className={`line ${lineClass}`}
			/>
			<LineTo
				borderColor={"#dbdbdb"}
				within={"part3-grid-container"}
				innerState={windowDimensions}
				from={bottom_centre}
				to={centre}
				className={`line ${lineClass}`}
			/>
			<LineTo
				borderColor={"#dbdbdb"}
				within={"part3-grid-container"}
				innerState={windowDimensions}
				from={bottom_left}
				to={centre}
				className={`line ${lineClass}`}
			/>
			<LineTo
				borderColor={"#dbdbdb"}
				within={"part3-grid-container"}
				innerState={windowDimensions}
				from={bottom_right}
				to={centre}
				className={`line ${lineClass}`}
			/>
		</div>
	);
};

export default Part3Lines;
