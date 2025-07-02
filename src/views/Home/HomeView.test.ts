import HomeView from "./HomeView.vue";
import {render, screen} from '@testing-library/vue'

describe("HomeView", () => {
  it('renders title', () => {
    render(HomeView)
    const title = screen.getByText("Recipes")
    expect(title).toBeInTheDocument()
  })
})