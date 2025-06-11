# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Roadmap Builder

A flexible React component library for building and displaying interactive roadmaps.

## Installation

```bash
npm install roadmap-builder
# or
yarn add roadmap-builder
```

## Features

- Interactive roadmap display with customizable components
- Visual roadmap builder tool
- Support for different path types (horizontal, vertical, diagonal)
- Customizable level and path components
- Progress tracking with completed/future states

## Usage

### Displaying a Roadmap

```jsx
import React from "react";
import { RoadmapViewer } from "roadmap-builder";

// Custom components
const CompletedLevelComponent = ({ content, onClick }) => (
  <button
    onClick={onClick}
    style={{
      /* Your styles here */
      background: "green",
      color: "white",
      borderRadius: "50%",
    }}
  >
    {content}
  </button>
);

const FutureLevelComponent = ({ content, onClick }) => (
  <button
    onClick={onClick}
    style={{
      /* Your styles here */
      background: "blue",
      color: "white",
      borderRadius: "50%",
    }}
  >
    {content}
  </button>
);

// Path components
const pathComponents = {
  horizontal: <YourHorizontalPathComponent />,
  vertical: <YourVerticalPathComponent />,
  diagonalRightDown: <YourDiagonalRightDownComponent />,
  diagonalLeftDown: <YourDiagonalLeftDownComponent />,
};

// Completed path components
const completedPathComponents = {
  horizontal: <YourCompletedHorizontalPathComponent />,
  vertical: <YourCompletedVerticalPathComponent />,
  diagonalRightDown: <YourCompletedDiagonalRightDownComponent />,
  diagonalLeftDown: <YourCompletedDiagonalLeftDownComponent />,
};

// Example roadmap positions
const positions = {
  "level-1": {
    x: 1,
    y: 0,
    type: "level",
    status: "completed",
    levelContent: "1",
    order: 1,
  },
  "path-1-2": {
    x: 1,
    y: 1,
    type: "path",
    status: "completed",
    pathComponent: "vertical",
  },
  "level-2": {
    x: 1,
    y: 2,
    type: "level",
    status: "completed",
    levelContent: "2",
    order: 2,
  },
  // Add more positions as needed
};

function App() {
  const handleLevelClick = (order) => {
    console.log(`Level ${order} clicked`);
  };

  return (
    <RoadmapViewer
      matrixWidth={5}
      matrixHeight={9}
      positions={positions}
      pathComponents={pathComponents}
      completedPathComponents={completedPathComponents}
      completedLevelComponent={<CompletedLevelComponent />}
      futureLevelComponent={<FutureLevelComponent />}
      onLevelClick={handleLevelClick}
      cellWidth={80}
      cellHeight={80}
    />
  );
}
```

### Using the Roadmap Builder

```jsx
import React, { useState } from "react";
import { RoadmapBuilder, RoadmapViewer } from "roadmap-builder";

function App() {
  const [positions, setPositions] = useState({});

  // Define your custom components
  const pathComponents = {
    horizontal: <YourHorizontalPathComponent />,
    vertical: <YourVerticalPathComponent />,
    // ...
  };

  const completedPathComponents = {
    horizontal: <YourCompletedHorizontalPathComponent />,
    vertical: <YourCompletedVerticalPathComponent />,
    // ...
  };

  const handleSave = (newPositions) => {
    setPositions(newPositions);
    // You can also save these positions to your backend or local storage
  };

  return (
    <div>
      <RoadmapBuilder
        initialMatrixWidth={5}
        initialMatrixHeight={9}
        initialPositions={positions}
        pathComponents={pathComponents}
        completedPathComponents={completedPathComponents}
        completedLevelComponent={<YourCompletedLevelComponent />}
        futureLevelComponent={<YourFutureLevelComponent />}
        cellWidth={80}
        cellHeight={80}
        onSave={handleSave}
      />

      {/* You can display the roadmap with the saved positions */}
      <RoadmapViewer
        matrixWidth={5}
        matrixHeight={9}
        positions={positions}
        pathComponents={pathComponents}
        completedPathComponents={completedPathComponents}
        completedLevelComponent={<YourCompletedLevelComponent />}
        futureLevelComponent={<YourFutureLevelComponent />}
        onLevelClick={(order) => console.log(`Level ${order} clicked`)}
        cellWidth={80}
        cellHeight={80}
      />
    </div>
  );
}
```

## API Reference

### RoadmapViewer Props

