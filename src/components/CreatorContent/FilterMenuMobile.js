import React from "react";
//custom components
import SideBarTags from "../common/SideBarTags";
//icons-material
import CloseIcon from "@mui/icons-material/Close";

const FilterMenuMobile = ({
	filterMenuVisible,
	toggleFilterMenuVisible,
	tagFilterTerm,
	handleSetTags,
	sortBy,
	handleSortRadioChange,
	questionFilterTerm,
	handleSetQuestionFilterTerm,
	handleResetFilters,
}) => {
	return (
		<div
			className={`filter-menu ${filterMenuVisible ? "isVisible" : "isHidden"}`}
		>
			<div className="close-nav-mobile-btn" onClick={toggleFilterMenuVisible}>
				<CloseIcon fontSize="large" />
			</div>
			<h1>FILTERS</h1>
			{/*filter by topic*/}
			<div className="filter-mobile-row">
				<p>Select Topic</p>
				<SideBarTags
					tags={tagFilterTerm}
					handleSetTags={handleSetTags}
				></SideBarTags>
			</div>
			{/*sort by date created*/}

			<div className="filter-mobile-row">
				<p>Sorty by</p>
				<div>
					<input
						type="radio"
						id="newest"
						name="sortBy"
						value="newest"
						checked={sortBy === "newest"}
						onChange={handleSortRadioChange}
					/>
					<label htmlFor="newest">newest</label>
				</div>
				<div>
					<input
						type="radio"
						id="oldest"
						name="sortyBy"
						value="oldest"
						checked={sortBy === "oldest"}
						onChange={handleSortRadioChange}
					/>
					<label htmlFor="oldest">oldest</label>
				</div>
			</div>

			{/*filter by question*/}

			<div className="filter-mobile-row">
				<p>Search by question</p>
				<input
					id="question"
					type="text"
					value={questionFilterTerm}
					onChange={handleSetQuestionFilterTerm}
				/>
			</div>

			{/* buttons */}
			<div className="filter-mobile-button-row">
				<button className="btn get-started-btn" onClick={handleResetFilters}>
					<span className="icon-container"></span>
					reset filters
				</button>
				<button
					className="btn get-started-btn"
					onClick={toggleFilterMenuVisible}
				>
					apply filters
				</button>
			</div>
		</div>
	);
};

export default FilterMenuMobile;
