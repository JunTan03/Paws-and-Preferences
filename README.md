# Paws & Preferences: Find Your Favourite Kitty

A React-based swiping application that allows users to find their favorite cats using the CATAAS API.

## Features
- **Dating App-style Swipe**: Smooth card animations with rotation logic.
- **Image Preloading**: Next images are loaded in the background for a zero-lag experience.
- **Favorites Gallery**: A summary screen showing all "Liked" cats at the end of the stack.
- **Gesture Logic**: Built with Pointer Events for seamless Mobile & Desktop support.
- **UX Optimization**: Implemented swipe thresholds to prevent accidental triggers.

## Tech Stack
- **React.js** (Vite)
- **CSS-in-JS** (Inline Styles for dynamic animations)
- **CATAAS API** (Cat as a Service)

## How to Run

### Local Desktop Development
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the local server.

### Mobile Testing (Touch Gestures)
To test the swiping experience on a physical mobile device:
1. Ensure your computer and phone are connected to the **same Wi-Fi network**.
2. Run the server using the host flag:
   ```bash
   npm run dev -- --host
3. Open the **Network URL** displayed in your terminal (e.g., http://192.168.1.xx:5173) on your phone's browser.
