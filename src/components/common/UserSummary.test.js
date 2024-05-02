import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import UserSummary from "../ExploreContent/Users/UserSummary";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const user = {
	profilePicture: "testUrl",
	id: 1,
	userName: "test user name",
};

//test suite
describe("UserSUmmary", () => {
	//test case
	test("renders UserSummary component", () => {
		render(<UserSummary user={user} />);
		expect(screen.getByText("test user name"));
	});
	test("triggers path change on click", () => {
		const history = createMemoryHistory();

		const { container } = render(
			<Router history={history}>
				<UserSummary user={user} />
			</Router>
		);
		userEvent.click(container.firstChild);
		expect(history.location.pathname).toBe(`/userContent/${user.id}/tests`);
	});
	test('profile pic must have src= user.profilePicture and alt = "could not load"', () => {
		render(<UserSummary user={user} />);
		const logo = screen.getByRole("img");
		expect(logo).toHaveAttribute("src", user.profilePicture);
		expect(logo).toHaveAttribute("alt", "could not load");
	});
	test("profile shows default picture when data for profile pic is missing", () => {
		user.profilePicture = null;
		render(<UserSummary user={user} />);
		const logo = screen.getByRole("img");
		expect(logo).toHaveAttribute("src", "profile-placeholder.png");
	});
});
