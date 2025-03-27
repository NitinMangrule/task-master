import React, { useState } from "react";
import "./App.scss";
import { Description } from "./Description";
import { SVGViewer } from "./components/SVGViewer/SVGViewer";

export const App = () => {
  const [isDescription, setIsDescription] = useState(true);

  return (
    <div className="App">
      <div className={"tabs"}>
        <button
          onClick={() => setIsDescription(true)}
          className={isDescription ? "active" : ""}
          data-testid="description-tab"
        >
          Description
        </button>
        <button
          onClick={() => setIsDescription(false)}
          className={!isDescription ? "active" : ""}
          data-testid="implementation-tab"
        >
          Implementation
        </button>
      </div>

      <div className={"content"}>
        {isDescription ? <Description /> : <SVGViewer />}
      </div>
    </div>
  );
};

export default App;
