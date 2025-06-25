# 📡 P2P File Transfer (WebRTC + WebSocket)

A fast, modern, Firebase-free, modular web app for peer-to-peer file transfer across devices using WebRTC. Features QR code sharing, chunked transfers, theme switching, local history, and offline-ready PWA support.

---

## 🛠️ Project Structure
p2p-file-transfer/ 
├── client/      # Static frontend (HTML, JS, CSS, PWA)
├── server/      # WebSocket signaling server (Node + Socket.IO)
├── render.yaml  # Render deployment config
├── LICENSE
└── README.md    # You're here

---

## 🔧 Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/p2p-file-transfer.git
cd p2p-file-transfer


2. Start the Signaling Server
cd server
npm install
npm start


This runs your Socket.IO signaling server locally on port 3000.
3. Serve the Frontend
cd ../client
npx serve .



🚀 Deploy
- Deploy server/ to Render (see render.yaml)
- Deploy client/ to GitHub Pages, Netlify, or Vercel
- Point your frontend signaling URL to your server endpoint (e.g. https://your-app.onrender.com)

🙌 Credits
Created with ❤️ by Robiul Islam Refat

📜 License
This project is licensed under the MIT License. See LICENSE for details.




