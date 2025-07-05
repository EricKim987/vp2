import { render, screen } from "@testing-library/vue";
import SearchInput from "./SearchInput.vue";
import userEvent from "@testing-library/user-event";

const push = vi.fn();
vi.mock("vue-router", () => ({
	useRouter: vi.fn(() => ({
		push,
	})),
}));

describe("SearchInput", () => {
	beforeEach(() => {
		push.mockClear();
		render(SearchInput);
	});

	it("searches recipes", async () => {
		const user = userEvent.setup();
		const input = screen.getByLabelText("Search recipes");

		await user.click(input);
		await user.keyboard("{Enter}");

		expect(push).not.toHaveBeenCalled();

		await user.type(input, "something");
		await user.keyboard("{Enter}");

		expect(push).toHaveBeenCalledOnce();

		const searchButton = screen.getByLabelText("search");
		await user.click(searchButton);

		expect(push).toHaveBeenCalledTimes(2);
	});
});
