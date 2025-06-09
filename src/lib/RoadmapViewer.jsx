import React from "react";
import PropTypes from "prop-types";
import "./RoadmapViewer.css";

/**
 * RoadmapViewer Component
 *
 * Displays a roadmap with levels and paths in a matrix layout.
 */
const RoadmapViewer = ({
  matrixWidth,
  matrixHeight,
  positions,
  levelComponent,
  pathComponents,
  cellWidth = 100,
  cellHeight = 100,
  activeLevelComponent,
  activePathComponents,
  passiveLevelComponent,
  passivePathComponents,
}) => {
  // Create a matrix with the specified dimensions
  const matrix = Array(matrixHeight)
    .fill()
    .map(() => Array(matrixWidth).fill(null));

  // Place elements in the matrix according to positions
  Object.entries(positions).forEach(([key, position]) => {
    const {
      x,
      y,
      type,
      state = "passive",
      pathComponent = "default",
    } = position;

    if (x >= 0 && x < matrixWidth && y >= 0 && y < matrixHeight) {
      matrix[y][x] = { key, type, state, pathComponent };
    }
  });

  const renderCell = (cell) => {
    if (!cell) return <div className="roadmap-empty-cell" />;

    const { key, type, state, pathComponent = "default" } = cell;

    if (type === "level") {
      if (state === "active" && activeLevelComponent) {
        return React.cloneElement(activeLevelComponent, { key });
      } else if (state === "passive" && passiveLevelComponent) {
        return React.cloneElement(passiveLevelComponent, { key });
      } else {
        return (
          <div
            className={`roadmap-level ${
              state === "passive" ? "roadmap-passive" : ""
            }`}
          >
            {React.cloneElement(levelComponent, { key })}
          </div>
        );
      }
    } else if (type === "path") {
      if (
        state === "active" &&
        activePathComponents &&
        activePathComponents[pathComponent]
      ) {
        return React.cloneElement(activePathComponents[pathComponent], { key });
      } else if (
        state === "passive" &&
        passivePathComponents &&
        passivePathComponents[pathComponent]
      ) {
        return React.cloneElement(passivePathComponents[pathComponent], {
          key,
        });
      } else if (pathComponents && pathComponents[pathComponent]) {
        return (
          <div
            className={`roadmap-path ${
              state === "passive" ? "roadmap-passive" : ""
            }`}
          >
            {React.cloneElement(pathComponents[pathComponent], { key })}
          </div>
        );
      } else {
        return (
          <div
            className={`
              roadmap-path 
              roadmap-path-default
              ${state === "passive" ? "roadmap-passive" : ""}
            `}
          />
        );
      }
    }

    return <div className="roadmap-empty-cell" />;
  };

  return (
    <div className="roadmap-viewer">
      <div
        className="roadmap-matrix"
        style={{
          gridTemplateColumns: `repeat(${matrixWidth}, ${cellWidth}px)`,
          gridTemplateRows: `repeat(${matrixHeight}, ${cellHeight}px)`,
        }}
      >
        {matrix.flatMap((row, y) =>
          row.map((cell, x) => (
            <div
              key={`cell-${y}-${x}`}
              className="roadmap-cell"
              style={{ width: cellWidth, height: cellHeight }}
            >
              {renderCell(cell)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

RoadmapViewer.propTypes = {
  matrixWidth: PropTypes.number.isRequired,
  matrixHeight: PropTypes.number.isRequired,
  positions: PropTypes.object.isRequired,
  levelComponent: PropTypes.element.isRequired,
  pathComponents: PropTypes.object,
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number,
  activeLevelComponent: PropTypes.element,
  activePathComponents: PropTypes.object,
  passiveLevelComponent: PropTypes.element,
  passivePathComponents: PropTypes.object,
};

export default RoadmapViewer;
