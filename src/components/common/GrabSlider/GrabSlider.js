//make sure that this component only renders once the data to be displayed in the sliding div has been fetched.
//for example: hasFetched && <GrabSlider/>
//If not, the dimensions taken from the referenced sliding div will be incorrect, and the right button not display/disappear correctly on component mount

import React, { useEffect, useState, useRef } from "react";

//css modules
import styles from "./GrabSlider.module.css";

//custom hooks

import useGrabAndSlide from "./useGrabAndSlide";

//3rd party icons-material
const GrabSlider = (props) => {
	const [leftButtonVisible, setLeftButtonVisibible] = useState(false);
	const [rightButtonVisible, setRightButtonVisible] = useState(true);

	const scrollingDiv = useRef(null);

	useGrabAndSlide(scrollingDiv, styles.active);

	const handleScrollRight = () => {
		scrollingDiv.current.scrollBy(200, 0);
	};

	const handleScrollLeft = () => {
		scrollingDiv.current.scrollBy(-200, 0);
	};

	//checks the scroll position of the content and hides the scroll buttons accordingly
	const handleScroll = () => {
		//hide left button if fully scrolled left
		if (scrollingDiv.current.scrollLeft === 0) {
			setLeftButtonVisibible(false);
		} else {
			setLeftButtonVisibible(true);
		}
		//hide right button if fully scrolled right
		if (
			scrollingDiv.current.scrollLeft >=
			scrollingDiv.current.scrollWidth - scrollingDiv.current.clientWidth
		) {
			setRightButtonVisible(false);
		} else {
			setRightButtonVisible(true);
		}
	};
	//check if the right button is needed upon load
	useEffect(() => {
		let mounted = true;

		if (mounted) {
			if (
				scrollingDiv.current.scrollWidth <= scrollingDiv.current.clientWidth
			) {
				setRightButtonVisible(false);
			} else {
				setRightButtonVisible(true);
			}
		}
		return () => {
			mounted = false;
		};
	}, [scrollingDiv]);

	//adds event listner to check scroll position of the content
	useEffect(() => {
		const currentRef = scrollingDiv.current;
		currentRef.addEventListener("scroll", handleScroll);
		return () => {
			currentRef.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		window.addEventListener("resize", handleScroll);
		return () => {
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	return (
		<div className={`${styles.tag_container_outer} hide-on-fullscreen`}>
			<div
				className={`${styles.left_button_container} ${
					leftButtonVisible ? styles.visible : styles.invisible
				}`}
			>
				<button className={`${styles.button}`} onClick={handleScrollLeft}>
					<span className={styles.chevron}>&#x2039;</span>
				</button>
			</div>
			<div
				ref={scrollingDiv}
				className={
					styles.tag_container_inner +
					//applies grabable class only if the div is scrollable
					` ${rightButtonVisible || leftButtonVisible ? styles.grabable : ""}`
				}
			>
				{props.testTags?.map((tag) => {
					return (
						<span className={styles.scroll_child} key={tag}>{`#${tag}`}</span>
					);
				})}
			</div>
			<div
				className={`${styles.right_button_container} ${
					rightButtonVisible ? styles.visible : styles.invisible
				}`}
			>
				<button
					className={`${styles.button} ${
						rightButtonVisible ? styles.visible : styles.invisible
					}`}
					onClick={handleScrollRight}
				>
					<span className={styles.chevron}>&#x203A;</span>
				</button>
			</div>
		</div>
	);
};

export default GrabSlider;
