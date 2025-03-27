import { cssColors } from "../../constants/colors";
import "./SVGControls.scss";

interface SVGControlsProps {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const SVGControls = ({
  selectedColor,
  setSelectedColor,
  handleChange,
  setRotation,
}: SVGControlsProps) => {
  return (
    <div className="svg-controls">
      <button
        onClick={() => setRotation((prev) => (prev === 180 ? 0 : 180))}
        className="rotate-button"
        data-testid="svg-rotate"
      >
        Toggle
      </button>

      <select
        value={selectedColor}
        data-testid="color-select"
        onChange={(e) => setSelectedColor(e.target.value)}
        className="color-select"
      >
        <option value="#000000">No Color</option>
        {Object.entries(cssColors).map(([key, value]) => (
          <option key={key} value={value} data-testid={key}>
            {key}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => handleChange(e)}
        data-testid="shape-select"
        className="shape-select"
      >
        <option value="all">All</option>
        <option value="rectangle">Rectangle</option>
        <option value="star">Star</option>
        <option value="circle">Circle</option>
      </select>
    </div>
  );
};
