import { render, screen, fireEvent } from "@testing-library/react";
import { LocationTree } from "./LocationTree";
import { LocationNode } from "../../data/locations";

const mockData: LocationNode[] = [
  {
    id: "1",
    name: "Building 1",
    children: [
      {
        id: "1.1",
        name: "Floor 1",
        floorplan: "floor1.svg",
        children: [],
      },
      {
        id: "1.2",
        name: "Floor 2",
        floorplan: "floor2.svg",
        children: [],
      },
    ],
  },
  {
    id: "2",
    name: "Building 2",
    children: [],
  },
];

const mockToggleNode = jest.fn();
const mockHandleSVGChange = jest.fn();

describe("LocationTree Component", () => {
  it("renders the tree structure correctly", () => {
    render(
      <LocationTree
        data={mockData}
        expandedNodes={{}}
        toggleNode={mockToggleNode}
        handleSVGChange={mockHandleSVGChange}
      />
    );

    expect(screen.getByText("Building 1")).toBeInTheDocument();
    expect(screen.getByText("Building 2")).toBeInTheDocument();
  });

  it("toggles nodes when clicked", () => {
    render(
      <LocationTree
        data={mockData}
        expandedNodes={{}}
        toggleNode={mockToggleNode}
        handleSVGChange={mockHandleSVGChange}
      />
    );

    const building1 = screen.getByText("Building 1");
    fireEvent.click(building1);

    expect(mockToggleNode).toHaveBeenCalledWith("1");
  });

  it("calls handleSVGChange when a floorplan is clicked", () => {
    render(
      <LocationTree
        data={mockData}
        expandedNodes={{ "1": true }}
        toggleNode={mockToggleNode}
        handleSVGChange={mockHandleSVGChange}
      />
    );

    const floor1 = screen.getByText("Floor 1");
    fireEvent.click(floor1);

    expect(mockHandleSVGChange).toHaveBeenCalledWith("floor1");
  });

  it("renders child nodes when expanded", () => {
    render(
      <LocationTree
        data={mockData}
        expandedNodes={{ "1": true }}
        toggleNode={mockToggleNode}
        handleSVGChange={mockHandleSVGChange}
      />
    );

    expect(screen.getByText("Floor 1")).toBeInTheDocument();
    expect(screen.getByText("Floor 2")).toBeInTheDocument();
  });

  it("does not render child nodes when not expanded", () => {
    render(
      <LocationTree
        data={mockData}
        expandedNodes={{}}
        toggleNode={mockToggleNode}
        handleSVGChange={mockHandleSVGChange}
      />
    );

    expect(screen.queryByText("Floor 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Floor 2")).not.toBeInTheDocument();
  });

  it("handles empty data gracefully", () => {
    render(
      <LocationTree
        data={[]}
        expandedNodes={{}}
        toggleNode={mockToggleNode}
        handleSVGChange={mockHandleSVGChange}
      />
    );

    expect(screen.queryByText("Building 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Building 2")).not.toBeInTheDocument();
  });
});
