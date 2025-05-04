# React Tetris Game

A modern implementation of the classic Tetris game built with React, TypeScript, and Vite. The game features a responsive design with both keyboard and touch controls for mobile devices.

## Features

-   Classic Tetris gameplay mechanics
-   Responsive design (works on both desktop and mobile)
-   Touch controls for mobile devices
-   Game statistics tracking
-   High scores system
-   Pause/Resume functionality
-   Piece rotation (clockwise and counter-clockwise)
-   Hard drop functionality
-   Modern UI with retro styling

## Tech Stack

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   Lucide React (for icons)

## Controls

### Desktop (Keyboard)

Use the keyboard arrow keys to control the game:

-   ↑ : Rotate piece clockwise
-   ↓ : Move piece down
-   ← : Move piece left
-   → : Move piece right

### Mobile (Touch Controls)

The game features an on-screen control pad for mobile devices with:

-   Directional buttons for movement
-   Rotation buttons (clockwise and counter-clockwise)
-   Hard drop button
-   Pause/Resume button
-   Reset game button

## Project Structure

```
src/
├── components/         # React components
│   ├── Board.tsx      # Game board component
│   ├── Cell.tsx       # Individual cell component
│   ├── Controls.tsx   # Game controls component
│   ├── GameOver.tsx   # Game over overlay
│   ├── GameStats.tsx  # Game statistics display
│   ├── HighScores.tsx # High scores display
│   └── ...
├── hooks/             # Custom React hooks
│   ├── useGameLoop.ts
│   └── useKeyboardControls.ts
├── types/             # TypeScript type definitions
└── utils/            # Helper functions and constants
    ├── constants.ts
    ├── gameHelpers.ts
    ├── storage.ts
    └── tetrominos.ts
```

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
