import React from "react";
import PropTypes from "prop-types";
import "./RoadmapViewer.css";

/**
 * RoadmapViewer Component
 *
 * Displays a roadmap with levels and paths in a matrix layout.
 */
export const RoadmapViewer = ({
  matrixWidth,
  matrixHeight,
  positions,
  levelComponent,
  pathComponents,
  cellWidth = 100,
  cellHeight = 100,
  cellGap = 0,
  completedLevelComponent,
  completedPathComponents,
  futureLevelComponent,
  futurePathComponents,
  onLevelClick,
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
      status = "future",
      pathComponent = "default",
      levelContent,
      order,
    } = position;

    if (x >= 0 && x < matrixWidth && y >= 0 && y < matrixHeight) {
      matrix[y][x] = { key, type, status, pathComponent, levelContent, order };
    }
  });

  const renderCell = (cell) => {
    if (!cell) return <div className="roadmap-empty-cell" />;

    const {
      key,
      type,
      status,
      pathComponent = "default",
      levelContent,
      order,
    } = cell;

    if (type === "level") {
      const levelProps = {
        key,
        content: levelContent,
        order,
        onClick: () => onLevelClick && onLevelClick(order),
      };

      if (status === "completed" && completedLevelComponent) {
        return React.cloneElement(completedLevelComponent, levelProps);
      } else if (status === "future" && futureLevelComponent) {
        return React.cloneElement(futureLevelComponent, levelProps);
      } else if (levelComponent) {
        return (
          <div className={`roadmap-level roadmap-level-${status}`}>
            {React.cloneElement(levelComponent, levelProps)}
          </div>
        );
      } else {
        return (
          <div
            className={`roadmap-level roadmap-level-${status}`}
            onClick={() => onLevelClick && onLevelClick(order)}
          >
            {levelContent}
          </div>
        );
      }
    } else if (type === "path") {
      if (
        status === "completed" &&
        completedPathComponents &&
        completedPathComponents[pathComponent]
      ) {
        return React.cloneElement(completedPathComponents[pathComponent], {
          key,
        });
      } else if (
        status === "future" &&
        futurePathComponents &&
        futurePathComponents[pathComponent]
      ) {
        return React.cloneElement(futurePathComponents[pathComponent], { key });
      } else if (pathComponents && pathComponents[pathComponent]) {
        return (
          <div className={`roadmap-path roadmap-path-${status}`}>
            {React.cloneElement(pathComponents[pathComponent], { key })}
          </div>
        );
      } else {
        return (
          <div
            className={`roadmap-path roadmap-path-default roadmap-path-${status}`}
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
          gap: `${cellGap}px`,
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
  levelComponent: PropTypes.element,
  pathComponents: PropTypes.object,
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number,
  cellGap: PropTypes.number,
  completedLevelComponent: PropTypes.element,
  completedPathComponents: PropTypes.object,
  futureLevelComponent: PropTypes.element,
  futurePathComponents: PropTypes.object,
  onLevelClick: PropTypes.func,
};
