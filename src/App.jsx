import React, { useState } from "react";
import { RoadmapViewer, RoadmapBuilder } from "./lib";
import "./App.css";

// Example completed level component
const CompletedLevelComponent = ({ content, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      background: "red",
      color: "white",
      border: "none",
      fontSize: "18px",
      cursor: "pointer",
      boxShadow: "0 0 10px rgba(46, 204, 113, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {content}
  </button>
);

// Example future level component
const FutureLevelComponent = ({ content, onClick }) => (
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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {content}
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
        transform: "rotate(45deg)",
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
        transform: "rotate(-45deg)",
        top: "0",
        right: "50%",
      }}
    />
  </div>
);

// Completed path components
const CompletedHorizontalPathComponent = () => (
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

const CompletedVerticalPathComponent = () => (
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

const CompletedDiagonalRightDownPathComponent = () => (
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
        transform: "rotate(45deg)",
        top: "0",
        left: "50%",
        boxShadow: "0 0 5px rgba(46, 204, 113, 0.5)",
      }}
    />
  </div>
);

const CompletedDiagonalLeftDownPathComponent = () => (
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
        transform: "rotate(-45deg)",
        top: "0",
        right: "50%",
        boxShadow: "0 0 5px rgba(46, 204, 113, 0.5)",
      }}
    />
  </div>
);

function App() {
  const [currentLevel, setCurrentLevel] = React.useState(1);
  const [showBuilder, setShowBuilder] = useState(false);
  const [customPositions, setCustomPositions] = useState(null);

  // Example roadmap positions with different path types and level content
  const positions = customPositions || {
    "level-1": {
      x: 1,
      y: 0,
      type: "level",
      status: currentLevel >= 1 ? "completed" : "future",
      levelContent: "1",
      order: 1,
    },
    "path-1-2": {
      x: 1,
      y: 1,
      type: "path",
      status: currentLevel >= 2 ? "completed" : "future",
      pathComponent: "vertical",
    },
    "level-2": {
      x: 1,
      y: 2,
      type: "level",
      status: currentLevel >= 2 ? "completed" : "future",
      levelContent: "2",
      order: 2,
    },
    "path-2-3": {
      x: 2,
      y: 3,
      type: "path",
      status: currentLevel >= 3 ? "completed" : "future",
      pathComponent: "diagonalLeftDown",
    },
    "level-3": {
      x: 3,
      y: 4,
      type: "level",
      status: currentLevel >= 3 ? "completed" : "future",
      levelContent: "A",
      order: 3,
    },
    "path-3-4": {
      x: 2,
      y: 5,
      type: "path",
      status: currentLevel >= 4 ? "completed" : "future",
      pathComponent: "diagonalRightDown",
    },
    "level-4": {
      x: 1,
      y: 6,
      type: "level",
      status: currentLevel >= 4 ? "completed" : "future",
      levelContent: "B",
      order: 4,
    },
    "path-4-5": {
      x: 1,
      y: 7,
      type: "path",
      status: currentLevel >= 5 ? "completed" : "future",
      pathComponent: "vertical",
    },
    "level-5": {
      x: 1,
      y: 8,
      type: "level",
      status: currentLevel >= 5 ? "completed" : "future",
      levelContent: "aaa",
      order: 5,
    },
  };

  // Path components collection
  const pathComponents = {
    horizontal: <HorizontalPathComponent />,
    vertical: <VerticalPathComponent />,
    diagonalRightDown: <DiagonalRightDownPathComponent />,
    diagonalLeftDown: <DiagonalLeftDownPathComponent />,
  };

  // Completed path components collection
  const completedPathComponents = {
    horizontal: <CompletedHorizontalPathComponent />,
    vertical: <CompletedVerticalPathComponent />,
    diagonalRightDown: <CompletedDiagonalRightDownPathComponent />,
    diagonalLeftDown: <CompletedDiagonalLeftDownPathComponent />,
  };

  const handleLevelClick = (order) => {
    setCurrentLevel(order);
  };

  const handleSavePositions = (newPositions) => {
    setCustomPositions(newPositions);
    setShowBuilder(false);
  };

  return (
    <div className="app">
      <h1>Roadmap Builder Example</h1>
      <div className="controls">
        <p>Current Level: {currentLevel}</p>
        <button
          onClick={() => setCurrentLevel((prev) => Math.max(1, prev - 1))}
        >
          Previous Level
        </button>
        <button
          onClick={() => setCurrentLevel((prev) => Math.min(5, prev + 1))}
        >
          Next Level
        </button>
        <button onClick={() => setShowBuilder(!showBuilder)}>
          {showBuilder ? "Hide Builder" : "Show Builder"}
        </button>
      </div>

      {showBuilder ? (
        <div className="builder-container">
          <h2>Roadmap Builder</h2>
          <RoadmapBuilder
            initialMatrixWidth={5}
            initialMatrixHeight={9}
            initialPositions={positions}
            pathComponents={pathComponents}
            completedPathComponents={completedPathComponents}
            completedLevelComponent={<CompletedLevelComponent />}
            futureLevelComponent={<FutureLevelComponent />}
            cellWidth={80}
            cellHeight={80}
            onSave={handleSavePositions}
          />
        </div>
      ) : (
        <div className="roadmap-container">
          <RoadmapViewer
            matrixWidth={5}
            matrixHeight={9}
            positions={positions}
            pathComponents={pathComponents}
            completedLevelComponent={<CompletedLevelComponent />}
            completedPathComponents={completedPathComponents}
            futureLevelComponent={<FutureLevelComponent />}
            onLevelClick={handleLevelClick}
            cellWidth={80}
            cellHeight={80}
          />
        </div>
      )}

      {!showBuilder && (
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
      )}
    </div>
  );
}

export default App;