| Prop                      | Type     | Required | Description                                                                  |
| ------------------------- | -------- | -------- | ---------------------------------------------------------------------------- |
| `matrixWidth`             | number   | Yes      | Width of the matrix grid                                                     |
| `matrixHeight`            | number   | Yes      | Height of the matrix grid                                                    |
| `positions`               | object   | Yes      | Object containing positions and properties of levels and paths               |
| `pathComponents`          | object   | Yes      | Components to render for different path types                                |
| `completedPathComponents` | object   | Yes      | Components to render for completed path types                                |
| `completedLevelComponent` | element  | Yes      | Component to render for completed levels                                     |
| `futureLevelComponent`    | element  | Yes      | Component to render for future levels                                        |
| `onLevelClick`            | function | No       | Callback function when a level is clicked, receives level order as parameter |
| `cellWidth`               | number   | No       | Width of each matrix cell in pixels (default: 100)                           |
| `cellHeight`              | number   | No       | Height of each matrix cell in pixels (default: 100)                          |
| `cellGap`                 | number   | No       | Gap between cells in pixels (default: 0)                                     |

### RoadmapBuilder Props

| Prop                      | Type     | Required | Description                                        |
| ------------------------- | -------- | -------- | -------------------------------------------------- |
| `initialMatrixWidth`      | number   | No       | Initial width of the matrix grid (default: 5)      |
| `initialMatrixHeight`     | number   | No       | Initial height of the matrix grid (default: 9)     |
| `initialPositions`        | object   | No       | Initial positions for the builder (default: {})    |
| `pathComponents`          | object   | Yes      | Components to render for different path types      |
| `completedPathComponents` | object   | Yes      | Components to render for completed path types      |
| `completedLevelComponent` | element  | Yes      | Component to render for completed levels           |
| `futureLevelComponent`    | element  | Yes      | Component to render for future levels              |
| `onSave`                  | function | No       | Callback function when positions are saved         |
| `cellWidth`               | number   | No       | Width of each matrix cell in pixels (default: 80)  |
| `cellHeight`              | number   | No       | Height of each matrix cell in pixels (default: 80) |
| `cellGap`                 | number   | No       | Gap between cells in pixels (default: 0)           |

## Position Object Structure

The position object uses keys as unique identifiers and contains the following properties:

For levels:

```js
{
  x: number, // x position in the matrix
  y: number, // y position in the matrix
  type: "level", // type of the node
  status: "completed" | "future", // status of the level
  levelContent: string, // content to display in the level
  order: number // order/sequence number of the level
}
```

For paths:

```js
{
  x: number, // x position in the matrix
  y: number, // y position in the matrix
  type: "path", // type of the node
  status: "completed" | "future", // status of the path
  pathComponent: "horizontal" | "vertical" | "diagonalRightDown" | "diagonalLeftDown" // type of path
}
```

## Dynamic Status Changes

You can dynamically update the status of levels and paths based on user progress or other conditions. This allows creating interactive roadmaps that visually update as users progress.

### Example with Current Level Tracking

```jsx
function App() {
  // Track the current level (could be from user progress, API data, etc.)
  const [currentLevel, setCurrentLevel] = useState(1);

  // Define positions with dynamic status based on currentLevel
  const positions = {
    "level-1": {
      x: 1,
      y: 0,
      type: "level",
      status: currentLevel >= 1 ? "completed" : "future", // Conditional status
      levelContent: "1",
      order: 1,
    },
    "path-1-2": {
      x: 1,
      y: 1,
      type: "path",
      status: currentLevel >= 2 ? "completed" : "future", // Conditional status
      pathComponent: "vertical",
    },
    "level-2": {
      x: 1,
      y: 2,
      type: "level",
      status: currentLevel >= 2 ? "completed" : "future", // Conditional status
      levelContent: "2",
      order: 2,
    },
    // More positions...
  };

  // Level click handler that updates progress
  const handleLevelClick = (order) => {
    setCurrentLevel(order);
  };

  return (
    <RoadmapViewer
      positions={positions}
      onLevelClick={handleLevelClick}
      // Other props...
    />
  );
}
```

With this approach, whenever `currentLevel` changes, the roadmap will automatically update with completed and future sections visually distinguished.

## License

MIT © [Your Name]

## Component Props

### Path Components

When creating custom path components, the component will receive the following props:

- `key`: A unique identifier for the path
- `orientation`: The orientation of the path ('horizontal', 'vertical', 'diagonal-right-down', etc.)

Example path component:

```jsx
const PathComponent = ({ orientation }) => {
  // Render different path styles based on orientation
  let pathStyles = {};

  switch (orientation) {
    case "vertical":
      pathStyles = { width: "8px", height: "100%" };
      break;
    case "horizontal":
    default:
      pathStyles = { width: "100%", height: "8px" };
  }

  return <div style={pathStyles} />;
};

// Then use it in RoadmapViewer
<RoadmapViewer
  // ...other props
  pathComponent={<PathComponent />}
/>;
```

### Level Components

Level components will receive:

- `key`: A unique identifier for the level
