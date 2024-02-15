import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useFilterTests = (
	tests,
	tagFilterTerm,
	sortBy,
	questionFilterTerm,
	setFilteredTests
) => {
	const params = useParams();

	useEffect(() => {
		var isMounted = true;

		if (params && tests) {
			const filterTests = async () => {
				if (isMounted) {
					var userTests = await JSON.parse(JSON.stringify(tests));

					//filter by topic tag
					if (tagFilterTerm) {
						userTests = await userTests.filter((doc) =>
							doc.tags.includes(tagFilterTerm)
						);
					}

					//sort by date created
					if (sortBy === "oldest") {
						userTests = await userTests.sort((a, b) => {
							return a.createdAt.seconds - b.createdAt.seconds;
						});
					} else if (sortBy === "newest") {
						userTests = await userTests.sort((a, b) => {
							return b.createdAt.seconds - a.createdAt.seconds;
						});
					}

					//filter by question text
					if (
						userTests.length > 0 &&
						questionFilterTerm &&
						questionFilterTerm.length > 0
					) {
						userTests = await userTests.filter((test) =>
							test.questionOne
								.toUpperCase()
								.includes(questionFilterTerm.toUpperCase())
						);
					}
					setFilteredTests(userTests);
				}
			};
			filterTests();
		}
		return () => {
			isMounted = false;
		};
	}, [
		questionFilterTerm,
		tagFilterTerm,
		sortBy,
		params,
		tests,
		setFilteredTests,
	]);
};

export default useFilterTests;
