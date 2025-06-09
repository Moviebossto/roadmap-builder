import React from "react";
import { RoadmapViewer } from "./lib";
import "./App.css";

// Example level component
const LevelComponent = ({ level, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      background: "#3498db",
      color: "white",
      border: "none",
      fontSize: "18px",
      cursor: "pointer",
    }}
  >
    {level}
  </button>
);

// Example active level component
const ActiveLevelComponent = ({ level, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      background: "#2ecc71",
      color: "white",
      border: "none",
      fontSize: "18px",
      cursor: "pointer",
      boxShadow: "0 0 10px rgba(46, 204, 113, 0.5)",
    }}
  >
    {level}
  </button>
);

// Path components
const HorizontalPathComponent = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <div
      style={{
        width: "100%",
        height: "8px",
        backgroundColor: "#95a5a6",
        position: "relative",
      }}
    />
  </div>
);

const VerticalPathComponent = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <div
      style={{
        width: "8px",
        height: "100%",
        backgroundColor: "#95a5a6",
        position: "relative",
      }}
    />
  </div>
);

const DiagonalRightDownPathComponent = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <div
      style={{
        width: "8px",
        height: "100%",
        backgroundColor: "#95a5a6",
        position: "absolute",
        transform: "rotate(45deg)",
        transformOrigin: "top left",
        top: "0",
        left: "50%",
      }}
    />
  </div>
);

const DiagonalLeftDownPathComponent = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <div
      style={{
        width: "8px",
        height: "100%",
        backgroundColor: "#95a5a6",
        position: "absolute",
        transform: "rotate(-45deg)",
        transformOrigin: "top right",
        top: "0",
        right: "50%",
      }}
    />
  </div>
);

// Active path components
const ActiveHorizontalPathComponent = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <div
      style={{
        width: "100%",
        height: "8px",
        backgroundColor: "#2ecc71",
        position: "relative",
        boxShadow: "0 0 5px rgba(46, 204, 113, 0.5)",
      }}
    />
  </div>
);

const ActiveVerticalPathComponent = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <div
      style={{
        width: "8px",
        height: "100%",
        backgroundColor: "#2ecc71",
        position: "relative",
        boxShadow: "0 0 5px rgba(46, 204, 113, 0.5)",
      }}
    />
  </div>
);

const ActiveDiagonalRightDownPathComponent = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <div
      style={{
        width: "8px",
        height: "100%",
        backgroundColor: "#2ecc71",
        position: "absolute",
        transform: "rotate(45deg)",
        transformOrigin: "top left",
        top: "0",
        left: "50%",
        boxShadow: "0 0 5px rgba(46, 204, 113, 0.5)",
      }}
    />
  </div>
);

const ActiveDiagonalLeftDownPathComponent = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <div
      style={{
        width: "8px",
        height: "100%",
        backgroundColor: "#2ecc71",
        position: "absolute",
        transform: "rotate(-45deg)",
        transformOrigin: "top right",
        top: "0",
        right: "50%",
        boxShadow: "0 0 5px rgba(46, 204, 113, 0.5)",
      }}
    />
  </div>
);

function App() {
  const [activeLevel, setActiveLevel] = React.useState(1);

  // Example roadmap positions with different path types
  const positions = {
    "level-1": {
      x: 1,
      y: 0,
      type: "level",
      state: activeLevel >= 1 ? "active" : "passive",
    },
    "path-1-2": {
      x: 1,
      y: 1,
      type: "path",
      state: activeLevel >= 2 ? "active" : "passive",
      pathComponent: "vertical",
    },
    "level-2": {
      x: 1,
      y: 2,
      type: "level",
      state: activeLevel >= 2 ? "active" : "passive",
    },
    "path-2-3": {
      x: 2,
      y: 3,
      type: "path",
      state: activeLevel >= 3 ? "active" : "passive",
      pathComponent: "diagonalLeftDown",
    },
    "level-3": {
      x: 3,
      y: 4,
      type: "level",
      state: activeLevel >= 3 ? "active" : "passive",
    },
    "path-3-4": {
      x: 2,
      y: 5,
      type: "path",
      state: activeLevel >= 4 ? "active" : "passive",
      pathComponent: "diagonalRightDown",
    },
    "level-4": {
      x: 1,
      y: 6,
      type: "level",
      state: activeLevel >= 4 ? "active" : "passive",
    },
    "path-4-5": {
      x: 1,
      y: 7,
      type: "path",
      state: activeLevel >= 5 ? "active" : "passive",
      pathComponent: "vertical",
    },
    "level-5": {
      x: 1,
      y: 8,
      type: "level",
      state: activeLevel >= 5 ? "active" : "passive",
    },
  };

  // Path components collection
  const pathComponents = {
    horizontal: <HorizontalPathComponent />,
    vertical: <VerticalPathComponent />,
    diagonalRightDown: <DiagonalRightDownPathComponent />,
    diagonalLeftDown: <DiagonalLeftDownPathComponent />,
  };

  // Active path components collection
  const activePathComponents = {
    horizontal: <ActiveHorizontalPathComponent />,
    vertical: <ActiveVerticalPathComponent />,
    diagonalRightDown: <ActiveDiagonalRightDownPathComponent />,
    diagonalLeftDown: <ActiveDiagonalLeftDownPathComponent />,
  };

  const handleLevelClick = (level) => {
    setActiveLevel(level);
  };

  return (
    <div className="app">
      <h1>Roadmap Builder Example</h1>
      <div className="controls">
        <p>Current Level: {activeLevel}</p>
        <button onClick={() => setActiveLevel((prev) => Math.max(1, prev - 1))}>
          Previous Level
        </button>
        <button onClick={() => setActiveLevel((prev) => Math.min(5, prev + 1))}>
          Next Level
        </button>
      </div>
      <div className="roadmap-container">
        <RoadmapViewer
          matrixWidth={5}
          matrixHeight={9}
          positions={positions}
          levelComponent={
            <LevelComponent level={1} onClick={() => handleLevelClick(1)} />
          }
          pathComponents={pathComponents}
          activeLevelComponent={
            <ActiveLevelComponent
              level={1}
              onClick={() => handleLevelClick(1)}
            />
          }
          activePathComponents={activePathComponents}
          cellWidth={100}
          cellHeight={80}
        />
      </div>

      <div className="documentation">
        <h2>Available Path Types</h2>
        <div className="orientation-examples">
          <div className="orientation-example">
            <h3>Horizontal</h3>
            <div className="orientation-display">
              <HorizontalPathComponent />
            </div>
          </div>
          <div className="orientation-example">
            <h3>Vertical</h3>
            <div className="orientation-display">
              <VerticalPathComponent />
            </div>
          </div>
          <div className="orientation-example">
            <h3>Diagonal Right Down</h3>
            <div className="orientation-display">
              <DiagonalRightDownPathComponent />
            </div>
          </div>
          <div className="orientation-example">
            <h3>Diagonal Left Down</h3>
            <div className="orientation-display">
              <DiagonalLeftDownPathComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
