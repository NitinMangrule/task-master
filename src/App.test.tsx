import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders the main heading", () => {
  render(<App />);
  const headingElement = screen.getByText("Task Overview");
  expect(headingElement).toBeInTheDocument();
});

test("renders floor plan view when Implementation button is clicked", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("implementation-tab");
  fireEvent.click(buttonElement);
  const headingElement = screen.getByText("Select a floor plan to view");
  expect(headingElement).toBeInTheDocument();
});
