import { render, fireEvent, screen } from "@testing-library/react";
import { SVGControls } from "./SVGControls";

describe("SVGControls Component", () => {
  const mockSetSelectedColor = jest.fn();
  const mockSetRotation = jest.fn();
  const mockHandleChange = jest.fn();

  const defaultProps = {
    selectedColor: "#000000",
    setSelectedColor: mockSetSelectedColor,
    setRotation: mockSetRotation,
    handleChange: mockHandleChange,
    selectedSVGs: ["rectangle"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<SVGControls {...defaultProps} />);
    expect(screen.getByText("Toggle")).toBeInTheDocument();
  });

  it("calls setRotation when Rotate button is clicked", () => {
    render(<SVGControls {...defaultProps} />);
    const rotateButton = screen.getByText("Toggle");
    fireEvent.click(rotateButton);
    expect(mockSetRotation).toHaveBeenCalledWith(expect.any(Function));
  });

  it("calls setSelectedColor when a color is selected", () => {
    render(<SVGControls {...defaultProps} />);
    const colorSelect = screen.getByTestId("color-select");
    fireEvent.change(colorSelect, { target: { value: "#000000" } });
    expect(mockSetSelectedColor).toHaveBeenCalledWith("#000000");
  });
});
