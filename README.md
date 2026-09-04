# Birthday Website

A React and TypeScript birthday experience built with Vite. The app includes an interactive PIN unlock, birthday letter, memories, timeline, music, voice message controls, and responsive navigation.

This project uses the Vite React plugin and Oxlint for development.


## Requirements

- Node.js version 20 or newer
- npm 10 or newer

Check your installed versions:

```bash
node --version
npm --version
```

## Installation

Open a terminal in the project folder and install all dependencies:

```bash
npm install
```

This installs the packages declared in `package.json`.

## Run In Development

Start the Vite development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Available Commands

```bash
npm run dev      # Start the development server
npm run build    # Type-check and create a production build
npm run lint     # Check the source code with Oxlint
npm run preview  # Preview the production build locally
```

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Personalize The Experience

Edit the `birthdayConfig` object near the top of `src/App.tsx` to change the recipient's name, birthday PIN, greeting, letter, music, voice message, photos, memories, and timeline.

## Linting

Run `npm run lint` to check the source code with Oxlint. The project uses the default Oxlint configuration.


