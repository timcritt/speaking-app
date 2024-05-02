import React from "react";
import { Link } from "react-router-dom";

//CSS modules
import styles from "./Home.module.css";

const Home = () => {
	return (
		<div className={styles.home_content}>
			<div className={styles.slogan_container}>
				<h1 className={styles.logo}> Orzilla</h1>
				<h2 className={styles.slogan}>English oral exam material</h2>
				<div className="home-btn-container"></div>
			</div>
		</div>
	);
};

export default Home;
