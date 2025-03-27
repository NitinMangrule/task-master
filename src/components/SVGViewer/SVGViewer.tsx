import React, { useState, useEffect, useCallback } from "react";
import { ReactComponent as Floor1 } from "../../assets/floor1.svg";
import { ReactComponent as Floor2 } from "../../assets/floor2.svg";
import { ReactComponent as Floor3 } from "../../assets/floor3.svg";
import { ReactComponent as FloorPlan } from "../../assets/floor_plan.svg";
import { locationsData } from "../../data/locations";
import { LocationTree } from "../LocationTree/LocationTree";
import { SVGControls } from "../SVGControls/SVGControls";
import "./SVGViewer.scss";
import { shapeMap } from "../../constants/shapeMap";

const svgMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  floor1: Floor1,
  floor2: Floor2,
  floor3: Floor3,
  floor_plan: FloorPlan,
};

export const SVGViewer = () => {
  const [selectedSVGs, setSelectedSVGs] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [rotation, setRotation] = useState<number>(0);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedShape, setSelectedShape] = useState<string>("all");

  const handleSVGChange = (floors: string | string[]) => {
    setSelectedSVGs(Array.isArray(floors) ? floors : [floors]);
  };

  const toggleNode = (node: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [node]: !prev[node],
    }));
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = event.target.value;
      setSelectedShape(selectedOption);
    },
    []
  );

  useEffect(() => {
    selectedSVGs.forEach((svgKey) => {
      const svgElement = document.querySelector(
        `svg[data-key="${svgKey}"]`
      ) as SVGSVGElement | null;

      if (svgElement) {
        Object.values(shapeMap)
          .flat()
          .forEach((id) => {
            const element = svgElement.querySelector(`#${id}`);
            if (element) {
              element.setAttribute("fill", "none");
              element.setAttribute("visibility", "hidden");
            }
          });

        const selectedOption = selectedShape || "all";
        const targetElements = shapeMap[selectedOption] || [];
        targetElements.forEach((id) => {
          const targetElement = svgElement.querySelector(`#${id}`);
          if (targetElement) {
            targetElement.setAttribute("fill", selectedColor || "none");
            targetElement.setAttribute("visibility", "visible");
          }
        });
      }
    });
  }, [selectedColor, selectedSVGs, selectedShape]);

  return (
    <div className="main">
      <div className="controls">
        {/* This component is used for controlling the color, rotation, and shape in the SVG` */}
        <SVGControls
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          handleChange={handleChange}
          setRotation={setRotation}
        />
      </div>

      <div className="sidebar">
        {/* This component is used for displaying and
    interacting with a hierarchical tree of locations. */}
        <LocationTree
          data={locationsData}
          expandedNodes={expandedNodes}
          toggleNode={toggleNode}
          handleSVGChange={handleSVGChange}
        />
      </div>

      <div className="viewer">
        {selectedSVGs.length === 0 && (
          <div className="no-svg">Select a floor plan to view</div>
        )}
        {selectedSVGs.map((svgKey) => {
          const SVGComponent = svgMap[svgKey];
          return (
            SVGComponent && (
              <div key={svgKey} className="svg-container">
                <SVGComponent
                  data-testid={`svg-viewer-${svgKey}`}
                  data-key={svgKey}
                  style={{ transform: `rotate(${rotation}deg)` }}
                  className="svg-component"
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
