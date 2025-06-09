# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Roadmap Builder

A React component library for creating interactive roadmaps, perfect for educational applications, learning platforms, or game progression systems.

## Installation

```bash
npm install roadmap-builder
# or
yarn add roadmap-builder
```

## Usage

```jsx
import { RoadmapViewer } from "roadmap-builder";

// Your level component
const LevelComponent = ({ level, onClick }) => (
  <button onClick={onClick}>{level}</button>
);

// Path components
const HorizontalPathComponent = () => (
  <div style={{ width: "100%", height: "5px", background: "#ddd" }} />
);

const VerticalPathComponent = () => (
  <div style={{ width: "5px", height: "100%", background: "#ddd" }} />
);

function MyRoadmap() {
  // Define your roadmap positions
  const positions = {
    "level-1": { x: 0, y: 0, type: "level", status: "completed" },
    "path-1-2": {
      x: 0,
      y: 1,
      type: "path",
      status: "completed",
      pathComponent: "vertical",
    },
    "level-2": { x: 0, y: 2, type: "level", status: "future" },
    // Add more levels and paths as needed
  };

  // Collection of path components
  const pathComponents = {
    horizontal: <HorizontalPathComponent />,
    vertical: <VerticalPathComponent />,
  };

  return (
    <RoadmapViewer
      matrixWidth={3}
      matrixHeight={5}
      positions={positions}
      levelComponent={
        <LevelComponent
          level={1}
          onClick={() => console.log("Level 1 clicked")}
        />
      }
      pathComponents={pathComponents}
      cellWidth={100}
      cellHeight={80}
    />
  );
}
```

## Props

| Prop                    | Type          | Required | Default | Description                                                                        |
| ----------------------- | ------------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| matrixWidth             | number        | Yes      | -       | Width of the matrix grid                                                           |
| matrixHeight            | number        | Yes      | -       | Height of the matrix grid                                                          |
| positions               | object        | Yes      | -       | Object defining the positions and states of levels and paths                       |
| levelComponent          | React.Element | No       | -       | Component to render for levels (fallback)                                          |
| pathComponents          | object        | No       | -       | Object containing path components mapped by key                                    |
| cellWidth               | number        | No       | 100     | Width of each cell in pixels                                                       |
| cellHeight              | number        | No       | 100     | Height of each cell in pixels                                                      |
| completedLevelComponent | React.Element | No       | -       | Component to render for completed levels                                           |
| completedPathComponents | object        | No       | -       | Object containing completed path components mapped by key                          |
| futureLevelComponent    | React.Element | No       | -       | Component to render for future levels                                              |
| futurePathComponents    | object        | No       | -       | Object containing future path components mapped by key                             |
| onLevelClick            | function      | No       | -       | Callback function when a level is clicked, receives the level's order as parameter |

## Level Components

The level components (levelComponent, completedLevelComponent, futureLevelComponent) will receive the following props:

| Prop    | Type     | Description                                                                       |
| ------- | -------- | --------------------------------------------------------------------------------- |
| content | any      | The content to display in the level (from the levelContent property in positions) |
| order   | number   | The numeric order of the level (from the order property in positions)             |
| onClick | function | Click handler function                                                            |

Example level component:

```jsx
const MyLevelComponent = ({ content, order, onClick }) => (
  <button onClick={onClick}>{content}</button>
);
```

## Positions Object

The positions object defines where each level and path should be placed in the matrix. Each key in the object represents a unique identifier for the element, and its value is an object with the following properties:

```js
{
  x: number,       // X coordinate in the matrix (0-based)
  y: number,       // Y coordinate in the matrix (0-based)
  type: string,    // 'level' or 'path'
  status: string,  // 'completed' or 'future'
  levelContent: string|number, // (for level type only) The content to display in the level (can be text or numbers)
  order: number,   // (for level type only) The numeric order of the level for progression
  pathComponent: string // (for path type only) The key of the path component to use from pathComponents
}
```

For example:

```js
// Level position with numeric content (completed)
{
  'level-1': {
    x: 0,
    y: 0,
    type: 'level',
    status: 'completed',
    levelContent: 1,
    order: 1
  }
}

// Level position with text content (future)
{
  'level-special': {
    x: 2,
    y: 4,
    type: 'level',
    status: 'future',
    levelContent: 'Bonus',
    order: 3
  }
}

// Path position
{
  'path-1-2': {
    x: 0,
    y: 1,
    type: 'path',
    status: 'completed',
    pathComponent: 'vertical'
  }
}
```

### Path Components

Instead of using predefined orientations, you can create your own path components and provide them as an object:

```jsx
// Define path components
const pathComponents = {
  horizontal: <HorizontalPathComponent />,
  vertical: <VerticalPathComponent />,
  diagonalRight: <DiagonalRightComponent />,
  // ... add as many as you need
};

// Use them in your positions
const positions = {
  "path-1-2": {
    x: 0,
    y: 1,
    type: "path",
    status: "completed",
    pathComponent: "vertical",
  },
};

// Then provide them to RoadmapViewer
<RoadmapViewer
  // ...other props
  pathComponents={pathComponents}
/>;
```

You can also provide separate components for completed and future states:

```jsx
const completedPathComponents = {
  horizontal: <CompletedHorizontalPathComponent />,
  vertical: <CompletedVerticalPathComponent />,
};

<RoadmapViewer
  // ...other props
  pathComponents={pathComponents}
  completedPathComponents={completedPathComponents}
/>;
```

## Examples

### Creating a simple linear roadmap

```jsx
const positions = {
  "level-1": { x: 0, y: 0, type: "level", status: "completed" },
  "path-1-2": {
    x: 0,
    y: 1,
    type: "path",
    status: "completed",
    pathComponent: "vertical",
  },
  "level-2": { x: 0, y: 2, type: "level", status: "completed" },
  "path-2-3": {
    x: 0,
    y: 3,
    type: "path",
    status: "future",
    pathComponent: "vertical",
  },
  "level-3": { x: 0, y: 4, type: "level", status: "future" },
};
```

### Creating a branching roadmap

```jsx
const positions = {
  "level-1": { x: 1, y: 0, type: "level", status: "completed" },
  "path-1-2a": {
    x: 0,
    y: 1,
    type: "path",
    status: "completed",
    pathComponent: "diagonalLeftDown",
  },
  "path-1-2b": {
    x: 2,
    y: 1,
    type: "path",
    status: "future",
    pathComponent: "diagonalRightDown",
  },
  "level-2a": { x: 0, y: 2, type: "level", status: "completed" },
  "level-2b": { x: 2, y: 2, type: "level", status: "future" },
};
```

## License

MIT

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
