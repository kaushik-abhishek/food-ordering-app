import { render, screen } from "@testing-library/react"
import RestaurantCard from "../RestaurantCard"
import MOCK_DATA from "../mock/resCardMock.json"
import "@testing-library/jest-dom"

test('should render the Restaurant card component with props', () => {
  render(<RestaurantCard info = {MOCK_DATA} />)
  const resName = screen.getByText("Pizza Hut");
  expect(resName).toBeInTheDocument();
})
