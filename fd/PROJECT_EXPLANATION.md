# Ink Junction Tattoo Studio - Frontend Documentation

## Project Overview
Ink Junction Tattoo Studio is a premium, real-time portfolio website. It includes a public-facing gallery and a private Admin Panel for instant content updates without any authentication required.

## Technology Stack
- **Framework**: React.js (Vite)
- **Routing**: React Router
- **Real-time**: Socket.IO Client
- **API Client**: Axios
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Tailwind Animate, Custom CSS Marquees

## Key Features & How They Work

### 1. Admin Management Panel (`/admin`)
- **Real-time Updates**: Changes to text or images are broadcast to all visitors immediately using Socket.IO.
- **Media Uploads**: Integrated file upload system for adding new tattoos and updating videos.
- **Dynamic Content**: Manage Hero text, Artist details, and Contact info directly from the dashboard.

### 2. useData Custom Hook
- **Centralized Data**: Manages the state for both portfolio items and global content.
- **Robustness**: Automatically switches to local `portfolio.js` fallback if the backend is offline.
- **Real-time Sync**: Listens for server events to keep the UI perfectly synced with the database.

### 3. Dynamic Sections
- **Hero**: Displays live titles and background videos from the admin settings.
- **Portfolio Marquees**: Auto-scrolling galleries that reflect the latest database entries instantly.
- **Artist & Contact**: Sections that update their text and images based on admin configuration.

### 4. Seamless Navigation
- **Public/Admin Split**: Uses React Router to manage paths while maintaining a unified styling.
- **Smooth Scroll**: Internal navigation glides to sections like "#portfolio" or "#contact".

## Mobile Optimization
- **Responsive Admin**: The dashboard is designed to work on tablets and desktop.
- **Public Site**: Fully mobile-first with touch-friendly marquees and a floating "Book Now" popup.

## Connectivity
- **Backend URL**: Configured via `.env` (`VITE_API_URL`, `VITE_SOCKET_URL`).
- **Real-time Engine**: Connects to the backend Socket.IO server for bi-directional updates.
- **Media Handling**: Efficiently loads images and videos from the backend's static file server.
