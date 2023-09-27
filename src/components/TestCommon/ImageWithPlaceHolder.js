import React, { useState } from "react";

import placeholder from "img/placeholder-image.png";

//styles
import styles from "./ImageWithPlaceHolder.module.css";

const ImageWithPlaceHolder = ({ imageSrc }) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<>
			<img
				className={styles.shimmer}
				src={placeholder}
				style={imageLoaded ? { display: "none" } : {}}
			/>
			<img
				className={`${styles.fade_in} `}
				style={imageLoaded ? {} : { display: "none" }}
				src={imageSrc}
				alt="could not load"
				onLoad={() => setImageLoaded(true)}
			/>
		</>
	);
};

export default ImageWithPlaceHolder;
