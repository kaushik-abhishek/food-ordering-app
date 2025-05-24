import { render, screen } from "@testing-library/react"
import Contact from "../Contact";
import "@testing-library/jest-dom";


test('should load contact us component ', () => {
  render(<Contact />)
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
});
test('should check the button in the component text', () => {
  render(<Contact />)
  const btn = screen.getByRole("button")
  expect(btn).toBeInTheDocument();
})

test('should check the submit text ', () => {
  render(<Contact />)
  const btnText = screen.getByText('Submit');
  expect(btnText).toBeInTheDocument();
})

test('should load 2 component on load contact component', () => {
  render(<Contact />);
  const inputBoxes = screen.getAllByRole("textbox");
  expect(inputBoxes.length).toBe(2);
})

test('should load 2 component on load contact component', () => {
  render(<Contact />);
  const inputBoxes = screen.getAllByRole("textbox");
  expect(inputBoxes.length).not.toBe(5);
})





