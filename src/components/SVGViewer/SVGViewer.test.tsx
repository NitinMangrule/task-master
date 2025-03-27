import { render, screen, fireEvent } from "@testing-library/react";
import { SVGViewer } from "./SVGViewer";

describe("SVGViewer", () => {
  it("displays a message when no floor plan is selected", () => {
    render(<SVGViewer />);
    expect(screen.getByText("Select a floor plan to view")).toBeInTheDocument();
  });

  it("renders the selected SVG when a floor plan is selected", () => {
    render(<SVGViewer />);
    const selectNode = (testId: string) => {
      const node = screen.getAllByTestId(testId)[0];
      fireEvent.click(node);
    };
    selectNode("location-tree-node-2");
    selectNode("location-tree-node-2.2-1");
    selectNode("location-tree-child-floor_plan.svg");
    expect(
      screen.queryByText("Select a floor plan to view")
    ).not.toBeInTheDocument();
  });

  it("rotates the SVG when rotation is applied", () => {
    render(<SVGViewer />);
    const selectNode = (testId: string) => {
      const node = screen.getAllByTestId(testId)[0];
      fireEvent.click(node);
    };
    selectNode("location-tree-node-2");
    selectNode("location-tree-node-2.2-1");
    selectNode("location-tree-child-floor_plan.svg");
    const svgElement = screen.getByTestId("svg-viewer-floor_plan");
    const rotateSvg = screen.getByTestId("svg-rotate");
    fireEvent.click(rotateSvg);
    expect(svgElement).toHaveAttribute("style", "transform: rotate(180deg);");
  });
});
