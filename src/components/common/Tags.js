import React, { Fragment } from "react";
import Tag from "./Tag";

export const tagList = [
	"communication",
	"competition",
	"culture_and_customs",
	"daily_life",
	"education",
	"entertainment_and_media",
	"environmental_issues",
	"family_and_friends",
	"fashion",
	"feelings_and_emotions",
	"food_and_drink",
	"free_time_activities",
	"health_medicine_and_fitness",
	"hobbies_and_leisure",
	"house_and_home",
	"money",
	"obligations",
	"places_and_buildings",
	"relationships",
	"science_and_technology",
	"shopping",
	"social_interaction",
	"society",
	"sport",
	"the_natural_world",
	"time",
	"transport",
	"travel_and_holidays",
	"weather",
	"work",
	"animals",
	"the_arts",
];

const Tags = ({ tags, handleSetTags }) => {
	return (
		<Fragment>
			{tagList.map((tag) => {
				return (
					<Tag
						key={tag}
						tagName={tag}
						selected={tags.includes(tag)}
						handleSetTags={handleSetTags}
					/>
				);
			})}
		</Fragment>
	);
};

export default Tags;
