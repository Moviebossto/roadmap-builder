import React, { useState } from "react";
import { RoadmapViewer } from "./RoadmapViewer";
import "./RoadmapBuilder.css";

export const RoadmapBuilder = ({
  initialMatrixWidth = 5,
  initialMatrixHeight = 9,
  initialPositions = {},
  pathComponents,
  completedPathComponents,
  completedLevelComponent,
  futureLevelComponent,
  cellWidth = 80,
  cellHeight = 80,
  onSave,
}) => {
  const [matrixWidth, setMatrixWidth] = useState(initialMatrixWidth);
  const [matrixHeight, setMatrixHeight] = useState(initialMatrixHeight);
  const [positions, setPositions] = useState(initialPositions);
  const [selectedCell, setSelectedCell] = useState(null);
  const [cellType, setCellType] = useState("level");
  const [pathType, setPathType] = useState("vertical");
  const [levelContent, setLevelContent] = useState("");
  const [levelOrder, setLevelOrder] = useState(1);
  const [status, setStatus] = useState("future");

  // Handle adding or updating a cell
  const handleAddCell = () => {
    if (!selectedCell) return;

    const { x, y } = selectedCell;
    const cellId =
      cellType === "level" ? `level-${Date.now()}` : `path-${Date.now()}`;

    const newPositions = { ...positions };

    if (cellType === "level") {
      newPositions[cellId] = {
        x,
        y,
        type: "level",
        status,
        levelContent,
        order: levelOrder,
      };
    } else {
      newPositions[cellId] = {
        x,
        y,
        type: "path",
        status,
        pathComponent: pathType,
      };
    }

    setPositions(newPositions);
  };

  // Handle removing a cell
  const handleRemoveCell = () => {
    if (!selectedCell) return;

    const { x, y } = selectedCell;
    const cellToRemove = Object.entries(positions).find(
      ([, pos]) => pos.x === x && pos.y === y
    );

    if (cellToRemove) {
      const [cellId] = cellToRemove;
      const newPositions = { ...positions };
      delete newPositions[cellId];
      setPositions(newPositions);
    }
  };

  // Handle cell selection in the grid
  const handleCellClick = (x, y) => {
    setSelectedCell({ x, y });

    // Check if there's already a cell at this position
    const existingCell = Object.entries(positions).find(
      ([, pos]) => pos.x === x && pos.y === y
    );

    if (existingCell) {
      const [, cellData] = existingCell;
      setCellType(cellData.type);
      setStatus(cellData.status);

      if (cellData.type === "level") {
        setLevelContent(cellData.levelContent);
        setLevelOrder(cellData.order);
      } else {
        setPathType(cellData.pathComponent);
      }
    }
  };

  // Generate grid for selection
  const renderGrid = () => {
    const grid = [];

    for (let y = 0; y < matrixHeight; y++) {
      const row = [];
      for (let x = 0; x < matrixWidth; x++) {
        // Check if a cell exists at this position
        const cellExists = Object.values(positions).some(
          (pos) => pos.x === x && pos.y === y
        );

        // Determine if this cell is selected
        const isSelected =
          selectedCell && selectedCell.x === x && selectedCell.y === y;

        row.push(
          <div
            key={`${x}-${y}`}
            className={`grid-cell ${isSelected ? "selected" : ""} ${
              cellExists ? "exists" : ""
            }`}
            onClick={() => handleCellClick(x, y)}
            style={{
              width: cellWidth,
              height: cellHeight,
              border: "1px solid #ccc",
              backgroundColor: isSelected
                ? "#ffeb3b"
                : cellExists
                ? "#e0e0e0"
                : "white",
              cursor: "pointer",
            }}
          >
            {x},{y}
          </div>
        );
      }
      grid.push(
        <div key={y} style={{ display: "flex" }}>
          {row}
        </div>
      );
    }

    return grid;
  };

  // Export positions as JSON
  const handleExport = () => {
    if (onSave) {
      onSave(positions);
    }

    // Create a download link for the JSON
    const dataStr = JSON.stringify(positions, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;

    const exportFileDefaultName = "roadmap-positions.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="roadmap-builder">
      <div className="builder-controls">
        <div className="matrix-size">
          <h3>Matrix Size</h3>
          <div>
            <label>
              Width:
              <input
                type="number"
                value={matrixWidth}
                onChange={(e) => setMatrixWidth(Number(e.target.value))}
                min="1"
              />
            </label>
          </div>
          <div>
            <label>
              Height:
              <input
                type="number"
                value={matrixHeight}
                onChange={(e) => setMatrixHeight(Number(e.target.value))}
                min="1"
              />
            </label>
          </div>
        </div>

        <div className="cell-editor">
          <h3>Cell Editor</h3>
          {selectedCell && (
            <div>
              <p>
                Selected: ({selectedCell.x}, {selectedCell.y})
              </p>
              <div>
                <label>
                  Type:
                  <select
                    value={cellType}
                    onChange={(e) => setCellType(e.target.value)}
                  >
                    <option value="level">Level</option>
                    <option value="path">Path</option>
                  </select>
                </label>
              </div>

              {cellType === "level" ? (
                <>
                  <div>
                    <label>
                      Content:
                      <input
                        type="text"
                        value={levelContent}
                        onChange={(e) => setLevelContent(e.target.value)}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Order:
                      <input
                        type="number"
                        value={levelOrder}
                        onChange={(e) => setLevelOrder(Number(e.target.value))}
                        min="1"
                      />
                    </label>
                  </div>
                </>
              ) : (
                <div>
                  <label>
                    Path Type:
                    <select
                      value={pathType}
                      onChange={(e) => setPathType(e.target.value)}
                    >
                      <option value="horizontal">Horizontal</option>
                      <option value="vertical">Vertical</option>
                      <option value="diagonalRightDown">
                        Diagonal Right Down
                      </option>
                      <option value="diagonalLeftDown">
                        Diagonal Left Down
                      </option>
                    </select>
                  </label>
                </div>
              )}

              <div>
                <label>
                  Status:
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="completed">Completed</option>
                    <option value="future">Future</option>
                  </select>
                </label>
              </div>

              <div className="cell-actions">
                <button onClick={handleAddCell}>Add/Update Cell</button>
                <button onClick={handleRemoveCell}>Remove Cell</button>
              </div>
            </div>
          )}
        </div>

        <div className="export-section">
          <button onClick={handleExport}>Export Positions</button>
        </div>
      </div>

      <div className="builder-view" style={{ display: "flex", gap: "20px" }}>
        <div className="grid-view">
          <h3>Grid</h3>
          <div className="grid-container">{renderGrid()}</div>
        </div>

        <div className="preview">
          <h3>Preview</h3>
          <RoadmapViewer
            matrixWidth={matrixWidth}
            matrixHeight={matrixHeight}
            positions={positions}
            pathComponents={pathComponents}
            completedPathComponents={completedPathComponents}
            completedLevelComponent={completedLevelComponent}
            futureLevelComponent={futureLevelComponent}
            cellWidth={cellWidth}
            cellHeight={cellHeight}
          />
        </div>
      </div>

      <div className="json-output">
        <h3>Positions JSON</h3>
        <pre>{JSON.stringify(positions, null, 2)}</pre>
      </div>
    </div>
  );
};
