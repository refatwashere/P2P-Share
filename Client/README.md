# 📁 Peer-to-Peer File Transfer

A sleek, secure, and offline-capable web app for transferring files between devices over the same network or internet using WebRTC. Fully modular and installable as a Progressive Web App (PWA), with drag-and-drop, QR sharing, and animated progress UI.

---

## 🚀 Features

- 🔄 Real-time **peer discovery** via WebSockets
- 📡 **Direct file transfer** using WebRTC DataChannel
- 🖱️ **Drag-and-drop** or manual file selection
- 🔢 **Chunked transfer** with dynamic progress feedback
- 📱 **QR code sharing** of device IDs
- 📜 Transfer **history tracking** (stored locally)
- 🌐 **Offline-ready PWA** with install prompt
- 🎨 Clean Tailwind-based UI with dark mode

---

## 📦 Folder Structure

```
.
├── index.html
├── manifest.json
├── service-worker.js
├── /icons/
├── /scripts/
│   ├── main.js
│   ├── signaling.js
│   ├── webrtc.js
│   ├── ui.js
│   └── utils.js
├── /styles/
│   └── main.css
```

---

## 🛠️ Setup & Development

### 1. Clone the project

```bash
git clone https://github.com/refatwashere/p2p-file-transfer.git
cd p2p-file-transfer
```

### 2. Start a local WebSocket signaling server

You'll need a simple Node.js server:

```bash
npm install
node signaling-server.js
```

_Or deploy to Railway, Render, Fly.io, etc._

### 3. Serve the frontend locally

You can use any static server like:

```bash
npx serve .
```

---

## 🌐 Deploy

Push to GitHub Pages, Vercel, or Netlify. This app is fully static—no build tools required.

---

## 📲 Progressive Web App

- Add to home screen on iOS/Android
- Works offline after first visit
- Fast startup with caching via service worker

---

## 🧠 Tech Stack

- HTML, CSS (Tailwind)
- Vanilla JavaScript (ES Modules)
- WebRTC & Socket.io
- QRCode.js (for QR sharing)
- LocalStorage (for history)

---

## 🛡️ Security Notes

- All file transfers are end-to-end encrypted via WebRTC (DTLS/SRTP)
- No file or user data is stored server-side
- Optional: add auth or encryption wrapper for stricter control

---

## 📜 License

MIT © 2025 Robiul Islam Refat