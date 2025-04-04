import React from "react";
import UserSummary from "components/ExploreContent/Users/UserSummary";

const Users = ({ users }) => {
	return (
		<div>
			{users && users.length ? (
				<div className="all-tests-container">
					{users.map((doc) => (
						<UserSummary key={doc.id} user={doc} />
					))}
				</div>
			) : (
				<div className="search-results-message">
					<span>no results!</span>
				</div>
			)}
		</div>
	);
};

export default Users;
