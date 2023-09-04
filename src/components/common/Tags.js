import React, { Fragment } from "react";
import Tag from "./Tag";

const tagList = [
	"hobbies",
	"leisure",
	"fitness",
	"sport",
	"health",
	"family",
	"friends",
	"holidays",
	"education",
	"home",
	"relationships",
	"money",
	"work",
	"animals",
	"technology",
	"entertainment",
	"media",
	"travel",
	"places",
	"history",
	"fame",
	"the_past",
	"the_future",
	"music",
	"film",
	"art",
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
